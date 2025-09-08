'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, Smartphone, Mail, User, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignInPage() {
  const { state, sendMobileOTP, verifyMobileOTP, startDigiLockerFlow, handleDigiLockerCallback, sendEmailOTP, verifyEmailOTP } = useAuth();
  
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDigiLockerFlow = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      await handleDigiLockerCallback();
      setSuccess('eKYC completed successfully! Age eligibility verified.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'DigiLocker verification failed');
    } finally {
      setLoading(false);
    }
  }, [handleDigiLockerCallback]);

  // Handle DigiLocker callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const sessionState = urlParams.get('state');
    
    if (code && sessionState && state.step === 'digilocker_redirect') {
      handleDigiLockerFlow();
    }
  }, [state.step, handleDigiLockerFlow]);

  const handleSendMobileOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await sendMobileOTP(mobile);
      setSuccess('OTP sent to your mobile number');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMobileOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await verifyMobileOTP(mobile, otp);
      setSuccess('Mobile number verified successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAadhaarConsent = async () => {
    setLoading(true);
    setError('');
    
    try {
      await startDigiLockerFlow();
      // For prototype, simulate the flow
      setTimeout(() => {
        handleDigiLockerFlow();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'DigiLocker flow failed');
      setLoading(false);
    }
  };

  const handleSendEmailOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await sendEmailOTP();
      setSuccess('OTP sent to your email address');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send email OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await verifyEmailOTP(email, emailOtp);
      setSuccess('Email verified successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Email OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Redirect to main page if authenticated
  useEffect(() => {
    if (state.step === 'complete') {
      window.location.href = '/';
    }
  }, [state.step]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-orange-500 border-b-2 border-black">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-white font-bold">PM Internship Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-gray-200 text-sm font-medium">हिंदी</button>
            <button className="text-white hover:text-gray-200 text-sm font-medium">A+</button>
            <button className="text-white hover:text-gray-200 text-sm font-medium">Skip to main content</button>
          </div>
        </div>
      </div>


      <div className="container mx-auto px-4 py-8 max-w-lg">
        {/* Mobile OTP Step */}
        {state.step === 'mobile_input' && (
          <Card className="shadow-2xl bg-white border-2 border-black">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-black">Mobile Verification</CardTitle>
              <CardDescription className="text-black">
                Enter your mobile number to receive OTP as per PMIS guidelines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSendMobileOTP} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobile(e.target.value)}
                    required
                    maxLength={10}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={loading || !mobile}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Send OTP
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* OTP Verification Step */}
        {state.step === 'mobile_otp' && (
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Verify OTP</CardTitle>
              <CardDescription>
                Enter the 6-digit OTP sent to {mobile}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleVerifyMobileOTP} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">OTP</label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                  />
                  <p className="text-xs text-gray-600">
                    Demo: Use any 6 digits to proceed
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-2 bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={loading || !otp}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Verify
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Aadhaar Consent Step */}
        {state.step === 'aadhaar_consent' && (
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>eKYC Verification</CardTitle>
              <CardDescription>
                Complete age verification using DigiLocker for PMIS eligibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-black mb-2">Required for PM Internship Scheme:</h4>
                <ul className="text-sm text-black space-y-1">
                  <li>• Age verification (18-29 years)</li>
                  <li>• Identity confirmation</li>
                  <li>• Educational eligibility check</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <Badge variant="outline" className="w-full justify-center py-2">
                  🔒 Secure DigiLocker Integration
                </Badge>
                
                <Button 
                  onClick={handleAadhaarConsent}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Connecting to DigiLocker...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Proceed with eKYC (Demo)
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-gray-600 text-center">
                  Demo: Simulated eKYC process for presentation
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* DigiLocker Redirect Step */}
        {state.step === 'digilocker_redirect' && (
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border border-white/20">
            <CardContent className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-orange-500" />
              <h3 className="text-lg font-semibold mb-2">Processing eKYC...</h3>
              <p className="text-gray-600">
                Verifying your documents securely through DigiLocker
              </p>
            </CardContent>
          </Card>
        )}

        {/* Email Verification Step */}
        {state.step === 'email_input' && (
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Email Verification</CardTitle>
              <CardDescription>
                Provide your email for important notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSendEmailOTP} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={loading || !email}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Send Email OTP
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Email OTP Verification */}
        {state.step === 'email_otp' && (
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Verify Email</CardTitle>
              <CardDescription>
                Enter the OTP sent to {email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleVerifyEmailOTP} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email OTP</label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={emailOtp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailOtp(e.target.value)}
                    required
                    maxLength={6}
                  />
                  <p className="text-xs text-gray-600">
                    Demo: Use any 6 digits to proceed
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={loading || !emailOtp}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Complete Verification
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Profile Creation Step */}
        {state.step === 'profile_creation' && (
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Verification Complete!</CardTitle>
              <CardDescription>
                Your account has been successfully verified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-black font-medium">
                  All verifications completed successfully!
                </p>
                <p className="text-black text-sm mt-1">
                  Ready to find your perfect internship matches
                </p>
              </div>
              
              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Continue to Portal
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4"
            >
              <Alert className="border-red-200 bg-red-50 text-red-800">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Alert */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4"
            >
              <Alert className="border-orange-200 bg-white text-black">
                <CheckCircle className="w-4 h-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo footer */}
        <div className="text-center mt-6 text-sm text-white/80 bg-white/10 backdrop-blur-sm rounded-2xl py-3 px-6 border border-white/20">
          <p>
            <strong>UI DEMONSTRATION</strong> • Hardcoded flows for presentation • Modern Government Portal Design
          </p>
        </div>
      </div>
    </div>
  );
}
