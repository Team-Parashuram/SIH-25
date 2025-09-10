import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'lucide-react';

const EndpointsSection: React.FC = () => {
    const endpointGroups = [
        {
        title: "NAMASTE Endpoints",
        endpoints: [
            { name: "Search codes", method: "GET" },
            { name: "Upload files", method: "POST" },
            { name: "Get statistics", method: "GET" }
        ]
        },
        {
        title: "FHIR Endpoints",
        endpoints: [
            { name: "CodeSystem", method: "GET" },
            { name: "ConceptMap", method: "GET" },
            { name: "Condition", method: "POST" },
            { name: "Bundle", method: "POST" }
        ]
        },
        {
        title: "WHO ICD-11",
        endpoints: [
            { name: "Get token", method: "POST" },
            { name: "Get entity", method: "GET" },
            { name: "Translate", method: "POST" }
        ]
        }
    ];

    const getMethodBadgeClass = (method: string) => {
        return method === "GET" 
        ? "bg-green-100 text-green-800" 
        : "bg-blue-100 text-blue-800";
    };

    return (
        <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-indigo-100 rounded-lg">
                    <Link className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Available API Endpoints</h3>
                    <p className="text-sm text-gray-600 font-normal">Complete API documentation and endpoints</p>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-indigo-900 mb-2">API Documentation</h4>
                <p className="text-sm text-indigo-700">
                    Complete list of available REST API endpoints for NAMASTE, FHIR, and WHO ICD-11 integration services.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {endpointGroups.map((group, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-base mb-4 pb-2 border-b-2 border-indigo-200">
                        {group.title}
                    </h3>
                    <div className="space-y-3">
                        {group.endpoints.map((endpoint, endpointIndex) => (
                        <div 
                            key={endpointIndex} 
                            className="flex justify-between items-center py-3 px-3 bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100 transition-colors duration-150"
                        >
                            <span className="text-sm font-medium text-gray-700">{endpoint.name}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getMethodBadgeClass(endpoint.method)}`}>
                            {endpoint.method}
                            </span>
                        </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>
        </CardContent>
        </Card>
    );
};

export default EndpointsSection;
