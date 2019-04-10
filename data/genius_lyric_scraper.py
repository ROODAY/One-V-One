# Use GENIUS lyrics + Beautiful Soup to extract lyrics
import lyricsgenius
import raw.config as config
import requests

genius = lyricsgenius.Genius(config.client_access_token)
genius.remove_section_headers = True # Remove section headers (e.g. [Chorus]) from lyrics when searching
genius.skip_non_songs = False # Include hits thought to be non-songs (e.g. track lists)
genius.verbose = False # Turn off status messages

def get_lyrics(song_title, artist):
    try:
        song = genius.search_song(song_title, artist)
        if song:
            print('---- GENIUS: OK.')
            return song.lyrics
        else:
            print('---- GENIUS: No lyrics found for {} by {}.'.format(song_title, artist))
            return None
    except requests.exceptions.Timeout:
        print('---- GENIUS: Timeout occured.')
        return None
    except:
        print('---- GENIUS: Exception occured.')
        return None