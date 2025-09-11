import { useState, useEffect } from 'react';
import { fetchSystemStats, type SystemStats } from '../lib/api';

export const useSystemStats = () => {
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshStats = async () => {
        try {
        setLoading(true);
        setError(null);
        const newStats = await fetchSystemStats();
        setStats(newStats);
        } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        refreshStats();
    }, []);

    return { stats, loading, error, refreshStats };
};
