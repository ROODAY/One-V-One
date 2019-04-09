import pandas as pd
import numpy as np

# API to get lyrics
from lyric_scraper import get_lyrics

# load in original dataset
df = pd.read_csv("./song_data.csv")

# print head to check values
print("Loading data...")
print(df.head(5))
print("... " + df.shape)

lyrics_list = []
for index, row in df.iterrows():
    print(str(index) + ". " + row['song_name'] + " by " + row['artist_name'])
    lyrics_list.append(get_lyrics(row['artist_name'], row['song_name']))

df.assign(lyrics=pd.Series(np.array(lyrics_list)).values)
df.to_csv('./song_data_with_lyrics.csv')