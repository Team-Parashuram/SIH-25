'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { OTPVerificationData } from '../../types/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smartphone, ArrowLeft, Shield, RefreshCw, Loader2, Info, CheckCircle } from 'lucide-react';

interface OTPVerificationProps {
  phoneNumber: string;
  onSubmit: (data: OTPVerificationData) => void;
  onResend: () => void;
  onBack: () => void;
  loading?: boolean;
}

export default function OTPVerification({ 
  phoneNumber, 
  onSubmit, 
  onResend, 
  onBack, 
  loading = false 
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState<{ otp?: string }>({});

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digits
    if (value.length > 1) {
      // Handle paste operation
      if (value.length === 6) {
        const digits = value.split('').slice(0, 6);
        setOtp(digits);
        // Focus the last input
        const lastInput = document.getElementById(`otp-5`);
        lastInput?.focus();
        return;
      }
      return;
    }
    
    // Only allow numbers
    if (value !== '' && !/^\d$/.test(value)) {
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    console.log('OTP changed:', newOtp.join(''));
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
    
    // Auto-submit when all 6 digits are filled
    if (index === 5 && value) {
      const fullOtp = newOtp.join('');
      if (fullOtp.length === 6) {
        setTimeout(() => {
          console.log('Auto-submitting OTP:', fullOtp);
          onSubmit({ phoneNumber, otp: fullOtp });
        }, 300);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current field is empty, move to previous field
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
      } else {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    console.log('Submitting OTP:', otpString, 'Phone:', phoneNumber);
    
    const newErrors: { otp?: string } = {};
    
    if (otpString.length !== 6) {
      newErrors.otp = 'Please enter the complete 6-digit OTP';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('OTP validation passed, calling onSubmit');
      onSubmit({ phoneNumber, otp: otpString });
    } else {
      console.log('OTP validation failed:', newErrors);
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setErrors({});
    onResend();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex overflow-hidden">
      {/* Left Side - OTP Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white backdrop-blur-sm">
            <CardHeader className="text-center space-y-6 pb-8 pt-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                  Verify OTP
                </CardTitle>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Enter the 6-digit OTP sent to
                  <br />
                  <span className="font-semibold text-orange-600">+91 {phoneNumber}</span>
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800 font-medium">
                      Demo Mode: Use <span className="font-bold">123456</span> or any 6-digit number
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-800 text-center">
                    Enter 6-Digit OTP
                  </label>
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
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

                <div className="text-center">
                  {canResend ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResend}
                      className="border-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 font-semibold rounded-lg transition-all duration-200"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend OTP
                    </Button>
                  ) : (
                    <p className="text-gray-600 text-sm bg-gray-50 p-2 rounded-md">
                      Resend OTP in <span className="font-semibold text-orange-600">{timer}s</span>
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
                        Verify OTP
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    disabled={loading}
                    className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold rounded-lg transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Change Phone Number
                  </Button>
                </div>
              </form>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Secure OTP verification via SMS</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Common Background (Same as Login) */}
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
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-gray-50/70 to-orange-50/60"></div>
        
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
