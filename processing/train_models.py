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
from sklearn.preprocessing import FunctionTransformer
from sklearn.pipeline import FeatureUnion
from sklearn.pipeline import Pipeline

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

def get_song_info(x):
    return data.values

# count_v = CountVectorizer()
feats_union = FeatureUnion([ 
    ('tfidf', TfidfVectorizer(analyzer='word', sublinear_tf=True, strip_accents='unicode', ngram_range=(1, 1), max_features=MAX_FEATURES)),
    ('info', FunctionTransformer(get_song_info, validate=False))
])

data = feats_union.fit_transform(postprocess_lyrics)

with open(os.path.join(trained_dir, 'feats_union.pkl'), 'wb') as f:
    pickle.dump(feats_union, f)

print('---- data shape before: {}'.format(data.shape))

# OPTIONAL additional feature selection...
print("Starting feature selection...")
f_selector = SelectPercentile(f_classif, percentile=20)
data = f_selector.fit_transform(data, labels)

print('---- data shape after: {}'.format(data.shape))
with open(os.path.join(trained_dir, 'selector.pkl'), 'wb') as f:
    pickle.dump(f_selector, f)

# Start training
print("Start training and predict...")
classifier = KernelRidge(alpha=1, kernel='rbf')

# Saving model trained on data
X_train, X_test, y_train, y_test = train_test_split(data, labels, test_size=0.3, random_state=7)
model = classifier.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)
nMSE = mean_squared_error(y_test, y_pred) / np.mean(np.square(y_test))
print("---- model achieved nMSE of {}".format(nMSE))

with open(os.path.join('../data/raw/', 'results.txt'), 'w') as f:
    f.write('TRUTH -------------------------------------\n')
    f.writelines([str(res)+'\n' for res in y_test])
    f.write('PREDICTS ----------------------------------\n')
    f.writelines([str(res)+'\n' for res in y_pred])

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
    print(data[train])
    model = classifier.fit(data[train], labels[train])
        
    # predict
    predicts = model.predict(data[test])

    nMSE = mean_squared_error(labels[test], predicts) / np.mean(np.square(labels[test]))
    nMSEs.append(nMSE)

    count += 1
    print("Round %d/10 of nMSE is: %f" %(count, nMSE))
    
print('Average nMSE is %f' %(np.mean(nMSEs)))



