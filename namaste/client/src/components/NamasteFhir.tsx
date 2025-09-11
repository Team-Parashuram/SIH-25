import React, { useState } from 'react';
import Navbar from './Navbar';
import ApiStatusSection from './ApiStatusSection';
import CodeSearchSection from './CodeSearchSection';
import TranslationSection from './TranslationSection';
import CodeSystemSection from './CodeSystemSection';
import ConditionSection from './ConditionSection';
import EndpointsSection from './EndpointsSection';
import Footer from './Footer';

const NamasteFhir: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [translateCode, setTranslateCode] = useState('');
    const [conditionCode, setConditionCode] = useState('');
    const [conditionPatient, setConditionPatient] = useState('');

    const populateSampleData = () => {
        setSearchQuery('fever');
        setTranslateCode('A001');
        setConditionCode('A001');
        setConditionPatient('patient-123');
    };

    return (
        <>
            <Navbar onLoadSampleData={populateSampleData} />
            <div className="min-h-screen bg-gray-50 py-6">
            <div className="w-full px-4">
                
                <div className="space-y-6">
                <ApiStatusSection />
                
                <CodeSearchSection 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                
                <TranslationSection 
                    translateCode={translateCode}
                    setTranslateCode={setTranslateCode}
                />
                
                <CodeSystemSection />
                
                <ConditionSection 
                    conditionCode={conditionCode}
                    setConditionCode={setConditionCode}
                    conditionPatient={conditionPatient}
                    setConditionPatient={setConditionPatient}
                />
                
                <EndpointsSection />
                </div>
            </div>
            </div>
            <Footer />
        </>
    );
};

export default NamasteFhir;
