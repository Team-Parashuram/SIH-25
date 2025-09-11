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
        <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <RefreshCw className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Dual Coding Translation</h3>
                    <p className="text-sm text-gray-600 font-normal">Convert NAMASTE codes to ICD-11 standards</p>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">Translation Service</h4>
                <p className="text-sm text-purple-700">
                    Enter a NAMASTE code from traditional medicine systems to get the corresponding ICD-11 classification code for international compatibility.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Label htmlFor="translate-code" className="text-sm font-semibold text-gray-700">
                        NAMASTE Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="translate-code"
                        value={translateCode}
                        onChange={(e) => setTranslateCode(e.target.value)}
                        placeholder="Enter NAMASTE code (e.g., AAE-4)"
                        className="w-full border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-md px-4 py-3"
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="translate-system" className="text-sm font-semibold text-gray-700">
                        Source System <span className="text-red-500">*</span>
                    </Label>
                    <Select value={translateSystem} onValueChange={(value: MedicineSystem) => setTranslateSystem(value)}>
                        <SelectTrigger className="w-full border-2 border-gray-300 focus:border-purple-500 rounded-md px-4 py-3">
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
                    onClick={handleTranslate} 
                    disabled={loading || !translateCode.trim()}
                    className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 text-base font-medium rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin mr-3" />
                            Translating...
                        </>
                    ) : (
                        <>
                            <RefreshCw className="h-5 w-5 mr-3" />
                            Translate to ICD-11
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

export default TranslationSection;
