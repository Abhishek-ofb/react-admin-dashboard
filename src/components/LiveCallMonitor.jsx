import React, { useState } from "react";

export default function LiveCallMonitor({ calls }) {
  const [selectedCall, setSelectedCall] = useState(null);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Live Calls</h3>
        <div className="text-sm text-slate-500">{calls.length} active</div>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="pb-2">From</th>
              <th className="pb-2">To</th>
              <th className="pb-2">Sentiment</th>
              <th className="pb-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {calls.map((c, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-slate-50 cursor-pointer transition"
                onClick={() => setSelectedCall(c)}
              >
                <td className="py-2 font-medium">{c.fromNumber}</td>
                <td className="py-2">{c.toNumber}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      c.sentimentLabel === "positive"
                        ? "bg-emerald-500"
                        : c.sentimentLabel === "negative"
                        ? "bg-rose-500"
                        : "bg-amber-500"
                    }`}
                  >
                    {c.sentimentLabel || "neutral"}
                  </span>
                </td>
                <td className="py-2">
                  {Math.floor(c.duration / 60)}m {c.duration % 60}s
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedCall && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative animate-scaleIn">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-xl"
              onClick={() => setSelectedCall(null)}
            >
              ✕
            </button>

            {/* Header */}
            <h3 className="text-2xl font-semibold mb-4">Call Details</h3>

            <div className="grid grid-cols-2 gap-6">
              {/* Left: Call Info */}
              <div className="space-y-2">
                <p>
                  <strong>From:</strong> {selectedCall.fromNumber}
                </p>
                <p>
                  <strong>To:</strong> {selectedCall.toNumber}
                </p>
                <p>
                  <strong>Sentiment:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      selectedCall.sentimentLabel === "positive"
                        ? "bg-emerald-500"
                        : selectedCall.sentimentLabel === "negative"
                        ? "bg-rose-500"
                        : "bg-amber-500"
                    }`}
                  >
                    {selectedCall.sentimentLabel || "neutral"}
                  </span>
                </p>
                {/* <p>
                  <strong>Sentiment Score:</strong>{" "}
                  {selectedCall.sentimentScore}
                </p> */}
                <p>
                  <strong>Duration:</strong>{" "}
                  {Math.floor(selectedCall.duration / 60)}m{" "}
                  {selectedCall.duration % 60}s
                </p>
              </div>

              {/* Right: Summary */}
              <div className="flex flex-col space-y-4">
                <div className="bg-slate-100 p-3 rounded-lg">
                  <h4 className="font-semibold mb-1">Summary</h4>
                  <p className="text-sm text-slate-700">
                    {selectedCall.summary || "No summary available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
