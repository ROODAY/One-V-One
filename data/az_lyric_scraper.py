# Lyrics scraper using AZLyrics pages
# and beautiful soup to parse out lyric body.

import re
from urllib.request import urlopen # make requests from python

# Parse HTML content --- scrape lyrics from site
from bs4 import BeautifulSoup
 
 # API function to get the lyrics for a song and artist
def get_lyrics(song_title, artist):

    # Normalize
    artist = artist.lower()
    artist = re.sub('[^A-Za-z0-9]+', "", artist)

    song_title = song_title.lower()
    song_title = re.sub('[^A-Za-z0-9]+', "", song_title)

    # Remove 'the' from start of artist name
    if artist.startswith("the"):
        artist = artist[3:]
    
    # Formatting for azlyrics url
    url = "http://azlyrics.com/lyrics/"+artist+"/"+song_title+".html"
    print(url)
    
    try:
        content = urlopen(url).read()
        soup = BeautifulSoup(content, 'html.parser')
        lyrics = str(soup)

        # lyrics lies between up_partition and down_partition
        up_partition = '<!-- Usage of azlyrics.com content by any third-party lyrics provider is prohibited by our licensing agreement. Sorry about that. -->'
        down_partition = '<!-- MxM banner -->'

        lyrics = lyrics.split(up_partition)[1]
        lyrics = lyrics.split(down_partition)[0]
        lyrics = re.sub(r"\<.*\>", "", lyrics).replace('\n', " ").strip()

        print('---- AZLyrics: OK.')
        
        return lyrics
    except Exception:
        print('---- AZLyrics: No lyrics found for {} by {}.'.format(song_title, artist))
        return None