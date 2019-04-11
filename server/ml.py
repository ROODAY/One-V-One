import random

GENRES = [
  "Blues", 
  "Classical", 
  "Country", 
  "Disco", 
  "Hiphop", 
  "Jazz", 
  "Reggae", 
  "Rock", 
  "Metal", 
  "Pop"
]

def scorePost(audioFileName, transcripts):
  return {
    'hotness': random.randint(1,101),
    'genre': random.choice(GENRES)
  }