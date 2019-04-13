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
# from sklearn.tree import DecisionTreeRegressor
# from sklearn.ensemble import AdaBoostRegressor
# from sklearn.SVM import SVR
from sklearn.neural_network import MLPRegressor

data_dir = "../data/lyrics"
trained_dir = '../data/trained'
data_file = 'song_info.csv'

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
MAX_FEATURES = 10000

def get_song_info(x):
    return data.values

# count_v = CountVectorizer()
feats_union = FeatureUnion([ 
    ('tfidf', TfidfVectorizer(analyzer='word', sublinear_tf=True, strip_accents='unicode', ngram_range=(1, 2), max_features=MAX_FEATURES)),
    ('info', FunctionTransformer(get_song_info, validate=False))
])

data = feats_union.fit_transform(postprocess_lyrics)

with open(os.path.join(trained_dir, 'popularity_feats_union.pkl'), 'wb') as f:
    pickle.dump(feats_union, f)

print('---- data shape before: {}'.format(data.shape))

# OPTIONAL additional feature selection...
print("Starting feature selection...")
f_selector = SelectPercentile(f_classif, percentile=10)
data = f_selector.fit_transform(data, labels)

print('---- data shape after: {}'.format(data.shape))
with open(os.path.join(trained_dir, 'popularity_fselector.pkl'), 'wb') as f:
    pickle.dump(f_selector, f)

# Start training
print("Start training and predict...")
regressor = MLPRegressor(random_state=1998, max_iter=1000, early_stopping=True, learning_rate='constant')

# Saving model trained on data
X_train, X_test, y_train, y_test = train_test_split(data, labels, test_size=0.3, random_state=2019)
model = regressor.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)
nMSE = mean_squared_error(y_test, y_pred) / np.mean(np.square(y_test))
print("---- model achieved nMSE of {}".format(nMSE))

results = np.concatenate((y_test.reshape(-1, 1), y_pred.reshape(-1,1)), axis=1)
with open(os.path.join('../data/raw/', 'results.txt'), 'w') as f:
    f.write('------------TRUTH vs. PREDICTS------------\n')
    f.writelines(['{} {}'.format(results[i,0], results[i,1]) for i in range(len(results))])

with open(os.path.join(trained_dir, 'popularity_model.pkl'), 'wb') as f:
    pickle.dump(model, f)

# Start Validation
# kf = KFold(n_splits=10)
print("Starting 10-Fold validation...")
nMSEs = []

# Mimic KFold splits
for fold in range(10):
    X_train, X_test, y_train, y_test = train_test_split(data, labels, test_size=0.3)
    model = regressor.fit(X_train, y_train)

    # Predict
    y_pred = model.predict(X_test)
    nMSE = mean_squared_error(y_test, y_pred) / np.mean(np.square(y_test))
    nMSEs.append(nMSE)

    print("Round %d/10 of nMSE is: %f" %(fold+1, nMSE))
    
print('Average nMSE is %f' %(np.mean(nMSEs)))



