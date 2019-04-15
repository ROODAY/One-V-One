from predict_popularity import predict as P_Predict
from predict_genre import predict as G_Predict

def runPrediction(audioFileName, transcripts):
  text = ''
  if len(transcripts) > 0:
    text = transcripts[0]['text'] or ''
  return {
    'hotness': P_Predict(audioFileName, text).tolist()[0],
    'genre': G_Predict(audioFileName)
  }