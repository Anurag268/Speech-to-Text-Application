import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from services.stt_service import transcribe_audio_deepgram
from models.db import init_db, save_transcript, fetch_transcripts

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Database
init_db()

# Health check route
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({'status': 'Backend running ✅'})

# Transcribe endpoint
@app.route('/transcribe', methods=['POST'])
def transcribe():
    try:
        audio_file = request.files.get('file')  # uploaded or recorded audio
        language = request.form.get('language', 'en')
        user_id = request.form.get('user_id', 'guest')

        if not audio_file:
            return jsonify({'error': 'No audio file provided'}), 400

        filename = audio_file.filename

        # Transcribe audio using Deepgram
        transcript_text, duration = transcribe_audio_deepgram(audio_file, language)
        
   
        if transcript_text is None:
            return jsonify({'error': 'Transcription failed. Check backend logs for details.'}), 500

        # Save transcript in DB
        try:
            save_transcript(user_id, transcript_text, duration, filename, language)
        except Exception as db_err:
            print("[Database Error]", db_err)
            # Continue even if DB fails
            pass

        return jsonify({
            'transcript': transcript_text,
            'duration': duration,
            'filename': filename,
            'language': language
        })

    except Exception as e:
        print("[Flask /transcribe ERROR]", e)
        return jsonify({'error': f"Server error: {str(e)}"}), 500

# Get all transcripts
@app.route('/transcripts', methods=['GET'])
def get_transcripts():
    try:
        data = fetch_transcripts()
        return jsonify({'data': data})
    except Exception as e:
        print("[Flask /transcripts ERROR]", e)
        return jsonify({'data': [], 'error': f"Server error: {str(e)}"}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=(os.getenv('FLASK_ENV') == 'development'))
