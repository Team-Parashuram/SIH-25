'use client';

import { useState } from 'react';
import ProfileForm from '../../components/profile/ProfileForm';
import { ProfileFormData, Education } from '../../types/profile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowLeft, Download, User, Home, Target } from 'lucide-react';

export default function ProfileDemo() {
  const [currentView, setCurrentView] = useState<'form' | 'success'>('form');
  const [submittedData, setSubmittedData] = useState<ProfileFormData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmittedData(data);
    setCurrentView('success');
    setLoading(false);
  };

  const handleReset = () => {
    setCurrentView('form');
    setSubmittedData(null);
  };

  if (currentView === 'success' && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-6 animate-bounce-in">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              प्रोफ़ाइल सफलतापूर्वक पूर्ण! / Profile Successfully Completed!
            </h1>
            <p className="text-lg text-slate-600">
              आपकी जानकारी सुरक्षित रूप से सहेजी गई है / Your information has been securely saved
            </p>
          </div>

          {/* Profile Summary */}
          <Card className="mb-8 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <User className="w-6 h-6 text-green-600" />
                प्रोफ़ाइल सारांश / Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-slate-800">व्यक्तिगत जानकारी / Personal Information</h3>
                  </div>
                  <div className="space-y-2">
                    <p><span className="font-medium text-slate-700">नाम / Name:</span> {submittedData.name}</p>
                    <p><span className="font-medium text-slate-700">ईमेल / Email:</span> {submittedData.email}</p>
                    <p><span className="font-medium text-slate-700">जन्म तिथि / Date of Birth:</span> {submittedData.dateOfBirth}</p>
                    <p><span className="font-medium text-slate-700">लिंग / Gender:</span> {submittedData.gender === 'M' ? 'पुरुष / Male' : submittedData.gender === 'F' ? 'महिला / Female' : 'तृतीय लिंग / Transgender'}</p>
                    <p><span className="font-medium text-slate-700">श्रेणी / Category:</span> {submittedData.category}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-semibold text-slate-800">पता / Address</h3>
                  </div>
                  <div className="space-y-2">
                    <p><span className="font-medium text-slate-700">पता:</span> {submittedData.address.line1}</p>
                    {submittedData.address.line2 && <p>{submittedData.address.line2}</p>}
                    <p><span className="font-medium text-slate-700">राज्य / State:</span> {submittedData.address.state}</p>
                    <p><span className="font-medium text-slate-700">जिला / District:</span> {submittedData.address.district}</p>
                    <p><span className="font-medium text-slate-700">पिन कोड / PIN:</span> {submittedData.address.pincode}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-slate-800">कौशल / Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {submittedData.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1.5 text-sm font-medium border border-green-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">शिक्षा / Education</h3>
                {submittedData.education.map((edu: Education, index: number) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p><span className="font-medium text-slate-700">स्तर / Level:</span> {edu.level}</p>
                    {edu.institute && <p><span className="font-medium text-slate-700">संस्थान / Institution:</span> {edu.institute}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-12 px-8 text-base font-semibold border-2 border-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              वापस जाएं / Go Back
            </Button>
            
            <Button
              onClick={() => window.print()}
              className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Download className="w-5 h-5 mr-2" />
              प्रिंट करें / Print Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProfileForm
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
}
