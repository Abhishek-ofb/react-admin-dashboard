import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import LiveCallMonitor from "../components/LiveCallMonitor";
import SentimentAnalytics from "../components/SentimentAnalytics";
import AlertsPanel from "../components/AlertsPanel";
import useFetchCalls from "../hooks/useFetchCalls";
import useFetchSentimentCounts from "../hooks/useFetchSentimentCounts";

export default function Dashboard() {
  const [filter, setFilter] = useState(null); 
  // null = all, "positive" | "negative" | "neutral"

  const {
    counts,
    loading: countsLoading,
    error: countsError,
  } = useFetchSentimentCounts();

  const {
    calls,
    loading: callsLoading,
    error: callsError,
  } = useFetchCalls(filter);

  if (callsLoading || countsLoading) return <div className="p-6">Loading data...</div>;
  if (callsError) return <div className="p-6 text-red-500">Error loading calls: {callsError}</div>;
  if (countsError) return <div className="p-6 text-red-500">Error loading sentiment counts: {countsError}</div>;

  const total = counts.all ||0;
  const positives = counts.positive || 0;
  const negatives = counts.negative || 0;
  const neutrals = (counts.neutral + counts.unknown ); // Handle possible "Unknown" key

  // Function to determine if a StatsCard is active
  const isActive = (sentiment) => filter === sentiment || (filter === null && sentiment === "all");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Header />
        <main className="p-6 space-y-6">
          {/* Stats Section */}
          <div className="grid grid-cols-4 gap-4">
          <StatsCard 
            title="All Calls" 
            value={total} 
            onClick={() => setFilter(null)}
            active={isActive("all")}
            color="bg-slate-500"
          />
          <StatsCard 
            title="Positive Calls" 
            value={positives} 
            onClick={() => setFilter("positive")}
            active={isActive("positive")}
            color="bg-green-500"
          />
          <StatsCard 
            title="Negative Calls" 
            value={negatives} 
            onClick={() => setFilter("negative")}
            active={isActive("negative")}
            color="bg-red-500"
          />
          <StatsCard 
            title="Neutral Calls" 
            value={neutrals} 
            onClick={() => setFilter("neutral")}
            active={isActive("neutral")}
            color="bg-yellow-500"
          />

          </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <LiveCallMonitor calls={calls} />
            </div>
            <div className="col-span-1 space-y-4">
              <SentimentAnalytics counts={counts} />
              <AlertsPanel calls={calls} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
