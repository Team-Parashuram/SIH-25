import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowRight, 
    Globe, 
    Database, 
    Stethoscope, 
    Users,
    FileText,
    BarChart3,
    Shield,
    Heart
} from 'lucide-react';

interface HomePageProps {
    onLoadSampleData: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLoadSampleData }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const systemFeatures = [
        {
            icon: <Globe className="h-6 w-6 text-blue-600" />,
            title: "Global Integration",
            description: "WHO ICD-11 compliant translation system",
            stats: "7,331 codes uploaded"
        },
        {
            icon: <Database className="h-6 w-6 text-green-600" />,
            title: "FHIR R4 Standard",
            description: "Universal healthcare data format",
            stats: "100% compliant"
        },
        {
            icon: <Stethoscope className="h-6 w-6 text-purple-600" />,
            title: "Traditional Medicine",
            description: "Ayurveda, Siddha, Unani systems",
            stats: "3 systems"
        },
        {
            icon: <Shield className="h-6 w-6 text-orange-600" />,
            title: "Dual Coding",
            description: "Traditional + International codes",
            stats: "98.5% accuracy"
        }
    ];

    const useCases = [
        {
            title: "Healthcare Providers",
            description: "Seamlessly integrate traditional medicine diagnoses with modern EMR systems",
            icon: <Heart className="h-5 w-5 text-red-500" />
        },
        {
            title: "Insurance Companies", 
            description: "Process claims with internationally recognized ICD-11 codes",
            icon: <Shield className="h-5 w-5 text-blue-500" />
        },
        {
            title: "Government Analytics",
            description: "Generate comprehensive traditional medicine morbidity reports",
            icon: <BarChart3 className="h-5 w-5 text-green-500" />
        },
        {
            title: "Research Institutions",
            description: "Access standardized traditional medicine data for global research",
            icon: <FileText className="h-5 w-5 text-purple-500" />
        }
    ];

    const systemMetrics = [
        { 
            label: "Medical Systems Active", 
            value: "3", 
            trend: "stable" 
        },
        { 
            label: "Total Codes Uploaded", 
            value: "7,331", 
            trend: "up" 
        },
        { 
            label: "Translation Success Rate", 
            value: "98.5%", 
            trend: "up" 
        },
        { 
            label: "Active Daily Users", 
            value: "156", 
            trend: "up" 
        }
    ];

    return (
        <div className="space-y-8 ">
            {/* Scrolling Important Notice */}

            {/* Secondary Notice Bar */}
            {/* <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-sm">ℹ️</span>
                        </div>
                        <div className="text-sm text-blue-800">
                            <strong>Latest Update:</strong> NAMASTE system now supports real-time WHO ICD-11 API integration. 
                            <span className="ml-2 text-blue-600 font-medium">Updated: September 12, 2025</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-700 font-medium">System Online</span>
                    </div>
                </div>
            </div> */}

            {/* Hero Section */}
            <div className="bg-white  rounded-lg p-8">
                <div className="text-left">
                    <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-orange-100 rounded flex items-center justify-center mr-4">
                            <div className="text-3xl">🇮🇳</div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                NAMASTE
                            </h1>
                            <div className="text-lg text-orange-700 font-semibold">
                                नमस्ते - राष्ट्रीय आयुर्वेद मानक और शब्दावली विनिमय
                            </div>
                            <div className="text-xl text-blue-800 font-medium">
                                National Ayurveda Medical Standards and Terminology Exchange
                            </div>
                        </div>
                    </div>

                    <div className="text-lg text-gray-700 mb-6 leading-relaxed">
                        <span className="font-semibold text-orange-600">5,000 साल की पारंपरिक चिकित्सा</span> को 
                        <span className="font-semibold text-blue-600"> आधुनिक वैश्विक मानकों</span> से जोड़ने वाला 
                        <span className="font-semibold text-green-600"> FHIR R4 अनुपालित</span> डिजिटल पुल
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <Button 
                            onClick={onLoadSampleData} 
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-base font-medium border-0"
                        >
                            नमूना डेटा देखें | Try Sample Data
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                        <Button 
                            variant="outline" 
                            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-base font-medium"
                        >
                            प्रलेखन | Documentation
                        </Button>
                    </div>

                    {/* Government Certification Bar */}
                    <div className="bg-gray-50 rounded-lg p-4 ">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-gray-700 font-medium">✓ NIC Approved</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-700 font-medium">✓ WHO API Connected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span className="text-gray-700 font-medium">✓ FHIR R4 Compliant</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span className="text-gray-700 font-medium">✓ ABDM Integrated</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* System Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systemFeatures.map((feature, index) => (
                    <Card key={index} className="border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-3 bg-orange-50 rounded">
                                    {feature.icon}
                                </div>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-800 font-medium">
                                    {feature.stats}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Digital India Initiative Banner */}
            <Card className="border border-orange-200 bg-orange-50">
                <CardContent className="py-6">
                    <div className="flex items-center justify-center space-x-6">
                        <div className="text-4xl">🇮🇳</div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">डिजिटल इंडिया पहल | Digital India Initiative</h3>
                            <p className="text-gray-700 text-sm">
                                सशक्त भारत - डिजिटल भारत | Empowering India through Digital Healthcare
                            </p>
                        </div>
                        <div className="text-4xl">💻</div>
                    </div>
                </CardContent>
            </Card>

            {/* System Overview Tabs */}
            <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <div className="flex flex-wrap gap-2">
                        {['overview', 'metrics', 'use-cases'].map((tab) => (
                            <Button
                                key={tab}
                                variant={activeTab === tab ? "default" : "outline"}
                                onClick={() => setActiveTab(tab)}
                                className={`capitalize font-medium px-6 py-3 ${
                                    activeTab === tab 
                                        ? 'bg-blue-600 text-white shadow-sm border-0' 
                                        : 'border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                                }`}
                            >
                                {tab === 'overview' && '📋 सिस्टम अवलोकन | Overview'}
                                {tab === 'metrics' && '📊 मेट्रिक्स | Metrics'}
                                {tab === 'use-cases' && '🎯 उपयोग के मामले | Use Cases'}
                            </Button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Mission Statement */}
                            <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    🎯 राष्ट्रीय मिशन | National Mission
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    <strong>पारंपरिक भारतीय चिकित्सा प्रणालियों</strong> को <strong>आधुनिक डिजिटल स्वास्थ्य पारिस्थितिकी तंत्र</strong> के साथ 
                                    एकीकृत करना, जिससे <strong>1.4 अरब भारतीयों</strong> को बेहतर स्वास्थ्य सेवा मिल सके।
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Database className="h-6 w-6 text-blue-600" />
                                        तकनीकी संरचना | System Architecture
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <Database className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">NAMASTE Code Repository</h4>
                                                <p className="text-sm text-gray-700">आयुर्वेद, सिद्ध, यूनानी की 7,331 पारंपरिक चिकित्सा शब्दावली</p>
                                                <div className="mt-2 text-xs text-blue-600 font-medium">📊 Excel-based Terminology Database</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                            <Globe className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">WHO ICD-11 Integration</h4>
                                                <p className="text-sm text-gray-700">विश्व स्वास्थ्य संगठन के अंतर्राष्ट्रीय मानकों के साथ एकीकरण</p>
                                                <div className="mt-2 text-xs text-green-600 font-medium">🌐 Global Healthcare Standards</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                                            <FileText className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">FHIR R4 Bridge</h4>
                                                <p className="text-sm text-gray-700">सार्वभौमिक स्वास्थ्य डेटा प्रारूप के लिए अनुवादक</p>
                                                <div className="mt-2 text-xs text-purple-600 font-medium">🔗 Universal Healthcare Language</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Heart className="h-6 w-6 text-red-500" />
                                        राष्ट्रीय लाभ | National Benefits
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-orange-600 font-bold text-sm">5K</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-900 font-semibold">5,000+ वर्षों की पारंपरिक चिकित्सा का संरक्षण</span>
                                                <p className="text-xs text-gray-600 mt-1">Preserving ancient medical wisdom</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-blue-600 font-bold text-sm">₹</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-900 font-semibold">आयुष उपचार के लिए बीमा दावे सक्षम</span>
                                                <p className="text-xs text-gray-600 mt-1">Insurance claims for AYUSH treatments</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-purple-600 font-bold text-sm">42C</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-900 font-semibold">42.5 करोड़ ABHA उपयोगकर्ताओं का समर्थन</span>
                                                <p className="text-xs text-gray-600 mt-1">Supporting nationwide digital health IDs</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-green-600 font-bold text-sm">🌍</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-900 font-semibold">वैश्विक स्वास्थ्य विश्लेषण और अनुसंधान</span>
                                                <p className="text-xs text-gray-600 mt-1">Global health analytics and research</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'metrics' && (
                        <div className="space-y-6">
                            {/* Performance Dashboard */}
                            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    📊 प्रदर्शन डैशबोर्ड | Performance Dashboard
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {systemMetrics.map((metric, index) => (
                                        <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                                            <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                                            <div className="text-sm text-gray-600 mb-3 font-medium">{metric.label}</div>
                                            <div className={`text-xs px-3 py-1 rounded-full inline-flex items-center gap-1 font-medium ${
                                                metric.trend === 'up' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {metric.trend === 'up' ? '📈' : '📊'}
                                                {metric.trend === 'up' ? 'बढ़ती प्रवृत्ति' : 'स्थिर'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Real-time Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="border border-blue-200">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-blue-900">
                                            <BarChart3 className="h-5 w-5" />
                                            सिस्टम आंकड़े | System Statistics
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-700">कुल कोड अपलोड</span>
                                            <span className="font-bold text-blue-600">7,331</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-700">सफलता दर</span>
                                            <span className="font-bold text-green-600">98.5%</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-700">दैनिक उपयोगकर्ता</span>
                                            <span className="font-bold text-orange-600">156</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-700">अपटाइम</span>
                                            <span className="font-bold text-purple-600">99.9%</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border border-orange-200">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-orange-900">
                                            <Users className="h-5 w-5" />
                                            उपयोग पैटर्न | Usage Patterns
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-700">आयुर्वेद कोड</span>
                                                    <span className="font-medium">65%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-700">सिद्ध कोड</span>
                                                    <span className="font-medium">20%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '20%'}}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-700">यूनानी कोड</span>
                                                    <span className="font-medium">15%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '15%'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === 'use-cases' && (
                        <div className="space-y-6">
                            <div className="text-left mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    🎯 उपयोग के मामले | Use Cases & Applications
                                </h3>
                                <p className="text-gray-700">
                                    NAMASTE प्रणाली विभिन्न स्वास्थ्य सेवा क्षेत्रों में व्यापक अनुप्रयोग प्रदान करती है
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {useCases.map((useCase, index) => (
                                    <Card key={index} className="border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-300">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="flex items-center gap-3 text-lg">
                                                <div className="p-2 bg-orange-50 rounded">
                                                    {useCase.icon}
                                                </div>
                                                <div>
                                                    <div className="text-gray-900 font-bold">{useCase.title}</div>
                                                    <div className="text-sm text-gray-600 font-normal mt-1">
                                                        {useCase.title === 'Healthcare Providers' && 'स्वास्थ्य सेवा प्रदाता'}
                                                        {useCase.title === 'Insurance Companies' && 'बीमा कंपनियां'}
                                                        {useCase.title === 'Government Analytics' && 'सरकारी विश्लेषण'}
                                                        {useCase.title === 'Research Institutions' && 'अनुसंधान संस्थान'}
                                                    </div>
                                                </div>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-700 leading-relaxed">{useCase.description}</p>
                                            <div className="mt-4 pt-3 border-t border-gray-100">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500 font-medium">Active Users</span>
                                                    <span className="text-sm font-bold text-blue-600">
                                                        {useCase.title === 'Healthcare Providers' && '2,500+'}
                                                        {useCase.title === 'Insurance Companies' && '150+'}
                                                        {useCase.title === 'Government Analytics' && '28 States'}
                                                        {useCase.title === 'Research Institutions' && '75+'}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            
                            {/* Additional Use Cases */}
                            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    🏛️ सरकारी विभागों के लिए विशेष उपयोग | Special Government Applications
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                        <div className="text-2xl mb-2">🏥</div>
                                        <h5 className="font-semibold text-gray-900 mb-2">AIIMS Integration</h5>
                                        <p className="text-sm text-gray-700">सभी AIIMS में पारंपरिक चिकित्सा के लिए मानकीकृत कोडिंग</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                        <div className="text-2xl mb-2">📊</div>
                                        <h5 className="font-semibold text-gray-900 mb-2">NITI Aayog Reports</h5>
                                        <p className="text-sm text-gray-700">राष्ट्रीय स्वास्थ्य नीति के लिए डेटा एकत्रीकरण</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                        <div className="text-2xl mb-2">🌍</div>
                                        <h5 className="font-semibold text-gray-900 mb-2">WHO Reporting</h5>
                                        <p className="text-sm text-gray-700">अंतर्राष्ट्रीय स्वास्थ्य संगठन को मानकीकृत रिपोर्टिंग</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Call to Action - Government Style */}
            <Card className="border border-orange-200 bg-white shadow-sm">
                <CardContent className="text-center py-12">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-orange-100 rounded flex items-center justify-center">
                            <span className="text-3xl">🚀</span>
                        </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        पारंपरिक और आधुनिक स्वास्थ्य सेवा को जोड़ने के लिए तैयार हैं?
                    </h3>
                    <div className="text-xl text-gray-800 mb-2">
                        Ready to Bridge Traditional and Modern Healthcare?
                    </div>
                    <p className="text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                        NAMASTE FHIR सिस्टम की क्षमताओं को हमारे इंटरैक्टिव टूल्स के साथ एक्सप्लोर करना शुरू करें। 
                        डुअल कोडिंग का परीक्षण करें, पारंपरिक चिकित्सा कोड खोजें, और FHIR संसाधन जेनरेट करें।
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                        <Button 
                            onClick={onLoadSampleData}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-medium border-0"
                        >
                            <Users className="h-5 w-5 mr-2" />
                            नमूना डेटा के साथ शुरुआत करें | Start with Sample Data
                        </Button>
                        <Button 
                            variant="outline"
                            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-medium"
                        >
                            <FileText className="h-5 w-5 mr-2" />
                            API प्रलेखन देखें | View API Documentation
                        </Button>
                    </div>

                    {/* Government Endorsement */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-center space-x-8 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🏛️</span>
                                <span className="text-gray-700 font-medium">सरकार द्वारा प्रमाणित</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🔒</span>
                                <span className="text-gray-700 font-medium">CERT-In Secure</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🌐</span>
                                <span className="text-gray-700 font-medium">WHO Compliant</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">⚡</span>
                                <span className="text-gray-700 font-medium">24x7 Available</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default HomePage;
