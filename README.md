# 🎙️ Smart Speech-to-Text Converter

A full-stack web application to **convert recorded or uploaded audio into text** in real-time. Built with **React, Flask, and Deepgram API**, with optional transcript history using **PostgreSQL**.

---

## **Features**

* Record audio using your microphone.
* Upload prerecorded audio files.
* Real-time transcription using **Deepgram API**.
* Display transcript immediately.
* Transcript history with clickable items.
* Detect empty or too-short audio and show friendly warnings.
* Responsive and interactive UI with **Tailwind CSS**.

---

## **Tech Stack**

**Frontend:**

* React (create-react-app)
* Tailwind CSS
* Lucide icons

**Backend:**

* Python Flask
* Flask-CORS
* Deepgram Speech-to-Text API

**Database (Optional):**

* PostgreSQL

**Other Libraries:**

* `pydub` for audio conversion
* `requests` for API calls
* `dotenv` for environment variables

---

## **Installation**

### **1. Clone the repository**

```bash
git clone <your-repo-url>
cd your-repo
```

### **2. Set up backend**

```bash
cd backend
python -m venv venv
# Activate venv
# Windows: venv\Scripts\activate
# Linux/macOS: source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file:

```
DEEPGRAM_API_KEY=your_deepgram_api_key
FLASK_ENV=development
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/dbname  # optional
```

Run the backend:

```bash
python app.py
```

---

### **3. Set up frontend**

```bash
cd frontend
npm install
```

Create a `.env` file:

```
REACT_APP_API_URL=http://localhost:5000
```

Run the frontend:

```bash
npm start
```

Visit: `http://localhost:3000`

---

## **Usage**

1. **Record audio:** Click **Start Recording**.
2. **Upload audio:** Click the upload panel and select your audio file.
3. **View transcript:** Transcript appears in the right panel.
4. **View history:** Scroll down in the transcript panel to see past transcriptions.
5. **Handle empty audio:** If audio is empty or too short, a friendly warning is shown.

---

## **Project Structure**

```
project-root/
│
├─ backend/
│   ├─ app.py
│   ├─ services/
│   │   └─ stt_service.py
│   ├─ models/
│   │   └─ db.py
│   └─ requirements.txt
│
├─ frontend/
│   ├─ src/
│   │   ├─ App.jsx
│   │   ├─ components/
│   │   │   ├─ RecorderPanel.jsx
│   │   │   └─ TranscriptPanel.jsx
│   │   └─ utils/
│   │       └─ api.js
│   └─ package.json
│
└─ README.md
```

---

## **Environment Variables**

* `DEEPGRAM_API_KEY` – Your Deepgram API key.
* `FLASK_ENV` – Set to `development` for debug mode.
* `PORT` – Backend server port.
* `REACT_APP_API_URL` – Frontend API endpoint.

---

## **Future Enhancements**

* Speaker diarization (multi-speaker detection)
* Punctuation and capitalization improvements
* Download transcript as `.txt` or `.docx`
* User authentication and private transcript storage

---

## **License**

MIT License © Anurag Singh
