import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import useDummyData from "../hooks/useDummyData";

export default function AlertsPage() {
  const calls = useDummyData({ interval: 2000, maxCalls: 20 });
  const critical = calls.filter(
    (c) => c.sentiment === "negative" && c.confidence > 0.85
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Header />
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">Critical Alerts</h2>
          {critical.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-slate-500">
              No critical alerts at the moment 🎉
            </div>
          ) : (
            <div className="grid gap-4">
              {critical.map((c) => (
                <div
                  key={c.call_id}
                  className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold">
                      {c.call_id} — {c.agent}
                    </div>
                    <div className="text-sm text-slate-500">
                      Customer: {c.customer} | Confidence:{" "}
                      {Math.round(c.confidence * 100)}%
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-rose-600 text-white rounded">
                    Escalate
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
