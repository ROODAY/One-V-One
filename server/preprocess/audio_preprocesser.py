# For more details about audio processing see https://github.com/zwaltman/keyedin

import librosa
import numpy as np
from .keyedin import pitchdistribution as pd, classifiers

def preprocess(audio_file, use):
    if use == 'popularity':
        return preprocess_for_popularity(audio_file)
    elif use == 'genre':
        return preprocess_for_genre(audio_file)
    else:
        raise Exception(
            "Use should be 'popularity' or 'genre'. Use was : {}".format(use))

# get mode/key/tempo of audio sample for popularity


def preprocess_for_popularity(audio_file, classifier='ks'):
    audio_mode, key, tempo = 0, 0, 0

    k = None

    # Naive Bayes Classifier for Key Detection
    if classifier == 'nb':
        naive_bayes = classifiers.NaiveBayes()
        dist = pd.PitchDistribution.from_file(audio_file)
        k = naive_bayes.get_key(dist)

    # Krumhansl Schmuckler method for key detection
    if classifier == 'ks':
        krumhansl_schmuckler = classifiers.KrumhanslSchmuckler()
        dist = pd.PitchDistribution.from_file(audio_file)
        k = krumhansl_schmuckler.get_key(dist)
    audio_mode, key = k.get_scale(), k.get_tonic()

    # Librosa for tempo detection
    y, sr = librosa.load(librosa.util.example_audio_file())
    onset_env = librosa.onset.onset_strength(y, sr=sr)
    tempo = librosa.beat.tempo(onset_envelope=onset_env, sr=sr)[0]

    return audio_mode, key, tempo

# ...
def preprocess_for_genre(audio_file):
    y, sr = librosa.load(audio_file, mono=True, duration=15)

    # Different audio features extracted using librosa
    chroma_stft = librosa.feature.chroma_stft(y=y, sr=sr)
    rmse = librosa.feature.rmse(y=y)
    spec_cent = librosa.feature.spectral_centroid(y=y, sr=sr)
    spec_bw = librosa.feature.spectral_bandwidth(y=y, sr=sr)
    rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)
    zcr = librosa.feature.zero_crossing_rate(y)
    mfcc = librosa.feature.mfcc(y=y, sr=sr)

    # Add to our data
    data_row = [np.mean(chroma_stft), np.mean(rmse), np.mean(spec_cent), np.mean(spec_bw), np.mean(rolloff), np.mean(zcr)]
    for e in mfcc:
        data_row += [np.mean(e)]
    return data_row
