import os
import pickle
import pandas
import numpy as np
from preprocess import audio_preprocesser
from keras.models import load_model
from tools import f1

trained_dir = '../data/trained'
encoder_file = 'genre_encoder.pkl'
scaler_file = 'genre_scaler.pkl'
model_file = 'nn_genre_model.h5'

GENRES = [
  "Blues", 
  "Classical", 
  "Country", 
  "Disco", 
  "Hiphop", 
  "Jazz", 
  "Reggae", 
  "Rock", 
  "Metal", 
  "Pop"
]


with open(os.path.join(trained_dir, encoder_file), 'rb') as f:
    encoder = pickle.load(f)
with open(os.path.join(trained_dir, scaler_file), 'rb') as f:   
    scaler = pickle.load(f)

print(os.path.join(trained_dir, model_file))
model = load_model(os.path.join(trained_dir, model_file), {'f1': f1})

def predict(audio_file):
    features = audio_preprocesser.preprocess_for_genre(audio_file)
    x = scaler.transform(np.array(features).reshape(1, -1))
    predict = model.predict(x)
    return GENRES[np.argmax(predict)]