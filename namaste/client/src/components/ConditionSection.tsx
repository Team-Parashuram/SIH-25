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
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Hospital className="h-5 w-5" />
            Create Dual-Coded FHIR Condition
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label htmlFor="condition-code">NAMASTE Code</Label>
                <Input
                id="condition-code"
                value={conditionCode}
                onChange={(e) => setConditionCode(e.target.value)}
                placeholder="A001"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="condition-system">System</Label>
                <Select value={conditionSystem} onValueChange={(value: MedicineSystem) => setConditionSystem(value)}>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ayurveda">Ayurveda</SelectItem>
                    <SelectItem value="siddha">Siddha</SelectItem>
                    <SelectItem value="unani">Unani</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="condition-patient">Patient ID</Label>
                <Input
                id="condition-patient"
                value={conditionPatient}
                onChange={(e) => setConditionPatient(e.target.value)}
                placeholder="patient-123"
                />
            </div>
            </div>
            <Button onClick={handleCreate} disabled={loading}>
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
                <Hospital className="h-4 w-4 mr-2" />
            )}
            Create FHIR Condition
            </Button>
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
