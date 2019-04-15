import random

from predict_popularity import predict as P_Predict

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

def runPrediction(audioFileName, transcripts):
  return {
    'hotness': P_Predict(audioFileName, transcripts[0]['text'] or ''),
    'genre': random.choice(GENRES)
  }