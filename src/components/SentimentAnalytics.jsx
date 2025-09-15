import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function SentimentAnalytics({ counts }) {
  if (!counts) return null;

  const pieData = [
    { sentiment: "Positive", value: counts.positive || 0 },
    { sentiment: "Neutral", value: (counts.neutral + counts.unknown)  || 0 },
    { sentiment: "Negative", value: counts.negative  || 0 },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-semibold">Sentiment Analytics</h3>
      <PieChart width={220} height={200}>
        <Pie data={pieData} dataKey="value" nameKey="sentiment" outerRadius={80}>
          {pieData.map((entry, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
