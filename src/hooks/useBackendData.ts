import { useEffect, useState } from 'react';

export default function useBackendData(endpoint: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [endpoint]);

  return { data, loading };
}
