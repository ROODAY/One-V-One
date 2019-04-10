# 1. Create lyrics dictionary - song_name + song_artist -> lyrics
# 2. Load hotness CSV and append lyrics to each corresponding song.
# 3. Aggregate missing any missing lyrics from AZLyrics, GENIUS, MSD/MusixMatch dataset

import csv
import sys
import pickle
import pandas as pd
import numpy as np

# Available lyric scrapers
# import msd_lyric_scraper as msd_ls # MSD only has 1k matching songs
import genius_lyric_scraper as genius_ls
import az_lyric_scraper as az_ls

# load in song + hotness dataset
print("Loading hotness data...")
orig_df = pd.read_csv("./raw/song_data.csv")
df = orig_df

start_index = 0
end_index = df.shape[0]

# Command line optionally takes indexes to start and stop
if len(sys.argv) > 1:
    start_index = int(sys.argv[1])
    if len(sys.argv) > 2:
        end_index = int(sys.argv[2])
        df = orig_df[start_index:end_index]
    else:
        df = orig_df[start_index:]

print("Scraping songs[{}:{}] with available lyrics...".format(start_index, end_index))
print("--- before data shape: " + str(df.shape), end="\n\n")

# Keep track of last executed index just in case.
last_index = start_index
lyrics_list = []

try:
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
            last_index += 1
            lyrics_list.append(curr_lyrics + "\n")
    
    # Add the aggregated song lyrics to the csv
    print('\nAdding song lyrics to hotness csv...')
    print('---- lyrics length ({}) vs. csv length ({})'.format(len(lyrics_list), df.shape[0]))
    
    df = df.assign(lyrics=pd.Series(np.array(lyrics_list)).values)

    print("PROCESSING complete.")
    print("--- after data shape: " + str(df1.shape))

    # Write to disk the list of filtered song hotnesses
    df.to_csv('./song_info.csv')
except Exception as e:
    print("\nError occured: {}".format(e))
finally:
    with open('song_lyrics.txt', 'w') as lyrics_file:
        lyrics_file.writelines(lyrics_list)