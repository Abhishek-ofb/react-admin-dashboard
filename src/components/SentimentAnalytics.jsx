import React from "react";
import { PieChart, Pie, Cell, Tooltip, AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function SentimentAnalytics({ calls }) {
  const counts = {
    positive: calls.filter(c => c.sentiment === 'positive').length,
    neutral: calls.filter(c => c.sentiment === 'neutral').length,
    negative: calls.filter(c => c.sentiment === 'negative').length,
  };
  const pieData = [
    { sentiment: 'Positive', value: counts.positive },
    { sentiment: 'Neutral', value: counts.neutral },
    { sentiment: 'Negative', value: counts.negative },
  ];
  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  // small timeseries from calls order
  const areaData = calls.slice().reverse().map((c, idx) => ({
    name: `#${idx+1}`,
    value: c.sentiment === 'positive' ? 2 : (c.sentiment === 'neutral' ? 1 : 0)
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Sentiment Analytics</h3>
        <div className="text-sm text-slate-500">Live sentiment overview</div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <div>
          <PieChart width={220} height={200}>
            <Pie data={pieData} dataKey="value" nameKey="sentiment" outerRadius={80}>
              {pieData.map((entry, i) => <Cell key={i} fill={COLORS[i%COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div style={{width: 300, height: 180}}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#2563eb" fill="#bfdbfe" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}