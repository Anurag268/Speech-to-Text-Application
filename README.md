# Speech-to-Text-Application
# 🗣️ Speech-to-Text Web Application (React + Flask + PostgreSQL)

A **full-stack web application** that converts spoken audio into text in real-time.  
Built with **React** for the frontend, **Flask** for the backend, and **PostgreSQL** for data storage.  
Integrates with [DeepInfra Speech-to-Text API](https://deepinfra.com/) or [Google Speech-to-Text](https://cloud.google.com/speech-to-text/docs) for transcription.

---

## 📌 Features

- 🎤 Record voice directly from the browser  
- 📝 Real-time or on-stop transcription  
- ☁️ API integration with DeepInfra / Google Speech  
- 💾 Transcript history saved in PostgreSQL  
- 🔐 Authentication (optional)  
- 📤 Export transcripts (.txt / .docx)  
- 🌐 Deployed frontend and backend

---

## 🧱 Tech Stack

| Layer           | Technology                                                   |
|------------------|--------------------------------------------------------------|
| Frontend         | [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/) |
| Backend          | [Flask](https://flask.palletsprojects.com/) (Python)          |
| Database         | [PostgreSQL](https://www.postgresql.org/)                     |
| Speech API       | DeepInfra / Google Speech-to-Text                             |
| Deployment       | Vercel / Netlify (Frontend), Render / Heroku (Backend)        |

---

## 🧰 Prerequisites

- Node.js (>= 18.x)
- Python (>= 3.9)
- PostgreSQL installed and running
- API key for DeepInfra or Google STT
- Git

---

## 🚀 Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Anurag268/speech-to-text-application.git
cd speech-to-text-application
