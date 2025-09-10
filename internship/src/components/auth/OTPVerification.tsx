'use client';

import { useState, useEffect } from 'react';
import { OTPVerificationData } from '../../types/auth';

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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📱</span>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Verify OTP</h1>
          <p className="text-black text-base">
            Enter the 6-digit OTP sent to<br />
            <span className="font-semibold text-orange-600">+91 {phoneNumber}</span>
          </p>
          <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800 font-medium">
              💡 For demo: Use <span className="font-bold">123456</span> or any 6-digit number
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-4 text-center">
              Enter OTP
            </label>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-14 h-14 text-center text-xl font-bold border-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                    errors.otp ? 'border-red-500' : 'border-gray-300 hover:border-orange-300'
                  }`}
                  maxLength={1}
                  disabled={loading}
                />
              ))}
            </div>
            {errors.otp && (
              <p className="mt-3 text-sm text-red-600 text-center font-medium">{errors.otp}</p>
            )}
          </div>

          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-orange-600 hover:text-orange-700 font-semibold text-sm border border-orange-200 px-4 py-2 rounded-lg hover:border-orange-500 transition-colors"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-black text-sm">
                Resend OTP in <span className="font-semibold text-orange-600">{timer}s</span>
              </p>
            )}
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Verifying...
                </div>
              ) : (
                'Verify OTP'
              )}
            </button>

            <button
              type="button"
              onClick={onBack}
              disabled={loading}
              className="w-full bg-white text-black py-4 px-6 rounded-lg font-semibold border-2 border-gray-300 hover:border-orange-500 hover:text-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              ← Change Phone Number
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
