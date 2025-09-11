import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';
import ApiStatusSection from '../components/ApiStatusSection';
import CodeSearchSection from '../components/CodeSearchSection';
import TranslationSection from '../components/TranslationSection';
import CodeSystemSection from '../components/CodeSystemSection';
import ConditionCreationSection from '../sections/ConditionCreationSection';
import EndpointsSection from '../components/EndpointsSection';

type ActiveView = 'home' | 'fhir-tools' | 'dashboard';

const MainApplication: React.FC = () => {
    const [activeView, setActiveView] = useState<ActiveView>('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [translateCode, setTranslateCode] = useState('');
    const [conditionCode, setConditionCode] = useState('');
    const [conditionPatient, setConditionPatient] = useState('');

    const handleNavigation = (view: string) => {
        if (view === 'home' || view === 'fhir-tools' || view === 'dashboard') {
            setActiveView(view as ActiveView);
        }
    };

    const populateSampleData = () => {
        setSearchQuery('fever');
        setTranslateCode('A001');
        setConditionCode('A001');
        setConditionPatient('patient-123');
        setActiveView('fhir-tools');
    };

    const renderContent = () => {
        switch (activeView) {
        case 'home':
            return <HomePage onLoadSampleData={populateSampleData} />;
        
        case 'dashboard':
            return <Dashboard />;
        
        case 'fhir-tools':
            return (
            <div className="space-y-6">
                <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">FHIR System Tools</h1>
                <p className="text-gray-600">
                    Explore dual coding capabilities and traditional medicine integration
                </p>
                </div>
                
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
                
                <ConditionCreationSection 
                conditionCode={conditionCode}
                setConditionCode={setConditionCode}
                conditionPatient={conditionPatient}
                setConditionPatient={setConditionPatient}
                />
                
                <EndpointsSection />
            </div>
            );
        
        default:
            return <HomePage onLoadSampleData={populateSampleData} />;
        }
    };

    return (
        <AppLayout activeView={activeView} onNavigate={handleNavigation}>
        {/* Secondary Navigation Tabs - Only show for FHIR Tools */}
        {activeView === 'fhir-tools' && (
            <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                onClick={() => setActiveView('home')}
                className="px-6 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:text-gray-900"
                >
                System Overview
                </button>
                <button
                className="px-6 py-2 text-sm font-medium rounded-md transition-colors bg-white text-blue-700 shadow-sm"
                >
                FHIR Tools
                </button>
                <button
                onClick={() => setActiveView('dashboard')}
                className="px-6 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:text-gray-900"
                >
                Dashboard
                </button>
            </div>
            </div>
        )}

        {renderContent()}
        </AppLayout>
    );
};

export default MainApplication;
