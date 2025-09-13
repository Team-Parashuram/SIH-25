import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
  children: React.ReactNode;
  activeView?: string;
  onNavigate?: (view: string) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, activeView, onNavigate }) => {
    const navigationItems = [
        { id: 'home', label: 'System Overview', key: 'home' },
        { id: 'fhir-tools', label: 'FHIR Tools', key: 'fhir-tools' },
        { id: 'dashboard', label: 'Analytics Dashboard', key: 'dashboard' },
        { id: 'documentation', label: 'Documentation', key: 'documentation' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Government Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                {/* Top government bar */}
                <div className="bg-blue-900 text-white ">
                    <div className="max-w-7xl mx-auto px-4 py-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border border-white rounded flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded"></div>
                                    </div>
                                    भारत सरकार | Government of India
                                </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                                <span className="hidden md:inline">डिजिटल इंडिया | Digital India</span>
                                <span className="hidden lg:inline">आयुष मंत्रालय | Ministry of AYUSH</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Main header */}
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                                        <span className="text-orange-600 font-bold text-xl">🏥</span>
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">NAMASTE</h1>
                                        <p className="text-gray-600 text-sm">National Ayurveda Medical Standards & Terminology Exchange</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right hidden lg:block">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-green-600 text-sm">Live System</span>
                                    </div>
                                    <p className="text-gray-500 text-xs">FHIR R4 Compliant • Healthcare Bridge</p>
                                </div>
                                
                                {/* Authentication Buttons */}
                                <div className="flex items-center space-x-3">
                                    <Link to="/sign-in">
                                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 text-sm">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link to="/sign-up">
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm border-0">
                                            Register
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-red-600 text-white py-2 overflow-hidden relative">
                <div className="animate-marquee whitespace-nowrap flex items-center">
                    <span className="mx-4 flex items-center gap-2">
                        <span className="text-yellow-300">🚨</span>
                        <strong>महत्वपूर्ण सूचना | IMPORTANT NOTICE:</strong>
                        <span className="mx-2">•</span>
                        This system is compliant with National Digital Health Mission (NDHM) standards and integrates with ABDM (Ayushman Bharat Digital Mission) ecosystem
                        <span className="mx-4">•</span>
                        सभी उपयोगकर्ताओं से अनुरोध है कि वे केवल प्रमाणित चिकित्सा कोड का ही उपयोग करें
                        <span className="mx-4">•</span>
                        For technical support, contact: ayush-webmaster@gov.in | Toll-Free: 1075
                        <span className="mx-4">•</span>
                        System Maintenance: Every Sunday 2:00 AM - 4:00 AM IST
                    </span>
                </div>
            </div>
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-0">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate && onNavigate(item.key)}
                                className={`px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                                    activeView === item.key
                                        ? 'text-blue-700 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-300 hover:bg-gray-50'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Top section with government branding */}
                    <div className="border-b border-gray-700 pb-8 mb-8">
                        <div className="flex flex-col md:flex-row items-start justify-between">
                            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                <div className="w-16 h-16 bg-white rounded flex items-center justify-center">
                                    <span className="text-gray-800 font-bold text-2xl">🇮🇳</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Government of India</h3>
                                    <p className="text-gray-300 text-sm">Ministry of AYUSH | Digital India Initiative</p>
                                </div>
                            </div>
                            <div className="text-left md:text-right">
                                <p className="text-gray-300 text-sm">National Digital Health Mission</p>
                                <p className="text-gray-400 text-xs">Serving 1.4+ Billion Citizens</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-orange-400">NAMASTE System</h4>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                Bridging 5,000 years of traditional Indian medicine with modern global healthcare standards 
                                through FHIR R4 compliance and WHO ICD-11 integration.
                            </p>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-300 text-xs">System Operational 24/7</span>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="text-md font-semibold mb-4 text-orange-400">Quick Access</h4>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                <li><a href="https://www.fhir.org/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors flex items-center gap-2">📋 FHIR R4 Standards</a></li>
                                <li><a href="https://icd.who.int/en" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors flex items-center gap-2">🌐 WHO ICD-11</a></li>
                                <li><a href="https://ayush.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors flex items-center gap-2">💊 AYUSH Ministry</a></li>
                                <li><a href="https://namaste.ayush.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors flex items-center gap-2">🏥 NAMASTE Portal</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-md font-semibold mb-4 text-orange-400">Government Links</h4>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                <li><a href="https://ayush.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors">Ministry of AYUSH</a></li>
                                <li><a href="https://digitalindia.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors">Digital India Portal</a></li>
                                <li><a href="https://nhm.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors">National Health Mission</a></li>
                                <li><a href="https://india.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors">India.gov.in</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-md font-semibold mb-4 text-orange-400">Contact & Support</h4>
                            <div className="text-gray-300 text-sm space-y-3">
                                <p className="flex items-center gap-2">
                                    📧 <span>ayush-webmaster@gov.in</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    📞 <span>1075 (Toll Free)</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    🕒 <span>24x7 Support Available</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    🏢 <span>Shastri Bhawan, New Delhi</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-700 mt-10 pt-8">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="text-gray-400 text-sm mb-4 md:mb-0">
                                <p>© 2025 Government of India. All rights reserved.</p>
                                <p className="text-xs mt-1">Last updated: September 2025 | Website secured with SSL</p>
                            </div>
                            <div className="flex items-center space-x-6 text-gray-400 text-sm">
                                <a href="#" className="hover:text-orange-300 transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-orange-300 transition-colors">Terms of Use</a>
                                <a href="#" className="hover:text-orange-300 transition-colors">Accessibility</a>
                                <a href="#" className="hover:text-orange-300 transition-colors">Site Map</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;
