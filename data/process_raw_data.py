# Transform raw MusixMatch lyrics dataset into python dictionaries
# TrackID -> [word count vector]
# modified from https://github.com/ianscottknight/Musical-Genre-Classification-of-Song-Lyrics

import csv
import collections
import operator
import pickle
import os
import pandas as pd
import numpy as np

# Convert each dictionary into ndarray
def convert_to_ndarray(d):
    arr = [0] * 5000
    for key, val in d.items():
        key = int(key) - 1
        arr[key] = val
    return arr

print('1. Extracting lyrics from MSD datasets...')

# Output dict of track lyrics as a bag of words format
tid_to_lyrics = {}

file_list = ['./raw/mxm_dataset_train.txt', './raw/mxm_dataset_test.txt']
for file_name in file_list:
    with open(file_name, 'r') as f:
        out = f.readlines()
        for line in out: 
            line = line.strip('\n')
            if line[0] == '#': 
                pass
            elif line[0] == '%': 

                # Write vocab file if it does not exist
                vocab_list = line.split(',')
                if not os.path.isfile('./raw/vocab.txt'):
                    with open('./raw/vocab.txt', 'w') as vocab_f:
                        vocab_f.write('\n'.join(vocab_list))
                del vocab_list
            else: 
                d = {}
                splitted = line.split(',')
                tid = splitted[0]
                for unsplit_dict in splitted[2:]:
                    pair = unsplit_dict.split(':')
                    index = int(pair[0])
                    count = int(pair[1])
                    d[index] = count
                tid_to_lyrics[tid] = convert_to_ndarray(d)

# Dump tid -> lyrics dictionary into pickle file
with open('./raw/tid_to_lyrics_dict.pkl', 'wb') as f: 
	pickle.dump(tid_to_lyrics, f)

def get_song_key(artist, song_name):
    return str(artist) + "_" + str(song_name)

# Map song name and artist to the track id
sep = '<SEP>'
song_to_lyrics = {}
with open('./raw/mxm_779k_matches.txt', 'r') as f:
    lines = f.readlines()
    for line in lines: 
        if line[0] != '#': 
            elements = line.split(sep)
            tid, artist, song_name = elements[0], elements[1], elements[2]
            try:
                # Remap artist_song_name -> tid -> lyrics
                song_to_lyrics[get_song_key(artist, song_name)] = tid_to_lyrics[tid]

                # delete entry from memory
                del tid_to_lyrics[tid]

            except Exception: 
                pass

# clean up any missing tids
del tid_to_lyrics

# Dump artist_song_name -> lyrics dictionary into pickle file
with open('./raw/unfiltered_song_to_lyrics_dict.pkl', 'wb') as f: 
	pickle.dump(song_to_lyrics, f)

# load in song + hotness dataset
print("2. Loading hotness data...")
df = pd.read_csv("./raw/song_data.csv")

print("3. Filtering songs without available lyrics...")
print("--- before hotness shape: " + str(df.shape), end="\n")
print("--- before lyrics size: " + str(len(song_to_lyrics.keys())))

filtered_lyrics = {}
for index, row in df.iterrows():
    if (get_song_key(row.artist_name, row.song_name) in song_to_lyrics):
        song_key = get_song_key(row.artist_name, row.song_name)
        filtered_lyrics[song_key] = song_to_lyrics[song_key]
        del song_to_lyrics[song_key]
    else:
        df.drop(index, inplace=True)

print("FILTERING complete.")
print("--- after hotness shape: " + str(df.shape))
print("--- after lyrics size: " + str(len(filtered_lyrics.keys())))

# Write to disk the list of filtered song hotnesses
df.to_csv('./song_info.csv')

# Dump artist_song_name -> lyrics dictionary into pickle file
with open('./raw/song_lyrics.pkl', 'wb') as f: 
	pickle.dump(filtered_lyrics, f)





