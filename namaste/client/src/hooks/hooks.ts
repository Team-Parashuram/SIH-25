import { useState } from 'react';
import type { ApiState, MedicineSystem } from '../types/types';
import { API_BASE } from '../types/types';

export const useApiStatus = () => {
  const [state, setState] = useState<ApiState>({
    data: null,
    loading: false,
    error: null
  });

  const checkApiStatus = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_BASE}/health`);
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  return { ...state, checkApiStatus };
};

export const useCodeSearch = () => {
  const [state, setState] = useState<ApiState>({
    data: null,
    loading: false,
    error: null
  });

  const searchCodes = async (query: string, system?: string) => {
    if (!query.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter a search term' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      let url = `${API_BASE}/api/v1/namaste/search?q=${encodeURIComponent(query)}`;
      if (system && system !== "all") {
        url += `&system=${system}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  return { ...state, searchCodes };
};

export const useCodeTranslation = () => {
  const [state, setState] = useState<ApiState>({
    data: null,
    loading: false,
    error: null
  });

  const translateCode = async (code: string, system: MedicineSystem) => {
    if (!code.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter a NAMASTE code' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_BASE}/fhir/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          system: system,
          targetSystem: 'both'
        })
      });
      
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  return { ...state, translateCode };
};

export const useCodeSystemGeneration = () => {
  const [state, setState] = useState<ApiState>({
    data: null,
    loading: false,
    error: null
  });

  const generateCodeSystem = async (system: MedicineSystem) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_BASE}/fhir/CodeSystem/namaste-${system}`);
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  return { ...state, generateCodeSystem };
};

export const useConditionCreation = () => {
  const [state, setState] = useState<ApiState>({
    data: null,
    loading: false,
    error: null
  });

  const createCondition = async (code: string, system: MedicineSystem, patientId: string) => {
    if (!code.trim() || !patientId.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter both NAMASTE code and Patient ID' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_BASE}/fhir/Condition`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          namasteCode: code,
          system: system,
          patientId: patientId
        })
      });
      
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  return { ...state, createCondition };
};
