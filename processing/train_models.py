import os
import copy
import pickle
import pandas as pd
import numpy as np
import matplotlib

# Preprocessers
import preprocess.lyrics_preprocesser as lp

# Sklearn helpers
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.feature_selection import SelectPercentile, f_classif
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import KFold
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV

# Model
from sklearn.kernel_ridge import KernelRidge

data_dir = "../data/"
trained_dir = '../data/trained'
data_file = 'filtered_song_info.csv'

print('Loading data...')
data = pd.read_csv(os.path.join(data_dir, data_file), encoding="ISO-8859-1")

# Drop missing and unused data
data = data.dropna(axis=0, how='any')

# Get ground truth
labels = copy.deepcopy(data.song_popularity)
data = data.drop("song_popularity", axis=1)

# Join lyrics as stemmed words list for each song
postprocess_lyrics = None
if not os.path.isfile(os.path.join(data_dir, 'lyrics_stats.txt')):
    postprocess_lyrics = lp.preprocess_data(data['lyrics'], os.path.join(data_dir, 'lyrics_stats.txt'))
else:
    with open(os.path.join(data_dir, 'lyrics_stats.txt'), 'r', encoding="ISO-8859-1") as f:
        postprocess_lyrics = [line.rstrip() for line in f.readlines()]
postprocess_lyrics = np.array(postprocess_lyrics)
data = data.drop("lyrics", axis=1)

# Save trained Feature Selector - TFIDF and CountVectorizer
print("Starting feature extraction...")
MAX_FEATURES = 5000

# count_v = CountVectorizer()
tfidf_v = TfidfVectorizer(
    analyzer='word', 
    sublinear_tf=True,
    strip_accents='unicode',
    ngram_range=(1, 1), # unigram vs. bigram
    max_features=MAX_FEATURES
)
postprocess_lyrics = tfidf_v.fit_transform(postprocess_lyrics)

with open(os.path.join(trained_dir, 'tf_idfv.pkl'), 'wb') as f:
    pickle.dump(tfidf_v, f)

# Convert to numpy array and shuffle
data = data.values
postprocess_lyrics.reshape(data.shape[0], postprocess_lyrics.shape[1])
print(data[0], postprocess_lyrics[0])

data = np.concatenate((data, postprocess_lyrics), axis=1)
print('---- data shape before: {}'.format(data.shape))

# OPTIONAL additional feature selection...
print("Starting feature selection...")
f_selector = SelectPercentile(f_classif, percentile=60)
data = f_selector.fit_transform(data, labels)

print('---- data shape after: {}'.format(data.shape))
with open(os.path.join(trained_dir, 'selector.pkl'), 'wb') as f:
    pickle.dump(f_selector, f)

# Start training
print("Start training and predict...")
classifier = KernelRidge(alpha=2.0, kernel='rbf')

# Saving model trained on data
X_train, X_test, y_train, y_test = train_test_split(data, labels, test_size=0.3, random_state=7)
model = classifier.fit(data[X_train], labels[y_train])

# Predict
y_pred = model.predict(X_test)
nMSE = mean_squared_error(data[X_test], y_pred) / np.mean(np.square(labels[y_test]))
print("---- model achieved nMSE of {}".format(nMSE))
del X_train, X_test, y_train, y_test

with open(os.path.join(trained_dir, 'model.pkl'), 'wb') as f:
    pickle.dump(model, f)


# Start Validation
print("Starting 10-Fold validation...")
kf = KFold(n_splits=10)
nMSEs = []
count = 0

for train, test in kf.split(data):
    # train
    model = classifier.fit(data[train], labels[train])
        
    # predict
    predicts = model.predict(data[test])

    nMSE = mean_squared_error(data[test], predicts) / np.mean(np.square(labels[test]))
    nMSEs.append(nMSE)

    count += 1
    print("Round %d/10 of nMSE is: %f" %(count, nMSE))
    
print('Average nMSE is %f' %(np.mean(nMSEs)))



