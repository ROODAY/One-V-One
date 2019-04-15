import os
import pickle
import pandas
from preprocess import lyrics_preprocesser, audio_preprocesser
import requests

trained_dir = 'models'
if not os.path.exists(trained_dir):
  os.makedirs(trained_dir)

model_file = 'xgb_popularity_model.pkl'
funion_file = 'xgb_popularity_funion.pkl'

model_url = 'https://firebasestorage.googleapis.com/v0/b/one-v-one.appspot.com/o/models%2Fxgb_popularity_model.pkl?alt=media&token=2f84c0ae-4797-4fbf-a1db-b1f1bb635867'
funion_url = 'https://firebasestorage.googleapis.com/v0/b/one-v-one.appspot.com/o/models%2Fxgb_popularity_funion.pkl?alt=media&token=a6a9ac91-4791-43ee-8250-ebdb362d7710'

model_data = requests.get(model_url)
funion_data = requests.get(funion_url)

open(os.path.join(trained_dir, model_file), 'wb').write(model_data.content)
open(os.path.join(trained_dir, funion_file), 'wb').write(funion_data.content)

with open(os.path.join(trained_dir, funion_file), 'rb') as f:
    funion = pickle.load(f)
with open(os.path.join(trained_dir, model_file), 'rb') as f:
    model = pickle.load(f)

pitch_list = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

def predict(audio_file, lyrics):
    audio_mode, key, tempo = audio_preprocesser.preprocess_for_popularity(audio_file)
    audio_mode = 0 if audio_mode=='minor' else 1
    key = pitch_list.index(key)

    features = [[audio_mode, key, tempo, lyrics]]
    x = funion.transform(features)
    return model.predict(x)