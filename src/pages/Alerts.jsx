import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { API_BASE_URL, API_HEADERS } from "../config/constants";

export default function AlertsPage() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(null);

  // Fetch negative calls
  useEffect(() => {
    async function fetchCalls() {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/call/listing?sentimentLabel=negative`,
          {
            method: "GET",
            headers: API_HEADERS,
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        // Map API response to UI model
        const mapped = data.map((d, i) => ({
          call_id: d.fromNumber || `call-${i}`,
          agent: d.toNumber || "Unknown Agent",
          customer: d.fromNumber || "Unknown Customer",
          confidence: parseFloat(d.sentimentScore) || 0,
          duration: d.duration || "N/A",
          summary: d.summary || "No summary available",
        }));

        setCalls(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCalls();
  }, []);

  // Filter critical alerts
  const critical = calls;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Header />
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">Critical Alerts</h2>

          {loading && <div>Loading alerts...</div>}
          {error && <div className="text-red-500">{error}</div>}

          {!loading && !error && critical.length === 0 && (
            <div className="bg-white p-6 rounded-lg shadow text-slate-500">
              No critical alerts at the moment 🎉
            </div>
          )}

          {!loading && !error && critical.length > 0 && (
            <div className="grid gap-4">
              {critical.map((c) => (
                <div
                  key={c.call_id}
                  className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-rose-50 transition"
                  onClick={() => setPopup(c)} // show popup on click
                >
                  <div className="font-semibold">
                    Call ID: {c.call_id} — Agent: {c.agent}
                  </div>
                  <div className="text-sm text-slate-500">
                    Customer: {c.customer} | Confidence:{" "}
                    {Math.round(c.confidence * 100)}% | Duration: {c.duration}s
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{c.summary}</div>
                </div>
              ))}
            </div>
          )}

          {/* Popup Modal */}
          {popup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">
                  Critical Alert 🚨
                </h3>
                <p className="mb-2">
                  Call ID: <strong>{popup.call_id}</strong>
                </p>
                <p className="mb-2">
                  Agent: <strong>{popup.agent}</strong>
                </p>
                <p className="mb-2">
                  Customer: <strong>{popup.customer}</strong>
                </p>
                <p className="mb-2">
                  Duration: <strong>{popup.duration}s</strong>
                </p>
                <p className="mb-2">
                  Confidence:{" "}
                  <strong>{Math.round(popup.confidence * 100)}%</strong>
                </p>
                <p className="mb-4 text-gray-600">{popup.summary}</p>
                <button
                  onClick={() => setPopup(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
