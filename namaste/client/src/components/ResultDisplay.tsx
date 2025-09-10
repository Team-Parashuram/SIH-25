import React from 'react';
import { Loader2, XCircle } from 'lucide-react';
import type { ApiResponse } from '../types/types';

interface ResultDisplayProps {
    data: ApiResponse | null;
    error: string | null;
    loading: boolean;
    }

    const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, error, loading }) => {
    if (loading) {
        return (
        <div className="flex items-center justify-center p-4 text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Loading...
        </div>
        );
    }

    if (error) {
        return (
        <div className="flex items-center p-4 text-red-600 bg-red-50 border border-red-200 rounded-md">
            <XCircle className="h-4 w-4 mr-2" />
            Error: {error}
        </div>
        );
    }

    if (data) {
        return (
        <div className="bg-gray-50 border rounded-md p-4">
            <pre className="text-sm whitespace-pre-wrap overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
            </pre>
        </div>
        );
    }

    return (
        <div className="p-4 text-gray-500 text-center">
        Results will appear here...
        </div>
    );
};

export default ResultDisplay;
