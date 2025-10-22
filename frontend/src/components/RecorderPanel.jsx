import React, { useState, useRef, useEffect } from "react";
import { Mic, StopCircle } from "lucide-react";

function RecorderPanel({ onTranscribe, loading }) {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setSeconds(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunks.current = [];

      mediaRecorder.ondataavailable = (e) => chunks.current.push(e.data);
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });
        await onTranscribe(file);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access denied or not available.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-3">
        {isRecording ? (
          <button
            onClick={stopRecording}
            disabled={loading}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            <StopCircle size={22} /> Stop Recording
          </button>
        ) : (
          <button
            onClick={startRecording}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            <Mic size={22} /> Start Recording
          </button>
        )}

        {isRecording && (
          <div className="flex items-center gap-2 mt-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-slate-400 text-sm">
              Recording... {Math.floor(seconds / 60)}:{("0" + (seconds % 60)).slice(-2)}
            </span>
          </div>
        )}

        {loading && !isRecording && (
          <p className="text-slate-400 mt-3 text-sm">Transcribing audio...</p>
        )}
      </div>
    </div>
  );
}

export default RecorderPanel;
