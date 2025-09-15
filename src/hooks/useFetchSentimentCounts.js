import { useEffect, useState } from "react";
import { API_BASE_URL, API_HEADERS } from "../config/constants";

export default function useFetchSentimentCounts() {
  const [counts, setCounts] = useState({ all: 0, positive: 0, neutral: 0, negative: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE_URL}/call/sentiment-counts`, {
          method: "GET",
          headers: API_HEADERS,
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        // Normalize counts to numbers
        setCounts({
          all: Number(data.All || data.all || 0),       // fallback to 0 if missing
          positive: Number(data.positive || 0),
          neutral: Number(data.neutral || 0),
          negative: Number(data.negative || 0),
          unknown : Number(data.Unknown || 0), // in case "Unknown" key exists
        });
        console.log({
          all: Number(data.All || data.all || 0),       // fallback to 0 if missing
          positive: Number(data.positive || 0),
          neutral: Number(data.neutral || 0),
          negative: Number(data.negative || 0),
          unknown : Number(data.Unknown || 0), // in case "Unknown" key exists
        })
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { counts, loading, error };
}
