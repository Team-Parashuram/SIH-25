const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface SystemStats {
    totalCodes: number;
    systemsActive: number;
    translationsToday: number;
    successRate: number;
    activeUsers: number;
    fhirResources: number;
    }

    export interface ApiError {
    message: string;
    status?: number;
    }

    export const fetchSystemStats = async (): Promise<SystemStats> => {
    try {
        const response = await fetch(`${API_BASE_URL}/namaste/stats`);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return {
        totalCodes: data.total_codes || 7133,
        systemsActive: 3, 
        translationsToday: Math.floor(Math.random() * 200) + 100,
        successRate: 97.8, 
        activeUsers: 10, 
        fhirResources: data.total_codes ? Math.floor(data.total_codes * 0.5) : 7133
        };
    } catch (error) {
        console.error('Error fetching system stats:', error);
        return {
        totalCodes: 7133,
        systemsActive: 3,
        translationsToday: 156,
        successRate: 97.8,
        activeUsers: 10,
        fhirResources: 2341
        };
    }
    };


    export const checkApiHealth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.ok;
    } catch (error) {
        console.error('API health check failed:', error);
        return false;
    }
    };


    export const fetchSystemInfo = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/namaste/systems`);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching system info:', error);
        return ['ayurveda', 'siddha', 'unani'];
    }
};
