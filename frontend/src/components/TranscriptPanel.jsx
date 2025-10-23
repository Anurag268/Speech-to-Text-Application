import React from "react";
import { Loader2, FileText, Clock } from "lucide-react";

function TranscriptPanel({ transcript, history = [], loading }) {
  return (
    <div className="bg-slate-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="text-indigo-400" /> Transcript Output
      </h2>

      {/* Current transcript */}
      <div className="h-48 overflow-y-auto p-4 bg-slate-900/40 rounded-lg text-slate-200 mb-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="animate-spin text-indigo-400" size={36} />
            <p className="mt-3 text-slate-400 text-sm">Transcribing audio...</p>
          </div>
        ) : transcript ? (
          <p className="whitespace-pre-wrap leading-relaxed">{transcript}</p>
        ) : (
          <p className="text-slate-500 text-center italic">
            No transcript yet. Record or upload audio to begin.
          </p>
        )}
      </div>

      {/* Transcript history */}
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-indigo-400">
        <Clock size={18} /> History
      </h3>
      <div className="h-48 overflow-y-auto p-4 bg-slate-900/30 rounded-lg text-slate-200">
        {history.length === 0 ? (
          <p className="text-slate-500 text-center italic">No previous transcripts.</p>
        ) : (
          history
            .slice()
            .reverse() // show latest first
            .map((item, idx) => (
              <div
                key={idx}
                className="mb-3 p-2 border-b border-slate-700 last:border-b-0"
              >
                <p className="text-slate-400 text-xs mb-1">
                  {item.filename} • {item.duration}s • {item.language.toUpperCase()}
                </p>
                <p className="whitespace-pre-wrap leading-relaxed">{item.text}</p>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default TranscriptPanel;
