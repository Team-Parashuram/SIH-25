import React, { useState } from 'react';
import DemoHeader from './DemoHeader';
import ApiStatusSection from './ApiStatusSection';
import CodeSearchSection from './CodeSearchSection';
import TranslationSection from './TranslationSection';
import CodeSystemSection from './CodeSystemSection';
import ConditionSection from './ConditionSection';
import EndpointsSection from './EndpointsSection';
import DemoFooter from './Footer';

const NamasteFhirDemo: React.FC = () => {
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
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-6xl mx-auto">
            <DemoHeader onLoadSampleData={populateSampleData} />
            
            <div className="grid gap-6">
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
            
            <DemoFooter />
            </div>
        </div>
        </div>
    );
};

export default NamasteFhirDemo;
