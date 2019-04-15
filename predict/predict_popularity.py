import os
import pickle
import pandas
from preprocess import lyrics_preprocesser, audio_preprocesser

trained_dir = '../data/trained'
model_file = 'popularity_model.pkl'
funion_file = 'popularity_funion.pkl'

model = pickle.load(os.path.join(trained_dir, model_file))
funion = pickle.load(os.path.join(trained_dir, funion_file))

def predict(audio_file, lyrics):
    audio_mode, key, tempo = audio_preprocesser.preprocess_for_popularity(audio_file)
    features = [audio_mode, key, tempo, lyrics]
    X = funion.transform(features)
    return model.predict(X)