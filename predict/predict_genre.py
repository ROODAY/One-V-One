import os
import copy
import pickle
import pandas as pd
import numpy as np

# Sklearn helpers
from sklearn.model_selection import KFold
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, precision_score, recall_score

# Keras
from keras import models
from keras import layers
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras.optimizers import rmsprop
from tools import f1

data_dir = "../data/genre"
X_file = 'genre_data.p'
y_file = 'genre_labels.p'
trained_dir = '../data/trained'

print('Loading data...')
with open(os.path.join(data_dir, X_file), 'rb') as f:    
    X = pickle.load(f)
with open(os.path.join(data_dir, y_file), 'rb') as f:
    y = pickle.load(f)

print('---- orig data shape: {}'.format(X.shape))

# Set up Data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=1998)

model = models.load_model(os.path.join(trained_dir, 'cnn_genre_model.h5'), custom_objects={'f1': f1})
# Get detailed classification scores
y_pred_conf = model.predict(X_test)
y_pred = np.argmax(y_pred_conf, axis=1)
y_test = np.argmax(y_test, axis=1)

with open(os.path.join('../data/results/', 'cnn_results.txt'), 'w') as f:
    f.write('------------TRUTH vs. PREDICTS------------\n')
    f.writelines(['{} {}\n'.format(y_test[i], y_pred[i])
                  for i in range(len(y_test))])

report = classification_report(y_test, y_pred)
print(report)

with open(os.path.join('../data/results/', 'results.txt'), 'w') as f:
    f.write(report)