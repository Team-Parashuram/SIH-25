'use client';

import { useState, useEffect } from 'react';
import { OTPVerificationData } from '../../types/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smartphone, ArrowLeft, Shield, RefreshCw, Loader2, Info } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Verify OTP
            </CardTitle>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
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

        <CardContent className="space-y-6">
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
                    Verify OTP
                  </div>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={loading}
                className="w-full h-12 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 font-semibold rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Change Phone Number
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Secure OTP verification via SMS</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
