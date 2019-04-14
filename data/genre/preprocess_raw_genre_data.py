# feature extractoring and preprocessing data
# adapted from https://towardsdatascience.com/music-genre-classification-with-python-c714d032f0d8 by Parul Pandey
# Author: Jinghu Lei

import os
import csv
import pathlib
import pandas as pd
import numpy as np

# Image library and plotting
from PIL import Image
import matplotlib
matplotlib.use('Agg') # don't use Xwindows = no DISPLAY
import matplotlib.pyplot as plt

# Our Audio processing library
import librosa

# Image mapping
cmap = plt.get_cmap('inferno')
plt.figure(figsize=(2.56,2.56))

# Set of classification genres and labels
genres = ['blues', 'classical', 'country', 'disco', 'hiphop', 'jazz', 'metal', 'pop', 'reggae', 'rock']

# data paths
img_data_path = './img_data/'
MIR_genres_path = '../raw/genres/'
genre_data_file = '../genre_info.csv'

# Save each spectrogram --> for use with CNN
for g in genres:
    pathlib.Path(os.path.join(img_data_path, g)).mkdir(parents=True, exist_ok=True)     
    for file_name in os.listdir(os.path.join(MIR_genres_path, g)):
        song_name = os.path.join(MIR_genres_path, g, file_name)
        y, sr = librosa.load(song_name, mono=True, duration=5)
        plt.specgram(y, NFFT=2048, Fs=2, Fc=0, noverlap=128, cmap=cmap, sides='default', mode='default', scale='dB')
        plt.axis('off')
        plt.savefig(os.path.join(img_data_path, g, file_name[:-3].replace(".", "")+'.png'))
        plt.clf()

with open(genre_data_file, 'a', newline='') as f:
    writer = csv.writer(f)

    # Headers for CSV file
    headers = ['filename', 'chroma_stft', 'rmse', 'spectral_centroid', 'spectral_bandwidth', 'rolloff', 'zero_crossing_rate']

    # Set up Mel-frequency cepstral coefficients (MFCC)
    # 20 Total
    NUM_MFCC = 20
    for i in range(1, 1 + NUM_MFCC):
        headers += ['mfcc{}'.format(i)]
    headers += ['label']

    # Set up CSV with headers
    writer.writerow(headers)

    # For each genre, extract features from each audio clip
    for g in genres:
        for file_name in os.listdir(os.path.join(MIR_genres_path, g)):
            song_name = os.path.join(MIR_genres_path, g, file_name)
            y, sr = librosa.load(song_name, mono=True, duration=30)

            # Different audio features extracted using librosa
            chroma_stft = librosa.feature.chroma_stft(y=y, sr=sr)
            rmse = librosa.feature.rmse(y=y)
            spec_cent = librosa.feature.spectral_centroid(y=y, sr=sr)
            spec_bw = librosa.feature.spectral_bandwidth(y=y, sr=sr)
            rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)
            zcr = librosa.feature.zero_crossing_rate(y)
            mfcc = librosa.feature.mfcc(y=y, sr=sr)

            # Add to our data
            data_row = [file_name, np.mean(chroma_stft), np.mean(rmse), np.mean(spec_cent), np.mean(spec_bw), np.mean(rolloff), np.mean(zcr)]
            for e in mfcc:
                data_row += [np.mean(e)]
            data_row += [g]
            writer.writerow(data_row)