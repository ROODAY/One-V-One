import os
import copy
import pickle
import pandas as pd
import numpy as np

# Preprocessers
import preprocess.audio_preprocesser as ap

# feature extractoring and preprocessing data
import csv
import pandas as pd
import numpy as np

# Sklearn helpers
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import KFold
from sklearn.model_selection import train_test_split
from sklearn.pipeline import FeatureUnion, Pipeline
from sklearn.metrics import classification_report, precision_score, recall_score

# Keras
from keras import models
from keras import layers

data_dir = "../data/"
data_file = 'genre_info.csv'
trained_dir = '../data/trained'

print('Loading data...')
data = pd.read_csv(os.path.join(data_dir, data_file), encoding="ISO-8859-1")
print('---- orig data shape: {}'.format(data.shape))

# Drop unnecessary columns
data = data.drop(['filename'], axis=1)

# Encode each genre with a corresponding label
# **One hot encoding
print('Transforming and normalizing data...')
genre_list = data.iloc[:, -1]
encoder = LabelEncoder()

y = encoder.fit_transform(genre_list)
print('---- labels: {}'.format(encoder.classes_))

# Scale features to normalize
scaler = StandardScaler()
X = scaler.fit_transform(np.array(data.iloc[:, :-1], dtype=float))

# *** Save TRAINED Feature Extractor ***
if not os.path.isfile(os.path.join(trained_dir, 'genre_encoder.pkl')):
    with open(os.path.join(trained_dir, 'genre_encoder.pkl'), 'wb') as f:
        pickle.dump(encoder, f)
if not os.path.isfile(os.path.join(trained_dir, 'genre_scaler.pkl')):
    with open(os.path.join(trained_dir, 'genre_encoder.pkl'), 'wb') as f:
        pickle.dump(scaler, f)

# Set up Data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=1998)

# Set up NN classifier
model = models.Sequential()
model.add(layers.Dense(256, activation='relu',
                       input_shape=(X_train.shape[1],)))
model.add(layers.Dense(128, activation='relu'))
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(10, activation='softmax'))

# Form the model and fit
print('Fitting model....')
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
history = model.fit(X_train, y_train, epochs=20, batch_size=128)

# Show results
y_pred = model.predict(X_test)
precision = precision_score(y_test, y_pred, average='macro')
recall = recall_score(y_test, y_pred, average='macro')
f1_score = 2 * (precision * recall) / (precision + recall)

# test_loss, test_acc = model.evaluate(X_test, y_test)
print(classification_report(y_test, y_pred))
print('---- model achieved f1 score of ', f1_score)

y_pred = y_pred.tolist()
y_test = y_test.tolist()
with open(os.path.join('../data/results/', 'results.txt'), 'w') as f:
    f.write('------------TRUTH vs. PREDICTS------------\n')
    f.writelines(['{} {}\n'.format(y_test[i], y_pred[i])
                  for i in range(len(y_test))])

# *** Save TRAINED model ***
model.save(os.path.join(trained_dir, 'genre_model.h5'))

print('Starting 10-Fold validation...')
kf = KFold(n_splits=10)
avg_p = 0
avg_r = 0
count = 0

for train, test in kf.split(X):
    history = model.fit(X[train], y[train], epochs=20, batch_size=128)

    # Predict
    y_pred = model.predict(X[test])

    # print(classification_report(y[test], y_pred))
    avg_p += precision_score(y[test], y_pred, average='macro')
    avg_r += recall_score(y[test], y_pred, average='macro')

print('Average Precision is %f.' %(avg_p/10.0))
print('Average Recall is %f.' %(avg_r/10.0))
