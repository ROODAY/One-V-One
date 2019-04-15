import os
import pickle
import pandas
from preprocess import audio_preprocesser
from keras.models import load_model

trained_dir = '../data/trained'
encoder_file = 'genre_encoder.pkl'
model_file = 'nn_genre_model.h5'

encoder = pickle.load(os.path.join(trained_dir, encoder_file))
model = load_model(os.path.join(trained_dir, model_file))
