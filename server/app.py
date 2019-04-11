from flask import Flask, render_template, send_from_directory, redirect, request, jsonify
from google.cloud import speech
from google.cloud.speech import enums, types
from google.oauth2 import service_account

from ml import scorePost

import requests
import io
import os
import uuid
import subprocess
import json

jsonCreds = json.loads(os.environ['GOOGLE_CREDENTIALS'])
credentials = service_account.Credentials.from_service_account_info(jsonCreds)
speechClient = speech.SpeechClient(credentials=credentials)

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

@app.route('/api/predict', methods=['POST'])
def getTranscript():
  if request.method == 'POST':
    audioUrl = request.get_json()['audioPath']
    audioData = requests.get(audioUrl)
    fileID = str(uuid.uuid4())
    open(fileID + '.tmp.webm', 'wb').write(audioData.content)

    subprocess.call(
      'ffmpeg -loglevel panic -i {}.tmp.webm {}.tmp.wav'.format(fileID, fileID),
      shell=True)

    res = {}
    with io.open(fileID + '.tmp.wav', 'rb') as audio_file:
      content = audio_file.read()
      audio = types.RecognitionAudio(content=content)
      config = types.RecognitionConfig(language_code='en-US')

      response = speechClient.recognize(config, audio)
      res['transcripts'] = [{'text': alternative.transcript, 'conf': alternative.confidence} for result in response.results for alternative in result.alternatives]

    res['prediction'] = scorePost(fileID + '.tmp.wav', res['transcripts'])

    os.remove(fileID + '.tmp.wav')
    os.remove(fileID + '.tmp.webm')
    return jsonify(res)
  else:
    raise InvalidUsage('This view is gone', status_code=400)


class InvalidUsage(Exception):
  status_code = 400

  def __init__(self, message, status_code=None, payload=None):
    Exception.__init__(self)
    self.message = message
    if status_code is not None:
        self.status_code = status_code
    self.payload = payload

  def to_dict(self):
    rv = dict(self.payload or ())
    rv['message'] = self.message
    return rv

if __name__ == "__main__":
  app.run(host='0.0.0.0')