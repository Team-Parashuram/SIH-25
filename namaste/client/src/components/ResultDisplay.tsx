import React from 'react';
import { Loader2, XCircle, CheckCircle, FileText } from 'lucide-react';
import type { ApiResponse } from '../types/types';

interface ResultDisplayProps {
    data: ApiResponse | null;
    error: string | null;
    loading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, error, loading }) => {
    if (loading) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-center text-blue-700">
                    <Loader2 className="h-6 w-6 animate-spin mr-3" />
                    <span className="font-medium">Processing request...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <div className="flex items-start">
                    <XCircle className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-red-800 mb-2">Error Occurred</h4>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (data) {
        return (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg overflow-hidden">
                <div className="bg-green-100 px-6 py-3 border-b border-green-200">
                    <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <h4 className="font-semibold text-green-800">Response Received</h4>
                    </div>
                </div>
                <div className="p-6">
                    <div className="bg-white border border-gray-200 rounded-md">
                        <div className="flex items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
                            <FileText className="h-4 w-4 text-gray-600 mr-2" />
                            <span className="text-sm font-medium text-gray-700">JSON Response</span>
                        </div>
                        <pre className="text-xs text-gray-800 p-4 overflow-x-auto max-h-96 bg-white font-mono leading-relaxed whitespace-pre-wrap break-words">
{JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="text-center text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h4 className="font-medium text-gray-600 mb-2">Awaiting Response</h4>
                <p className="text-sm">Results will appear here once you execute an API call...</p>
            </div>
        </div>
    );
};

export default ResultDisplay;
