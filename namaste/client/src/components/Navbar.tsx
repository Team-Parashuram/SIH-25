import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NavbarProps {
    onLoadSampleData: () => void;
    }

    const Navbar: React.FC<NavbarProps> = ({ onLoadSampleData }) => {
    return (
        <div className="mb-8">
        {/* Government Header */}
        <div className="bg-white border-b-4 border-blue-700 shadow-sm mb-6">
            <div className="bg-blue-900 text-white px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-900 font-bold text-lg">🏥</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">Government of India</h1>
                            <p className="text-blue-200 text-sm">Ministry of Health and Family Welfare</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-blue-200 text-sm">Digital India Initiative</p>
                    </div>
                </div>
            </div>
        </div>
        
        <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader className="text-center bg-white border-b border-gray-100 rounded-t-lg py-8">
            <CardTitle className="text-4xl mb-4 text-gray-800 font-bold">
                NAMASTE FHIR System
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                National Ayurveda Medical Standards and Terminology Exchange<br/>
                <span className="text-base text-gray-500">
                    Dual Coding System for Traditional Medicine & ICD-11 Integration
                </span>
            </CardDescription>
            <Button 
                onClick={onLoadSampleData} 
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-md transition-colors duration-200"
            >
                Load Sample Data
            </Button>
        </CardHeader>
        </Card>
        </div>
    );
};

export default Navbar;
