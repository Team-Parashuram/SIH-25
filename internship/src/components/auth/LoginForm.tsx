'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LoginFormData } from '../../types/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smartphone, Shield, Loader2, Info } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg p-2">
            <Image 
              src="/Intern.png" 
              alt="PM Internship Portal" 
              width={32}
              height={32}
              className="object-contain filter brightness-0 invert"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              PM Internship Portal
            </CardTitle>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Find your perfect internship opportunity with the Government of India
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800 font-medium">
                  Demo Mode: Enter any 10-digit number starting with 6-9
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="phoneNumber" className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Smartphone className="w-4 h-4 text-blue-600" />
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 font-medium bg-gray-50 px-2 py-1 rounded text-sm border-r border-gray-200">
                  +91
                </span>
                <Input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={`h-12 pl-20 text-base font-medium border-2 transition-colors ${
                    errors.phoneNumber 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-blue-200 focus:border-orange-500 focus:ring-orange-100 hover:border-blue-300'
                  }`}
                  placeholder="Enter your 10-digit mobile number"
                  maxLength={10}
                  disabled={loading}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-red-600 font-medium bg-red-50 p-2 rounded-md border border-red-200">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
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

          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Secure authentication via OTP verification</span>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                By continuing, you agree to the{' '}
                <span className="text-orange-600 font-medium hover:underline cursor-pointer">Terms of Service</span>
                {' '}and{' '}
                <span className="text-green-600 font-medium hover:underline cursor-pointer">Privacy Policy</span>
                {' '}of Government of India
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
