import React from "react";

export default function StatsCard({ title, value, delta, children }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-2xl font-bold">{value}</div>
        {delta && <div className="text-sm text-green-600">{delta}</div>}
      </div>
      {children}
    </div>
  );
}