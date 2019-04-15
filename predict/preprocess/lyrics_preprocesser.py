import io
import os
import re
import math
import json
import pickle
import string
import requests
import numpy as np
from itertools import product
from inspect import getsourcefile
from os.path import abspath, join, dirname

# Use NLTK tools to preprocess text into tf-idf vectors
import nltk
# nltk.download()

# Multilingual Stopwords
stop_words = set(nltk.corpus.stopwords.words('english') +
                 nltk.corpus.stopwords.words('spanish'))

# Porter Stemmer for Preprocessing
porter = nltk.PorterStemmer()


def rm_html_tags(str):
    html_prog = re.compile(r'<[^>]+>', re.S)
    return html_prog.sub('', str)


def rm_html_escape_characters(str):
    pattern_str = r'&quot;|&amp;|&lt;|&gt;|&nbsp;|&#34;|&#38;|&#60;|&#62;|&#160;|&#20284;|&#30524;|&#26684|&#43;|&#20540|&#23612;'
    escape_characters_prog = re.compile(pattern_str, re.S)
    return escape_characters_prog.sub('', str)


def rm_at_user(str):
    return re.sub(r'@[a-zA-Z_0-9]*', '', str)


def rm_url(str):
    return re.sub(r'http[s]?:[/+]?[a-zA-Z0-9_\.\/]*', '', str)


def rm_repeat_chars(str):
    return re.sub(r'(.)(\1){2,}', r'\1\1', str)


def rm_hashtag_symbol(str):
    return re.sub(r'#', '', str)


def rm_time(str):
    return re.sub(r'[0-9][0-9]:[0-9][0-9]', '', str)


def rm_punctuation(current_tweet):
    return re.sub(r'[^\w\s]', '', current_tweet)


def preprocess_text(str):
    str = str.lower()
    str = rm_url(str)
    str = rm_at_user(str)
    str = rm_repeat_chars(str)
    str = rm_hashtag_symbol(str)
    str = rm_time(str)

    try:
        str = rm_punctuation(str)
        str = nltk.tokenize.word_tokenize(str)
        str = [porter.stem(t) for t in str]
    except:
        print(str)

    return str


def preprocess_data(x, output_file=None):
    # record statistics of the df and tf for each word; Form: { word:[tf, df,index] }
    words_stat = {}
    lyrics_list = []

    for i, line in enumerate(x):
        postprocess_text = []
        words = preprocess_text(line)

        for word in words:
            if word not in stop_words:
                postprocess_text.append(word)
                if word in words_stat.keys():
                    words_stat[word][0] += 1
                    if i != words_stat[word][2]:
                        words_stat[word][1] += 1
                        words_stat[word][2] = i
                else:
                    words_stat[word] = [1, 1, i]
        lyrics_list.append(' '.join(postprocess_text))

    # save lyrics bag of words
    if output_file:
        with open(output_file, 'w') as f:
            f.writelines([lyrics+"\n" for lyrics in lyrics_list])

    # Credits to Lab 1 in CS4242 Course NUS
    if not os.path.isfile('../../data/lyrics/word_stats.txt'):
        print("The number of unique words in data set is %i." %
              len(words_stat.keys()))
        lowTF_words = set()
        with open(os.path.join('../../data/lyrics', 'words_stats.txt'), 'w') as f:
            f.write('TF\tDF\tWORD\n')
            for word, stat in sorted(words_stat.items(), key=lambda i: i[1], reverse=True):
                f.write('\t'.join([str(m)
                                   for m in stat[0:2]]) + '\t' + word + '\n')
                if stat[0] < 2:
                    lowTF_words.add(word)
        print("The number of low frequency words is %d." % len(lowTF_words))

    return lyrics_list


def preprocess(x):
    # Load list of words + TF-IDF statistics
    postprocess_text = []
    words = preprocess_text(x)

    for word in words:
        if word not in stop_words:
            postprocess_text.append(word)
    return ' '.join(postprocess_text)