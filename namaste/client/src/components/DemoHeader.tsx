import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HeaderProps {
    onLoadSampleData: () => void;
    }

    const Header: React.FC<HeaderProps> = ({ onLoadSampleData }) => {
    return (
        <Card className="mb-8">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-t-lg">
            <CardTitle className="text-3xl mb-2">🏥 NAMASTE FHIR Demo</CardTitle>
            <CardDescription className="text-blue-100">
            Dual Coding System for Traditional Medicine & ICD-11 Integration
            </CardDescription>
            <Button 
            onClick={onLoadSampleData} 
            variant="secondary" 
            className="mt-4 self-center w-fit"
            >
            Load Sample Data
            </Button>
        </CardHeader>
        </Card>
    );
};

export default Header;
