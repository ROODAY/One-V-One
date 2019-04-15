from predict_popularity import predict as P_Predict
from predict_genre import predict as G_Predict

def runPrediction(audioFileName, transcripts):
  return {
    'hotness': P_Predict(audioFileName, transcripts[0]['text'] or '').tolist()[0],
    'genre': G_Predict(audioFileName)
  }