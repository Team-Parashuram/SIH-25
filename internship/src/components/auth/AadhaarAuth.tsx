'use client';

import { useState } from 'react';
import { AadhaarAuthData } from '../../types/auth';

interface AadhaarAuthProps {
  onSubmit: (data: AadhaarAuthData) => void;
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
      // Simulate sending OTP
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
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🆔</span>
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">Aadhaar OTP</h1>
            <p className="text-black text-base">
              Enter OTP sent to your Aadhaar-linked mobile number
            </p>
          </div>

          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-4 text-center">
                Enter Aadhaar OTP
              </label>
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`aadhaar-otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
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
                  'Verify Aadhaar'
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('aadhaar')}
                disabled={loading}
                className="w-full bg-white text-black py-4 px-6 rounded-lg font-semibold border-2 border-gray-300 hover:border-orange-500 hover:text-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← Back
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">🆔</span>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Aadhaar Verification</h1>
          <p className="text-black text-base">
            Link your Aadhaar for secure authentication (Optional)
          </p>
        </div>

        <form onSubmit={handleAadhaarSubmit} className="space-y-6">
          <div>
            <label htmlFor="aadhaarNumber" className="block text-sm font-semibold text-black mb-3">
              🆔 Aadhaar Number
            </label>
            <input
              type="text"
              id="aadhaarNumber"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
              className={`w-full px-4 py-4 border-2 rounded-lg bg-white text-black font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.aadhaar ? 'border-red-500' : 'border-gray-300 hover:border-orange-300'
              }`}
              placeholder="Enter 12-digit Aadhaar number"
              maxLength={12}
              disabled={loading}
            />
            {errors.aadhaar && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.aadhaar}</p>
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
                  Sending OTP...
                </div>
              ) : (
                'Send Aadhaar OTP'
              )}
            </button>

            <button
              type="button"
              onClick={onSkip}
              disabled={loading}
              className="w-full bg-white text-black py-4 px-6 rounded-lg font-semibold border-2 border-gray-300 hover:border-orange-500 hover:text-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Skip for Now →
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-black">
            🔒 Your Aadhaar details are secure and used only for verification
          </p>
        </div>
      </div>
    </div>
  );
}
