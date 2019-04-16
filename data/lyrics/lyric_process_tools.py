import csv
import sys
import pickle
import pandas as pd
import numpy as np
import os

def clean():
    if (os.path.isfile('../raw/filtered_song_data.csv')):
        df = pd.read_csv("../raw/filtered_song_data.csv")
    else:
        df = pd.read_csv("../raw/song_data.csv")

        with open('nohup.out', 'r', encoding="utf-8") as lyrics_file:
            lyrics = [line.rstrip('\n') for line in lyrics_file]
            
            print('Starting cleaning:')
            print("---- before data shape: {}".format(df.shape))

            GENIUS_OK_MESSAGE = '---- GENIUS: OK.'
            AZ_OK_MESSAGE = '---- AZLyrics: OK.'

            index = 0
            while index < len(lyrics):
                df_index = int(lyrics[index].split('.')[0]) - 1
                if index + 1 < len(lyrics) and lyrics[index+1] == GENIUS_OK_MESSAGE:
                    index += 2
                elif index + 2 < len(lyrics):
                    if lyrics[index+2] != AZ_OK_MESSAGE:
                        df.drop(df_index, inplace=True)
                    index += 3

            print("Cleaning complete.")
            print("---- after data shape: " + str(df.shape))
            df.to_csv('../raw/filtered_song_data.csv')

    return df

def merge(df=None, lyrics_list=None):
    if not df and not os.path.isfile('../raw/filtered_song_data.csv'):
        df = clean()
    elif os.path.isfile('../raw/filtered_song_data.csv'):
        df = pd.read_csv("../raw/filtered_song_data.csv")
    else:
        print('No filtered song data file. Please run preprocess_lyric_data.py')
        return

    # DROP rows
    if (df['index']):
        df = df.drop('index', axis=1)
    
    drop_list = ['song_name', 'artist_name', 'song_duration_ms', 'acousticness', 'danceability', 'energy', 'instrumentalness',	'liveness', 'loudness', 'speechiness', 'audio_valence']
    for col in drop_list:
        df = df.drop(col, axis=1)

    if not lyrics_list:
        if os.path.isfile('song_lyrics.txt'):
            with open('song_lyrics.txt', 'r', encoding="utf-8") as lyrics_file:
                lyrics_list = [line.rstrip('\n') for line in lyrics_file]
        else:
            print('No song_lyrics.txt file, please run preprocess_lyric_data.py')
            return

    # Add the aggregated song lyrics to the csv
    print('\nAdding song lyrics to hotness csv...')
    print('---- lyrics length ({}) vs. csv length ({})'.format(len(lyrics_list), df.shape[0]))
    
    with open('../song_info.csv', 'a', newline='') as f:
        writer = csv.writer(f)
        for index, row in df.iterrows():
            writer.writerow(row.toList().append(lyrics_list[index]))

    print("Merging complete.")
    print("---- after data shape: " + str(df.shape))

def print_help():
    print('Commands to use:')
    print(' 1. Merge\n---- merge song_lyrics and song_hotness datasets.')
    print(' 2. Clean\n---- clean song_hotness datasets for missing lyrics.')

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print_help()
    else:
        command = sys.argv[1]
        if command == 'merge' or command == 'm':
            merge()
        elif command == 'clean' or command == 'c':
            clean()