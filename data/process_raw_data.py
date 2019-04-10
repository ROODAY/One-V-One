# 1. Create lyrics dictionary - song_name + song_artist -> lyrics
# 2. Load hotness CSV and append lyrics to each corresponding song.
# 3. Aggregate missing any missing lyrics from AZLyrics, GENIUS, MSD/MusixMatch dataset

import csv
import pickle
import pandas as pd
import numpy as np

# Available lyric scrapers
# import msd_lyric_scraper as msd_ls # MSD only has 1k matching songs
import genius_lyric_scraper as genius_ls
import az_lyric_scraper as az_ls

# load in song + hotness dataset
print("Loading hotness data...")
df = pd.read_csv("./raw/song_data.csv")

print("Scraping songs with available lyrics...")
print("--- before data shape: " + str(df.shape), end="\n\n")

lyrics_list = []
for index, row in df.iterrows():

    print('{}. {} by {}'.format(index+1, row.song_name, row.artist_name))

    curr_lyrics = genius_ls.get_lyrics(row.song_name, row.artist_name)

    # IF genius fails, try AZLyrics...
    if not curr_lyrics:
        curr_lyrics = az_ls.get_lyrics(row.song_name, row.artist_name)

    # Drop song from dataset if no lyrics
    if not curr_lyrics:
        df.drop(index, inplace=True)
    else:
        lyrics_list.append(curr_lyrics)

# Dump artist_song_name -> lyrics dictionary into pickle file
with open('./raw/song_lyrics.pkl', 'wb') as f: 
	pickle.dump(lyrics_list, f)
        
df = df.assign(lyrics=pd.Series(np.array(lyrics_list)).values)

print("FILTERING complete.")
print("--- after data shape: " + str(df.shape))

# Write to disk the list of filtered song hotnesses
df.to_csv('./song_info.csv')




