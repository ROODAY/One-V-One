import os
import pickle
import pandas
from preprocess import lyrics_preprocesser, audio_preprocesser

trained_dir = '../data/trained'
model_file = 'xgb_popularity_model.pkl'
funion_file = 'xgb_popularity_funion.pkl'

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
    return model.predict(x)[0]