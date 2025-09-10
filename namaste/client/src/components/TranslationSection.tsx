import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useCodeTranslation } from '../hooks/hooks';
import ResultDisplay from './ResultDisplay';
import type { MedicineSystem } from '../types/types';

interface TranslationSectionProps {
    translateCode: string;
    setTranslateCode: (code: string) => void;
    }

    const TranslationSection: React.FC<TranslationSectionProps> = ({ 
    translateCode, 
    setTranslateCode 
    }) => {
    const [translateSystem, setTranslateSystem] = useState<MedicineSystem>('ayurveda');
    const { data, loading, error, translateCode: translateCodeToIcd } = useCodeTranslation();

    const handleTranslate = () => {
        translateCodeToIcd(translateCode, translateSystem);
    };

    return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Dual Coding Translation
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="translate-code">NAMASTE Code</Label>
                <Input
                id="translate-code"
                value={translateCode}
                onChange={(e) => setTranslateCode(e.target.value)}
                placeholder="Enter NAMASTE code (e.g., A001)"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="translate-system">System</Label>
                <Select value={translateSystem} onValueChange={(value: MedicineSystem) => setTranslateSystem(value)}>
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
            </div>
            <Button onClick={handleTranslate} disabled={loading}>
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Translate to ICD-11
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

export default TranslationSection;
