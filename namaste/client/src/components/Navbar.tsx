import React from 'react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
    onLoadSampleData: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoadSampleData }) => {
    return (
        <div className="w-full">
            {/* Government Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                {/* Top Government Bar */}
                <div className="bg-blue-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 py-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                                    <span className="text-blue-900 font-bold text-sm">�🇳</span>
                                </div>
                                <div>
                                    <h1 className="text-sm font-medium">Government of India</h1>
                                    <p className="text-blue-200 text-xs">Ministry of AYUSH</p>
                                </div>
                            </div>
                            <div className="text-right hidden md:block">
                                <p className="text-blue-200 text-xs">भारत सरकार | Digital India Initiative</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Main Header */}
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                                        <span className="text-orange-600 font-bold text-xl">🏥</span>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">NAMASTE</h2>
                                        <p className="text-gray-600 text-sm">National Ayurveda Medical Standards & Terminology Exchange</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right hidden lg:block">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-green-600 text-sm font-medium">System Online</span>
                                    </div>
                                    <p className="text-gray-500 text-xs">FHIR R4 Compliant • WHO ICD-11 Integrated</p>
                                </div>
                                <Button 
                                    onClick={onLoadSampleData} 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm font-medium border-0"
                                >
                                    Try Sample Data
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
