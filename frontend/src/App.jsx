import React, { useState, useEffect } from "react"; 
import { Upload, Mic } from "lucide-react";
import RecorderPanel from "./components/RecorderPanel";
import TranscriptPanel from "./components/TranscriptPanel";
import { transcribeAudio, getTranscripts } from "./utils/api";

function App() {
  const [transcript, setTranscript] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch transcript history from backend
  const fetchHistory = async () => {
    try {
      const data = await getTranscripts();
      setHistory(data);
    } catch (err) {
      console.error("[Frontend Error - fetchHistory]", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Handle audio upload or recording
  // const handleUpload = async (file) => {
  //   setLoading(true);
  //   try {
  //     const result = await transcribeAudio(file, "en", "guest");
  //     setTranscript(result.transcript || "No transcript found.");
  //     await fetchHistory(); // update history after transcription
  //   } catch (err) {
  //     console.error("[Frontend Error]", err);
  //     setTranscript(`❌ Transcription failed: ${err.message}`);
  //   }
  //   setLoading(false);
  // };
  // Handle audio upload or recording
const handleUpload = async (file) => {
  setLoading(true);

  // Check audio duration before sending
  const audioURL = URL.createObjectURL(file);
  const audio = new Audio(audioURL);

  audio.onloadedmetadata = async () => {
    if (audio.duration < 1) {
      setTranscript("⚠️ Audio is too short. Please record or upload a clip longer than 1 second.");
      setLoading(false);
      return;
    }

    try {
      const result = await transcribeAudio(file, "en", "guest");
      setTranscript(result.transcript || "No transcript found.");
      await fetchHistory(); // update history after transcription
    } catch (err) {
      console.error("[Frontend Error]", err);
      setTranscript(`❌ Transcription failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">
        🎙️ Smart Speech-to-Text Converter
      </h1>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="bg-slate-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mic className="text-indigo-400" /> Record or Upload Audio
          </h2>

          <RecorderPanel onTranscribe={handleUpload} loading={loading} />

          <div className="my-4 flex items-center justify-center">
            <span className="text-slate-400 text-sm">— or —</span>
          </div>

          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-indigo-500 rounded-xl cursor-pointer hover:bg-slate-700/40 transition-all">
            <Upload size={24} className="mb-2 text-indigo-400" />
            <span className="text-sm text-slate-300">Click to upload audio</span>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files.length > 0) handleUpload(e.target.files[0]);
              }}
            />
          </label>
        </div>

        <TranscriptPanel transcript={transcript} history={history} loading={loading} />
      </div>

      <footer className="mt-10 text-slate-500 text-sm text-center">
        Made with ❤️ using React, Flask & Deepgram API
      </footer>
    </div>
  );
}

export default App;
