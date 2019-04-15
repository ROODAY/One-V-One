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

def predict(audio_file, lyrics):
    audio_mode, key, tempo = audio_preprocesser.preprocess_for_popularity(audio_file)
    features = [audio_mode, key, tempo, lyrics]
    x = funion.transform(features)
    return model.predict(x)