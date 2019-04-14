from flask import Flask, render_template, send_from_directory, redirect, request, jsonify
from google.cloud import speech
from google.cloud.speech import enums, types
from google.oauth2 import service_account
from dotenv import load_dotenv

from ml import predictHotness

import requests
import io
import os
import uuid
import subprocess
import json
import base64

import firebase_admin
from firebase_admin import credentials, db

load_dotenv(dotenv_path='../.env')

apiKey = os.environ['REACT_APP_SERVER_KEY']
spotifyAuthString = '{}:{}'.format(os.environ['REACT_APP_SPOTIFY_ID'], os.environ['REACT_APP_SPOTIFY_SECRET'])
spotifyAuthBytes = spotifyAuthString.encode('ascii')
spotifyAuthHeader = base64.b64encode(spotifyAuthBytes).decode('ascii')

jsonFirebaseCreds = json.loads(os.environ['FIREBASE_CREDENTIALS'])
firebaseCredentials = credentials.Certificate(jsonFirebaseCreds)
firebase_admin.initialize_app(firebaseCredentials, {
    'databaseURL': os.environ['REACT_APP_DATABASE_URL']
})

jsonSpeechCreds = json.loads(os.environ['GOOGLE_CREDENTIALS'])
speechCredentials = service_account.Credentials.from_service_account_info(jsonSpeechCreds)
speechClient = speech.SpeechClient(credentials=speechCredentials)

app = Flask(__name__, static_folder="../build/static", template_folder="../build")

@app.route("/")
@app.route("/signup")
@app.route("/signin")
@app.route("/signout")
@app.route("/profile")
@app.route("/forgot")
@app.route("/home")
@app.route("/post")
@app.route("/404")
def root():
  return render_template('index.html')

@app.route('/user/<userid>/')
def user(userid):
  return render_template('index.html')

@app.route('/favicon.ico') 
def favicon():
  return send_from_directory(app.template_folder, 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/manifest.json') 
def manifest():
  return send_from_directory(app.template_folder, 'manifest.json', mimetype='application/json')

@app.errorhandler(404)
def page_not_found(e):
    return redirect('/404')

#####
# API
#####
def scorePost(audioUrl, transcripts=None):
  audioData = requests.get(audioUrl)
  fileID = str(uuid.uuid4())
  open(fileID + '.tmp.webm', 'wb').write(audioData.content)

  subprocess.call(
    'ffmpeg -loglevel panic -i {}.tmp.webm {}.tmp.wav'.format(fileID, fileID),
    shell=True)

  res = {}
  if (transcripts == None):
    with io.open(fileID + '.tmp.wav', 'rb') as audio_file:
      content = audio_file.read()
      audio = types.RecognitionAudio(content=content)
      config = types.RecognitionConfig(language_code='en-US')

      response = speechClient.recognize(config, audio)
      res['transcripts'] = [{'text': alternative.transcript, 'conf': alternative.confidence} for result in response.results for alternative in result.alternatives]
      transcripts = res['transcripts']

  res['prediction'] = predictHotness(fileID + '.tmp.wav', transcripts)

  os.remove(fileID + '.tmp.wav')
  os.remove(fileID + '.tmp.webm')
  return res

@app.route('/api/predict', methods=['POST'])
def getPrediction():
  key = request.args.get('key')
  if key == apiKey:
    res = scorePost(request.get_json()['audioPath'])
    return jsonify(res)
  else:
    return 'Invalid API key: {}'.format(key),401

@app.route('/api/repredict', methods=['POST'])
def runPredictions():
  key = request.args.get('key')
  if key == apiKey:
    postsRef = db.reference('posts')
    posts = postsRef.get()

    for postId, postData in posts.items():
      res = scorePost(postData['audioPath'], postData['transcripts'])

      postRef = postsRef.child(postId)
      postRef.update({
          'hotness': res['prediction']['hotness']
      })

    return "Posts have been re-scored"
  else:
    return 'Invalid API key: {}'.format(key),401

@app.route('/api/getGenres')
def getGenres():
  headers = {
    'Authorization': 'Bearer {}'.format(getSpotifyOAuthToken())
  }
  res = requests.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', headers=headers)
  return jsonify(res.json())

@app.route('/api/getArtists')
def getArtists():
  query = request.args.get('q')
  headers = {
    'Authorization': 'Bearer {}'.format(getSpotifyOAuthToken())
  }
  res = requests.get('https://api.spotify.com/v1/search?q={}&type=artist'.format(query), headers=headers)
  return jsonify(res.json())

def getSpotifyOAuthToken():
  data = {
    'grant_type': 'client_credentials'
  }
  headers = {
    'Authorization': 'Basic {}'.format(spotifyAuthHeader)
  }
  res = requests.post('https://accounts.spotify.com/api/token', data=data, headers=headers)
  return res.json()['access_token']

if __name__ == "__main__":
  app.run(host='0.0.0.0')

getSpotifyOAuthToken()