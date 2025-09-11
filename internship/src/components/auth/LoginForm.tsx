'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LoginFormData } from '../../types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Shield, CheckCircle2, AlertCircle, Loader2, Phone, Globe } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
}

export default function LoginForm({ onSubmit, loading = false }: LoginFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{ phoneNumber?: string }>({});

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { phoneNumber?: string } = {};
    
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required / फ़ोन नंबर आवश्यक है';
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number / कृपया वैध 10-अंकीय फ़ोन नंबर दर्ज करें';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ phoneNumber });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Image 
              src="/Intern.png" 
              alt="PM Internship Portal" 
              width={40}
              height={40}
              className="object-contain brightness-0 invert"
            />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            पीएम इंटर्नशिप पोर्टल
          </h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            PM Internship Portal
          </h2>
          <p className="text-lg text-slate-600 mb-4">
            सही इंटर्नशिप अवसर खोजें / Find your perfect internship opportunity
          </p>
          <div className="flex justify-center gap-2 mb-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1.5">
              <Globe className="w-4 h-4 mr-1" />
              भारत सरकार / Government of India
            </Badge>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <Smartphone className="w-6 h-6 text-blue-600" />
              मोबाइल से लॉगिन / Mobile Login
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Demo Notice */}
            <Alert className="mb-6 border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <span className="font-semibold">डेमो / Demo:</span> 6-9 से शुरू होने वाला कोई भी 10-अंकीय नंबर दर्ज करें / 
                Enter any 10-digit number starting with 6-9
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  मोबाइल नंबर / Mobile Number *
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <span className="text-slate-700 font-medium">🇮🇳</span>
                    <span className="text-slate-700 font-medium">+91</span>
                  </div>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={`h-12 pl-20 pr-4 text-base font-medium ${
                      errors.phoneNumber 
                        ? 'border-red-500 ring-red-200 focus:border-red-500 focus:ring-red-200' 
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                    } transition-all duration-200`}
                    placeholder="10-अंकीय मोबाइल नंबर / 10-digit mobile number"
                    maxLength={10}
                    disabled={loading}
                    aria-describedby={errors.phoneNumber ? "phone-error" : undefined}
                  />
                </div>
                {errors.phoneNumber && (
                  <Alert variant="destructive" className="p-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription id="phone-error" className="text-sm">{errors.phoneNumber}</AlertDescription>
                  </Alert>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ओटीपी भेजा जा रहा है / Sending OTP...
                  </div>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    ओटीपी भेजें / Send OTP
                  </>
                )}
              </Button>
            </form>

            {/* Security Features */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>सुरक्षित / Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>तेज़ / Fast</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>विश्वसनीय / Reliable</span>
                </div>
              </div>
              
              <div className="text-center text-sm text-slate-600 leading-relaxed">
                आगे बढ़कर, आप{' '}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">सेवा की शर्तों</span>
                {' '}और{' '}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">गोपनीयता नीति</span>
                {' '}से सहमत हैं
                <br />
                By continuing, you agree to the{' '}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">Terms of Service</span>
                {' '}and{' '}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6 border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-blue-900 mb-1">
                  सहायता चाहिए? / Need Help?
                </p>
                <p className="text-blue-800">
                  हेल्पलाइन: 1800-XXX-XXXX | Helpline: 1800-XXX-XXXX
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
