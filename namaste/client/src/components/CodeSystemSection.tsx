import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FileCode, Loader2 } from 'lucide-react';
import { useCodeSystemGeneration } from '../hooks/hooks';
import ResultDisplay from './ResultDisplay';
import type { MedicineSystem } from '../types/types';

const CodeSystemSection: React.FC = () => {
    const [codeSystemSystem, setCodeSystemSystem] = useState<MedicineSystem>('ayurveda');
    const { data, loading, error, generateCodeSystem } = useCodeSystemGeneration();

    const handleGenerate = () => {
        generateCodeSystem(codeSystemSystem);
    };

    return (
        <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-teal-100 rounded-lg">
                    <FileCode className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">FHIR CodeSystem Generation</h3>
                    <p className="text-sm text-gray-600 font-normal">Generate standardized FHIR CodeSystem resources</p>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <h4 className="font-medium text-teal-900 mb-2">FHIR CodeSystem Resource</h4>
                <p className="text-sm text-teal-700">
                    Generate FHIR-compliant CodeSystem resources for traditional medicine systems to enable interoperability with modern healthcare standards.
                </p>
            </div>
            
            <div className="max-w-sm mx-auto">
                <div className="space-y-3">
                    <Label htmlFor="codesystem-system" className="text-sm font-semibold text-gray-700">
                        Medical System <span className="text-red-500">*</span>
                    </Label>
                    <Select value={codeSystemSystem} onValueChange={(value: MedicineSystem) => setCodeSystemSystem(value)}>
                        <SelectTrigger className="w-full border-2 border-gray-300 focus:border-teal-500 rounded-md px-4 py-3">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ayurveda">Ayurveda</SelectItem>
                            <SelectItem value="siddha">Siddha</SelectItem>
                            <SelectItem value="unani">Unani</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <div className="flex justify-center pt-4">
                <Button 
                    onClick={handleGenerate} 
                    disabled={loading}
                    className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-3 text-base font-medium rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin mr-3" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <FileCode className="h-5 w-5 mr-3" />
                            Generate FHIR CodeSystem
                        </>
                    )}
                </Button>
            </div>
            
            <ResultDisplay 
                data={data} 
                error={error} 
                loading={loading} 
            />
        </CardContent>
        </Card>
    );
};

export default CodeSystemSection;
