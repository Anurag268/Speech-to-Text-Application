

import os
import io
import requests
from pydub import AudioSegment

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
DEEPGRAM_URL = "https://api.deepgram.com/v1/listen"

def transcribe_audio_deepgram(audio_file, language='en'):
    try:
        # Read uploaded file
        audio_data = audio_file.read()
        ext = audio_file.filename.split('.')[-1].lower()

        # Convert to WAV 16kHz mono in memory
        audio = AudioSegment.from_file(io.BytesIO(audio_data), format=ext)
        audio = audio.set_frame_rate(16000).set_channels(1)
        buffer = io.BytesIO()
        audio.export(buffer, format="wav")
        buffer.seek(0)
        duration = round(audio.duration_seconds)

        # Send raw WAV bytes to Deepgram
        headers = {
            "Authorization": f"Token {DEEPGRAM_API_KEY}",
            "Content-Type": "audio/wav"
        }
        params = {
            "language": language,
            "punctuate": "true"
        }

        response = requests.post(DEEPGRAM_URL, headers=headers, params=params, data=buffer)

        if response.status_code != 200:
            print("[Deepgram API Error]", response.status_code, response.text)
            return None, duration

        result = response.json()
        transcript_text = (
            result.get("results", {})
                  .get("channels", [{}])[0]
                  .get("alternatives", [{}])[0]
                  .get("transcript", "")
        )

        if not transcript_text:
            print("[Warning] Empty transcript returned")
            return None, duration

        return transcript_text, duration

    except Exception as e:
        print("[Transcription Error]", e)
        return None, 0
