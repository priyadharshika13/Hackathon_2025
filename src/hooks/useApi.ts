import { useState, useEffect } from 'react';
import api from '../lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(url: string, options?: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  dependencies?: any[];
  enabled?: boolean;
}) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const {
    method = 'GET',
    body,
    dependencies = [],
    enabled = true
  } = options || {};

  const fetchData = async () => {
    if (!enabled) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await api.request({
        url,
        method,
        data: body,
      });

      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error.response?.data?.message || error.message || 'An error occurred',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    ...state,
    refetch: fetchData,
  };
}

// Specific hooks for different API endpoints
export const useRecruitmentData = () => useApi('/api/recruitment/candidates');
export const useWorkforceSummary = () => useApi('/api/workforce/summary');
export const usePerformanceSummary = () => useApi('/api/performance/summary');
export const useCommunityOverview = () => useApi('/api/community/overview');
export const useFraudAlerts = () => useApi('/api/fraud/alerts');
export const useAiInsights = () => useApi('/api/insights/generate');
