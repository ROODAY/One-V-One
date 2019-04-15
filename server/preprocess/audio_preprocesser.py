# For more details about audio processing see https://github.com/zwaltman/keyedin

import librosa
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
    pass
