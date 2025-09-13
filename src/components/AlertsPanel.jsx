import React from "react";

export default function AlertsPanel({ calls }) {
  const critical = calls.filter(c => c.sentiment === 'negative' && c.confidence > 0.85);
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Critical Alerts</h3>
      {critical.length === 0 ? (
        <div className="text-sm text-slate-500">No critical alerts</div>
      ) : (
        <ul className="space-y-2">
          {critical.map(c => (
            <li key={c.call_id} className="p-2 border rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{c.call_id} — {c.agent}</div>
                <div className="text-sm text-slate-500">Conf: {Math.round(c.confidence*100)}%</div>
              </div>
              <div>
                <button className="px-3 py-1 bg-rose-500 text-white rounded">Escalate</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}