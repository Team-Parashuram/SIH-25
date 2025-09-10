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
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            FHIR CodeSystem Generation
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
            <Label htmlFor="codesystem-system">System</Label>
            <Select value={codeSystemSystem} onValueChange={(value: MedicineSystem) => setCodeSystemSystem(value)}>
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
            <Button onClick={handleGenerate} disabled={loading}>
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
                <FileCode className="h-4 w-4 mr-2" />
            )}
            Generate FHIR CodeSystem
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

export default CodeSystemSection;
