import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import LiveCallMonitor from "../components/LiveCallMonitor";
import SentimentAnalytics from "../components/SentimentAnalytics";
import AlertsPanel from "../components/AlertsPanel";
import useDummyData from "../hooks/useDummyData";

export default function Dashboard(){
  const calls = useDummyData({ interval: 1400, maxCalls: 14 });

  const total = calls.length;
  const positives = calls.filter(c=>c.sentiment==='positive').length;
  const negatives = calls.filter(c=>c.sentiment==='negative').length;
  const avgConfidence = total ? Math.round((calls.reduce((s,c)=>s+c.confidence,0)/total)*100) : 0;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Header />
        <main className="p-6 space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <StatsCard title="Active Calls" value={total} delta="+2%"> </StatsCard>
            <StatsCard title="Positive Calls" value={positives} delta="+8%"> </StatsCard>
            <StatsCard title="Negative Calls" value={negatives} delta="-3%"> </StatsCard>
            <StatsCard title="Avg Confidence" value={`${avgConfidence}%`}> </StatsCard>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <LiveCallMonitor calls={calls} />
            </div>
            <div className="col-span-1 space-y-4">
              <SentimentAnalytics calls={calls} />
              <AlertsPanel calls={calls} />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}