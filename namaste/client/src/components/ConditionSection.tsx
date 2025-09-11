import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Hospital, Loader2 } from 'lucide-react';
import { useConditionCreation } from '../hooks/hooks';
import ResultDisplay from './ResultDisplay';
import type { MedicineSystem } from '../types/types';

interface ConditionSectionProps {
    conditionCode: string;
    setConditionCode: (code: string) => void;
    conditionPatient: string;
    setConditionPatient: (patient: string) => void;
    }

    const ConditionSection: React.FC<ConditionSectionProps> = ({ 
    conditionCode, 
    setConditionCode,
    conditionPatient,
    setConditionPatient
    }) => {
    const [conditionSystem, setConditionSystem] = useState<MedicineSystem>('ayurveda');
    const { data, loading, error, createCondition } = useConditionCreation();

    const handleCreate = () => {
        createCondition(conditionCode, conditionSystem, conditionPatient);
    };

    return (
        <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-orange-100 rounded-lg">
                    <Hospital className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Create Dual-Coded FHIR Condition</h3>
                    <p className="text-sm text-gray-600 font-normal">Generate patient condition records with dual coding</p>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-900 mb-2">FHIR Condition Resource</h4>
                <p className="text-sm text-orange-700">
                    Create FHIR Condition resources that include both traditional medicine codes (NAMASTE) and international standards (ICD-11) for comprehensive patient records.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                    <Label htmlFor="condition-code" className="text-sm font-semibold text-gray-700">
                        NAMASTE Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="condition-code"
                        value={conditionCode}
                        onChange={(e) => setConditionCode(e.target.value)}
                        placeholder="AAE-4"
                        className="w-full border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-md px-4 py-3"
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="condition-system" className="text-sm font-semibold text-gray-700">
                        Medical System <span className="text-red-500">*</span>
                    </Label>
                    <Select value={conditionSystem} onValueChange={(value: MedicineSystem) => setConditionSystem(value)}>
                        <SelectTrigger className="w-full border-2 border-gray-300 focus:border-orange-500 rounded-md px-4 py-3">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ayurveda">Ayurveda</SelectItem>
                            <SelectItem value="siddha">Siddha</SelectItem>
                            <SelectItem value="unani">Unani</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-3">
                    <Label htmlFor="condition-patient" className="text-sm font-semibold text-gray-700">
                        Patient ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="condition-patient"
                        value={conditionPatient}
                        onChange={(e) => setConditionPatient(e.target.value)}
                        placeholder="patient-123"
                        className="w-full border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-md px-4 py-3"
                    />
                </div>
            </div>
            
            <div className="flex justify-center pt-4">
                <Button 
                    onClick={handleCreate} 
                    disabled={loading || !conditionCode.trim() || !conditionPatient.trim()}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-base font-medium rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin mr-3" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <Hospital className="h-5 w-5 mr-3" />
                            Create FHIR Condition
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

export default ConditionSection;
