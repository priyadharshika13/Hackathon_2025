import { useEffect, useRef, useState } from "react";

export interface FraudEvent {
  event_id: string;
  candidate: string;
  event_type: string;
  severity: "High" | "Medium" | "Low";
  timestamp: string;
}

export interface FraudSummary {
  total_events: number;
  high_risk: number;
  medium_risk: number;
  low_risk: number;
  recent_alerts: FraudEvent[];
  insight_en: string;
  insight_ar: string;
}

export interface CandidateDetails {
  candidate: string;
  total_events: number;
  events: FraudEvent[];
  message?: string;
}

export function useFraudMonitor() {
  const [data, setData] = useState<FraudSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [candidateData, setCandidateData] = useState<CandidateDetails | null>(null);
  const [candidateLoading, setCandidateLoading] = useState<boolean>(false);
  const [alertPulse, setAlertPulse] = useState<boolean>(false);

  const prevHighCount = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function fetchCandidateEvents(candidateName: string) {
    try {
      setCandidateLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/fraud/candidate/${candidateName}`);
      const json = await res.json();
      setCandidateData(json);
    } catch (err: any) {
      console.error(err);
    } finally {
      setCandidateLoading(false);
    }
  }

  async function fetchFraudAlerts() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/fraud/alerts`);
      if (!res.ok) throw new Error("Failed to fetch fraud alerts");
      const json = await res.json();

      // Detect increase in high-risk events
      if (json.high_risk > (prevHighCount.current || 0)) {
        triggerAlertEffect();
      }
      prevHighCount.current = json.high_risk;

      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function triggerAlertEffect() {
    // Pulse neon glow
    setAlertPulse(true);
    setTimeout(() => setAlertPulse(false), 3000);

    // Play alert tone
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/alert-tone.mp3");
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  }

  useEffect(() => {
    fetchFraudAlerts();
    const interval = setInterval(fetchFraudAlerts, 15000);
    return () => clearInterval(interval);
  }, []);

  return {
    data,
    loading,
    error,
    candidateData,
    candidateLoading,
    fetchCandidateEvents,
    setCandidateData,
    alertPulse,
  };
}
