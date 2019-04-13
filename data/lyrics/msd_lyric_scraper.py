# Transform raw MusixMatch lyrics dataset into python dictionaries
# TrackID -> [word count vector]
# modified from https://github.com/ianscottknight/Musical-Genre-Classification-of-Song-Lyrics

import collections
import operator
import pickle
import os

song_lyrics = init_dict()

def get_lyrics(song_title, artist):
    return song_lyrics[get_song_key(artist, song_title)]

# Convert each dictionary into ndarray
def convert_to_ndarray(d):
    arr = [0] * 5000
    for key, val in d.items():
        key = int(key) - 1
        arr[key] = val
    return arr

def init_dict():
    if not os.path.isfile('./raw/unfiltered_song_to_lyrics_dict.pkl'):
        
        tid_to_lyrics = None
        
        if not os.path.isfile('./raw/tid_to_lyrics_dict.pkl'):
            tid_to_lyrics = build_tid_to_lyrics
        else:
            with open('./raw/tid_to_lyrics_dict.pkl') as f:
                tid_to_lyrics = pickle.load(f)
        
        return build_song_to_lyrics(tid_to_lyrics)
    else:
        with open('./raw/unfiltered_song_to_lyrics_dict.pkl') as f:
                return pickle.load(f)
    

def get_song_key(artist, song_name):
        return '{}_{}'.format(artist, song_name)

def build_song_to_lyrics(tid_to_lyrics):
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
    
    return song_to_lyrics
        

def build_tid_to_lyrics():
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
                    if not os.path.isfile('./vocab.txt'):
                        with open('./vocab.txt', 'w') as vocab_f:
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
    
    return tid_to_lyrics