import React from "react";

export default function LiveCallMonitor({ calls }) {
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
              <th className="pb-2">Call</th>
              <th className="pb-2">Agent</th>
              <th className="pb-2">Customer</th>
              <th className="pb-2">Sentiment</th>
              <th className="pb-2">Confidence</th>
              <th className="pb-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {calls.map(c => (
              <tr key={c.call_id} className="border-t">
                <td className="py-2 font-medium">{c.call_id}</td>
                <td className="py-2">{c.agent}</td>
                <td className="py-2">{c.customer}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-white ${
                    c.sentiment === 'positive' ? 'bg-emerald-500' : c.sentiment === 'negative' ? 'bg-rose-500' : 'bg-amber-500'
                  }`}>{c.sentiment}</span>
                </td>
                <td className="py-2">{Math.round(c.confidence*100)}%</td>
                <td className="py-2">{Math.floor(c.duration_sec/60)}m {c.duration_sec%60}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}