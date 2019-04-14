# Modified version of https://github.com/carl03q/AudioClassifier/blob/master
# Make the spectrogram dataset from the GTZAN genre collection

import os
import pickle
import numpy as np
from PIL import Image
from random import shuffle

input_path = './img_data/'
IMG_SIZE = 256

def create_dataset():
    data = []

    # genre folders
    genres = os.listdir(input_path)

    for i, genre in enumerate(genres):

        genre_dir = input_path + genre +'/'
        
        files = os.listdir(genre_dir)
        for file in files:
            file_dir = genre_dir + file
            print("Processing ", file_dir)
            im = Image.open(file_dir)
            imr = im.resize((int(IMG_SIZE), int(IMG_SIZE)), resample=Image.ANTIALIAS)
            imgData = np.asarray(imr, dtype=np.uint8).reshape(int(IMG_SIZE), int(IMG_SIZE), 1)
            imgData = imgData / 255 # normalize pixels

            # Label <-- one hot vector
            label = [0 for genre in range(len(genres))]
            label[i] = 1
            data.append((imgData, label))

    shuffle(data)
    x, y = zip(*data)
    X = np.array(x[:]).reshape([-1, IMG_SIZE, IMG_SIZE, 1])
    y = np.array(y[:])

    print("Saving dataset... ")
    pickle.dump(X, open("genre_data.p", "wb"))
    pickle.dump(y, open("genre_labels.p", "wb"))
    print("Dataset saved.")