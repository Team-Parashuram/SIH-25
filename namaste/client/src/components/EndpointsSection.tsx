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
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Available API Endpoints
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {endpointGroups.map((group, index) => (
                <div key={index} className="space-y-4">
                <h3 className="font-semibold text-blue-600">{group.title}</h3>
                <div className="space-y-2">
                    {group.endpoints.map((endpoint, endpointIndex) => (
                    <div 
                        key={endpointIndex} 
                        className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                        <span className="text-sm">{endpoint.name}</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getMethodBadgeClass(endpoint.method)}`}>
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
