from amen.utils import example_audio_file
from amen.audio import Audio
from amen.synthesize import synthesize

audio_file = example_audio_file()
audio = Audio(audio_file)

beats = audio.timings['beats']
print(audio.features)
# beats.reverse()

# out = synthesize(beats)
# out.output('reversed.wav')