import os
import pickle
import pandas
import numpy as np
from preprocess import audio_preprocesser
from keras.models import load_model
from tools import f1
import requests

trained_dir = 'models'
if not os.path.exists(trained_dir):
  os.makedirs(trained_dir)

encoder_file = 'genre_encoder.pkl'
scaler_file = 'genre_scaler.pkl'
model_file = 'nn_genre_model.h5'

encoder_url = 'https://firebasestorage.googleapis.com/v0/b/one-v-one.appspot.com/o/models%2Fgenre_encoder.pkl?alt=media&token=5c797493-4d03-407f-98b2-2638e9dc025a'
scaler_url = 'https://firebasestorage.googleapis.com/v0/b/one-v-one.appspot.com/o/models%2Fgenre_scaler.pkl?alt=media&token=e7ddb504-102f-4635-8848-9461fed22579'
model_url = 'https://firebasestorage.googleapis.com/v0/b/one-v-one.appspot.com/o/models%2Fnn_genre_model.h5?alt=media&token=f6fb54d2-16a0-4fbf-a01d-22f95dee5e94'

encoder_data = requests.get(encoder_url)
scaler_data = requests.get(scaler_url)
model_data = requests.get(model_url)

open(os.path.join(trained_dir, encoder_file), 'wb').write(encoder_data.content)
open(os.path.join(trained_dir, scaler_file), 'wb').write(scaler_data.content)
open(os.path.join(trained_dir, model_file), 'wb').write(model_data.content)

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

model = load_model(os.path.join(trained_dir, model_file), {'f1': f1})

def predict(audio_file):
    features = audio_preprocesser.preprocess_for_genre(audio_file)
    x = scaler.transform(np.array(features).reshape(1, -1))
    predict = model.predict(x)
    print([(GENRES[ind], conf) for ind, conf in enumerate(predict[0])])
    return GENRES[np.argmax(predict)]