'use client';

import { useState } from 'react';
import { AadhaarAuthData } from '../../types/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, CreditCard, Loader2 } from 'lucide-react';

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

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Aadhaar OTP Verification
              </CardTitle>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enter the 6-digit OTP sent to your Aadhaar-linked mobile number
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
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
                          : 'border-blue-200 focus:border-orange-500 focus:ring-orange-100 hover:border-blue-300'
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
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
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
                  className="w-full h-12 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 font-semibold rounded-lg transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Aadhaar Entry
                </Button>
              </div>
            </form>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>Your data is protected with 256-bit encryption</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Aadhaar Verification
            </CardTitle>
            <p className="text-gray-600 text-sm leading-relaxed">
              Link your Aadhaar for secure authentication
              <span className="block text-green-600 font-medium mt-1">(Optional)</span>
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleAadhaarSubmit} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="aadhaarNumber" className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <CreditCard className="w-4 h-4 text-blue-600" />
                Aadhaar Number
              </label>
              <Input
                type="text"
                id="aadhaarNumber"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                className={`h-12 text-base font-medium border-2 transition-colors ${
                  errors.aadhaar 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-blue-200 focus:border-orange-500 focus:ring-orange-100 hover:border-blue-300'
                }`}
                placeholder="Enter your 12-digit Aadhaar number"
                maxLength={12}
                disabled={loading}
              />
              {errors.aadhaar && (
                <p className="text-sm text-red-600 font-medium bg-red-50 p-2 rounded-md border border-red-200">
                  {errors.aadhaar}
                </p>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
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
                className="w-full h-12 border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 font-semibold rounded-lg transition-all duration-200"
              >
                <span>Skip for Now</span>
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-gray-100 space-y-3">
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
  );
}
