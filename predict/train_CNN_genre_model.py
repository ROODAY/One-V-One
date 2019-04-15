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
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras.optimizers import rmsprop
from tools import f1

data_dir = "../data/genre"
X_file = 'genre_data.p'
y_file = 'genre_labels.p'
trained_dir = '../data/trained'

# Use CNN spectrogram model
IMG_SIZE = 256
NUM_CLASSES = 10

print('Loading data...')
with open(os.path.join(data_dir, X_file), 'rb') as f:    
    X = pickle.load(f)
with open(os.path.join(data_dir, y_file), 'rb') as f:
    y = pickle.load(f)

print(y[:10])

print('---- orig data shape: {}'.format(X.shape))

# Set up Data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=1998)

# Set up keras classifier
model = models.Sequential()
model.add(Conv2D(64, (3, 3),
                    activation='relu',
                    padding='same',
                    input_shape=(IMG_SIZE, IMG_SIZE, 1)))
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(100, 100, 3)))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(128, (3, 3),
                    activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(256, (3, 3),
                    activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(512, (3, 3),
                    activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(1024, (3, 3),
                    activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.5))
model.add(Flatten())
model.add(Dense(500, activation='relu'))
model.add(Dense(NUM_CLASSES, activation='softmax'))

# initiate RMSprop optimizer > ADAM
opt = rmsprop(lr=0.0001, decay=1e-6)
model.compile(loss='categorical_crossentropy',
                optimizer=opt,
                metrics=[f1])

# Form the model and fit
print('Fitting model....')
history = model.fit(X_train, y_train, epochs=20, batch_size=32)

# Show results
test_loss, test_acc = model.evaluate(X_test, y_test)

# Get detailed classification scores
y_pred_conf = model.predict(X_test)
y_pred = np.argmax(y_pred_conf, axis=1)
y_test = np.argmax(y_test, axis=1)

with open(os.path.join('../data/results/', 'results.txt'), 'w') as f:
    f.write('------------TRUTH vs. PREDICTS------------\n')
    f.writelines(['{} {}\n'.format(y_test[i], y_pred[i])
                  for i in range(len(y_test))])
    # f.write(report)

report = classification_report(y_test, y_pred)
print(report)


# *** Save TRAINED model ***
model.save(os.path.join(trained_dir, 'cnn_genre_model.h5'))
