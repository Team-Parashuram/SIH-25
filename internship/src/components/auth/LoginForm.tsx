'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LoginFormData } from '../../types/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Shield, Loader2, Info, CheckCircle } from 'lucide-react';

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
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ phoneNumber });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white backdrop-blur-sm">
            <CardHeader className="text-center space-y-6 pb-8 pt-8">
              <Image 
                src="/Intern.png" 
                alt="PM Internship Portal" 
                width={36}
                height={36}
className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg"
              />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                  PM Internship Portal
                </CardTitle>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Secure login with OTP verification
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-5 h-5 bg-orange-100 rounded-md flex items-center justify-center">
                      <Smartphone className="w-3 h-3 text-orange-600" />
                    </div>
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm font-medium bg-gray-50 px-3 py-1 rounded-l-lg border-r border-gray-200">
                      +91
                    </span>
                    <Input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={`h-12 pl-20 text-base border-2 rounded-lg transition-all duration-200 ${
                        errors.phoneNumber 
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50' 
                          : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 hover:border-gray-400'
                      }`}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      disabled={loading}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        {errors.phoneNumber}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 transform hover:scale-[1.01]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending OTP...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="w-5 h-5" />
                      Send OTP
                    </div>
                  )}
                </Button>
              </form>

              <div className="pt-4 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500 leading-relaxed">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-orange-600 hover:underline font-medium">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-orange-600 hover:underline font-medium">Privacy Policy</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Common Background (60% Opacity) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-100 via-gray-100 to-orange-50">
        <div className="absolute inset-0">
          <Image
            src="/side.png"
            alt="Government Internship Portal"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-orange-50/10"></div>
        
        <div className="relative z-10 flex items-center justify-center p-12 w-full">
          <div className="w-full max-w-lg space-y-10 text-gray-800">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gray-100 border-2 border-orange-200 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Shield className="w-10 h-10 text-orange-600" />
              </div>
              <div>
                <h2 className="text-4xl font-bold leading-tight mb-4 text-gray-900">
                  Government Internship Portal
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Connect with meaningful internship opportunities across government departments and public sector organizations.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-center text-gray-900">
                Why Choose Our Platform
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-5 bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 hover:bg-white/90 transition-all duration-200 shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">Secure Authentication</p>
                    <p className="text-gray-600 leading-relaxed">
                      Advanced OTP-based verification system
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 hover:bg-white/90 transition-all duration-200 shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">Mobile-First Design</p>
                    <p className="text-gray-600 leading-relaxed">
                      Optimized experience across all devices
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 hover:bg-white/90 transition-all duration-200 shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">Real-time Updates</p>
                    <p className="text-gray-600 leading-relaxed">
                      Track your application status instantly
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Info className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-2">Need Help</p>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    For technical support or queries about internship programs, contact our support team.
                  </p>
                  <div className="text-orange-600 font-medium">
                    Email: support@pminternship.gov.in
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
