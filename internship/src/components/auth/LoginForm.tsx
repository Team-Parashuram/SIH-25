'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LoginFormData } from '../../types/auth';

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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image 
              src="/Intern.png" 
              alt="PM Internship Portal" 
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">PM Internship Portal</h1>
          <p className="text-black text-base">Find your perfect internship opportunity</p>
          <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800 font-medium">
              💡 Demo: Enter any 10-digit number starting with 6-9
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-black mb-3">
              📱 Mobile Number
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-black font-medium">+91</span>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className={`w-full pl-16 pr-4 py-4 border-2 rounded-lg text-black font-medium bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300 hover:border-orange-300'
                }`}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
                disabled={loading}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.phoneNumber}</p>
            )}
          </div>

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
              'Send OTP'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-black">
            By continuing, you agree to the{' '}
            <span className="text-orange-600 font-medium">Terms of Service</span>
            {' '}and{' '}
            <span className="text-orange-600 font-medium">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
