import { useEffect, useState } from "react";
import { API_BASE_URL, API_HEADERS } from "../config/constants";

export default function useFetchCalls(sentimentLabel) {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const url = sentimentLabel
          ? `${API_BASE_URL}/call/listing?sentimentLabel=${sentimentLabel}`
          : `${API_BASE_URL}/call/listing`;

        const res = await fetch(url, {
          method: "GET",
          headers: API_HEADERS,
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setCalls(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [sentimentLabel]);

  return { calls, loading, error };
}
