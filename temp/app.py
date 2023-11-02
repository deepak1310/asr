import os
import sounddevice as sd
import numpy as np
from scipy.io.wavfile import write
from pydub import AudioSegment
from flask import Flask, send_file
from flask_cors import CORS
from faster_whisper import WhisperModel

app = Flask(__name__)
CORS(app)

@app.route('/')
def record_and_save_audio():
    print("Recording...")
    fs = 16000  # Sample rate
    seconds_per_chunk = 2  # Adjust this as needed
    max_silence_duration = 0.75  # Adjust this as needed
    recording = []

    while True:
        chunk = sd.rec(int(seconds_per_chunk * fs), samplerate=fs, channels=2)
        sd.wait()
        recording.extend(chunk)
        #print(recording)
        # Check if there's a pause
        if len(recording) > fs * max_silence_duration:
            recording_np = np.array(recording)
            if (np.max(recording_np[int(-fs * max_silence_duration):]) < 0.03) and (np.min(recording_np[int(-fs * max_silence_duration):]) > -0.03):
                break

    audio_path = "outputx.wav"
    write(audio_path, fs, np.array(recording))

    # Convert to MP3 using pydub
    sound = AudioSegment.from_wav(audio_path)
    mp3_path = "outputx.mp3"
    sound.export(mp3_path, format="mp3")

    modelASR = WhisperModel("small")
    segments, info = modelASR.transcribe(mp3_path)
    asr_result = ""
    for segment in segments:
        asr_result += segment.text

    return asr_result

if __name__ == '__main__':
    app.run(debug=True)

