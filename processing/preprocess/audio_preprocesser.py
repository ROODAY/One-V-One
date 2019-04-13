
def preprocess(audio, use):
    if use == 'popularity':
        return preprocess_for_popularity(audio)
    elif use == 'genre':
        return preprocess_for_genre(audio)
    else:
        raise Exception("Use should be 'popularity' or 'genre'. Use was : {}".format(use))

# get mode/key/tempo of audio sample for popularity
def preprocess_for_popularity(audio):
    pass

# ...
def preprocess_for_genre(audio):
    pass