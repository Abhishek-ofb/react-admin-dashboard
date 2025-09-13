import React, { useEffect, useState, useRef } from "react";

/**
 * Simulates live incoming call analysis data.
 * Emits a new call event every 1.5s; keeps up to `maxCalls`.
 */
export default function useDummyData({ interval = 1500, maxCalls = 12 } = {}) {
  const [calls, setCalls] = useState([]);
  const idRef = useRef(1000);

  useEffect(() => {
    function makeCall() {
      const sentiments = ["positive", "neutral", "negative"];
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      const confidence = +(0.6 + Math.random() * 0.4).toFixed(3);
      const call = {
        call_id: `C-${idRef.current++}`,
        agent: `Agent ${Math.floor(Math.random() * 20) + 1}`,
        customer: `Customer ${Math.floor(Math.random() * 900) + 100}`,
        sentiment,
        confidence,
        duration_sec: Math.floor(30 + Math.random() * 600),
        started_at: new Date().toISOString()
      };
      setCalls(prev => {
        const updated = [call, ...prev];
        return updated.slice(0, maxCalls);
      });
    }

    // seed some initial calls
    for (let i=0;i<6;i++) makeCall();

    const t = setInterval(makeCall, interval);
    return () => clearInterval(t);
  }, [interval, maxCalls]);

  return calls;
}