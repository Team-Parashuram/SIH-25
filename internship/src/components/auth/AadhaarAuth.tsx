'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AadhaarAuthData } from '../../types/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, CreditCard, Loader2, Info, CheckCircle, Smartphone } from 'lucide-react';

interface AadhaarAuthProps {
  onSubmit: (data: AadhaarAuthData) => Promise<void>;
  onSkip: () => void;
  loading?: boolean;
}

export default function AadhaarAuth({ onSubmit, onSkip, loading = false }: AadhaarAuthProps) {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'aadhaar' | 'otp'>('aadhaar');
  const [errors, setErrors] = useState<{ aadhaar?: string; otp?: string }>({});

  const validateAadhaar = (aadhaar: string) => {
    return aadhaar.length === 12 && /^\d+$/.test(aadhaar);
  };

  const handleAadhaarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { aadhaar?: string } = {};
    
    if (!aadhaarNumber) {
      newErrors.aadhaar = 'Aadhaar number is required';
    } else if (!validateAadhaar(aadhaarNumber)) {
      newErrors.aadhaar = 'Please enter a valid 12-digit Aadhaar number';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setStep('otp');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`aadhaar-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    const newErrors: { otp?: string } = {};
    
    if (otpString.length !== 6) {
      newErrors.otp = 'Please enter the complete 6-digit OTP';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ aadhaarNumber, otp: otpString });
    }
  };

  // Common Right Side Component
  const RightSide = () => (
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
  );

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex overflow-hidden">
        {/* Left Side - OTP Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
          <div className="w-full max-w-md">
            <Card className="shadow-2xl border-0 bg-white backdrop-blur-sm">
              <CardHeader className="text-center space-y-6 pb-8 pt-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                    Aadhaar OTP Verification
                  </CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Enter the 6-digit OTP sent to your Aadhaar-linked mobile number
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-8">
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-800 text-center">
                      One-Time Password (OTP)
                    </label>
                    <div className="flex justify-center gap-2">
                      {otp.map((digit, index) => (
                        <Input
                          key={index}
                          id={`aadhaar-otp-${index}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          className={`w-12 h-12 text-center text-lg font-bold border-2 rounded-lg transition-colors ${
                            errors.otp 
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                              : 'border-gray-300 focus:border-orange-500 focus:ring-orange-100 hover:border-gray-400'
                          }`}
                          maxLength={1}
                          disabled={loading}
                        />
                      ))}
                    </div>
                    {errors.otp && (
                      <p className="text-sm text-red-600 text-center font-medium bg-red-50 p-2 rounded-md border border-red-200">
                        {errors.otp}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.01]"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Verifying OTP...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Shield className="w-5 h-5" />
                          Verify Aadhaar
                        </div>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep('aadhaar')}
                      disabled={loading}
                      className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold rounded-lg transition-all duration-200"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Aadhaar Entry
                    </Button>
                  </div>
                </form>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>Your data is protected with 256-bit encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <RightSide />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex overflow-hidden">
      {/* Left Side - Aadhaar Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white backdrop-blur-sm">
            <CardHeader className="text-center space-y-6 pb-8 pt-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                  Aadhaar Verification
                </CardTitle>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Link your Aadhaar for secure authentication
                  <span className="block text-green-600 font-medium mt-1">(Optional)</span>
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-8 pb-8">
              <form onSubmit={handleAadhaarSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="aadhaarNumber" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <div className="w-5 h-5 bg-orange-100 rounded-md flex items-center justify-center">
                      <CreditCard className="w-3 h-3 text-orange-600" />
                    </div>
                    Aadhaar Number
                  </label>
                  <Input
                    type="text"
                    id="aadhaarNumber"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    className={`h-12 text-base font-medium border-2 rounded-lg transition-all duration-200 ${
                      errors.aadhaar 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50' 
                        : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 hover:border-gray-400'
                    }`}
                    placeholder="Enter your 12-digit Aadhaar number"
                    maxLength={12}
                    disabled={loading}
                  />
                  {errors.aadhaar && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        {errors.aadhaar}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 transform hover:scale-[1.01]"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending OTP...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Shield className="w-5 h-5" />
                        Send Aadhaar OTP
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={onSkip}
                    disabled={loading}
                    className="w-full h-12 border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 font-semibold rounded-lg transition-all duration-200"
                  >
                    <span>Skip for Now</span>
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </form>

              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Your Aadhaar details are secure and encrypted</span>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    This service is provided in accordance with the Aadhaar Act, 2016. 
                    Your data privacy is protected under Government of India guidelines.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <RightSide />
    </div>
  );
}
