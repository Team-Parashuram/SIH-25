import React from 'react';
import { Loader2, XCircle, CheckCircle, FileText, Copy, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ApiResponse } from '../types/types';

interface ResultDisplayProps {
    data: ApiResponse | null;
    error: string | null;
    loading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, error, loading }) => {
    const [showFullJson, setShowFullJson] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const copyToClipboard = () => {
        if (data) {
            navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-center text-blue-700">
                    <Loader2 className="h-6 w-6 animate-spin mr-3" />
                    <div className="text-center">
                        <span className="font-medium block">Processing request...</span>
                        <span className="text-sm text-blue-600">Connecting traditional medicine with global standards</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg overflow-hidden">
                <div className="bg-red-100 px-6 py-3 border-b border-red-200">
                    <div className="flex items-center">
                        <XCircle className="h-5 w-5 text-red-600 mr-3" />
                        <h4 className="font-semibold text-red-800">Error Occurred</h4>
                    </div>
                </div>
                <div className="p-6">
                    <p className="text-red-700 text-sm mb-4">{error}</p>
                    <div className="bg-red-100 rounded-md p-3">
                        <p className="text-xs text-red-600">
                            <strong>Troubleshooting:</strong> Check if the code exists in the system, verify the medical system selection, and ensure all required fields are filled.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (data) {
        return (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg overflow-hidden">
                <div className="bg-green-100 px-6 py-3 border-b border-green-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                            <h4 className="font-semibold text-green-800">Response Received Successfully</h4>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowFullJson(!showFullJson)}
                                className="border-green-300 text-green-700 hover:bg-green-200"
                            >
                                <Eye className="h-3 w-3 mr-1" />
                                {showFullJson ? 'Collapse' : 'Expand'}
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={copyToClipboard}
                                className="border-green-300 text-green-700 hover:bg-green-200"
                            >
                                <Copy className="h-3 w-3 mr-1" />
                                {copied ? 'Copied!' : 'Copy'}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    {/* Summary Section */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 border border-green-200">
                            <h5 className="font-medium text-green-900 mb-2">Response Type</h5>
                            <p className="text-sm text-green-700">
                                {(typeof data.resourceType === 'string' ? data.resourceType : 'FHIR Resource')}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-green-200">
                            <h5 className="font-medium text-green-900 mb-2">Status</h5>
                            <p className="text-sm text-green-700">✅ Successfully processed</p>
                        </div>
                    </div>

                    {/* JSON Response */}
                    <div className="bg-white border border-gray-200 rounded-md">
                        <div className="flex items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
                            <FileText className="h-4 w-4 text-gray-600 mr-2" />
                            <span className="text-sm font-medium text-gray-700">FHIR JSON Response</span>
                        </div>
                        <div className="p-4">
                            <pre className={`text-xs text-gray-800 whitespace-pre-wrap overflow-auto ${
                                showFullJson ? 'max-h-none' : 'max-h-60'
                            }`}>
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-4 bg-green-100 rounded-md p-3">
                        <p className="text-xs text-green-700">
                            <strong>Success!</strong> This FHIR resource can now be integrated with EMR systems, used for insurance claims, and included in global health analytics. The dual coding ensures compatibility with both traditional medicine systems and international standards.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default ResultDisplay;
