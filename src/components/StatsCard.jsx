import React from "react";

export default function StatsCard({ title, value, onClick, active, color }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg shadow cursor-pointer transition text-white
        ${color} 
        ${active ? "ring-2 ring-offset-2 ring-blue-100" : ""}`}
    >
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
