
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
// import EmailVerification from '../components/auth/EmailVerification';
// import OTPVerification from '../components/auth/OTPVerification';
// import AadhaarAuth from '../components/auth/AadhaarAuth';
import ProfileForm from '../components/profile/ProfileForm';
import RecommendationList from '../components/recommendations/RecommendationList';
import { ProfileFormData } from '../types/profile';
import { InternshipRecommendation } from '../types/internship';
import { RecommendationService } from '../services/recommendations';
import { useRouter } from 'next/navigation';

type AppStep = 'login' | 'otp' | 'aadhaar' | 'profile' | 'recommendations';

export default function Home() {
  const { isAuthenticated, user, loading, login, verifyOTP, verifyAadhaar, skipAadhaar, logout } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<AppStep>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<InternshipRecommendation[]>([]);
  const [recLoading, setRecLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileFormData | null>(null);
  const [pendingPhoneNumber, setPendingPhoneNumber] = useState<string>('');
  const [userName, setUserName] = useState('User');

  const recommendationService = RecommendationService.getInstance();

  const loadRecommendations = useCallback(async (profileData: ProfileFormData) => {
    try {
      setRecLoading(true);
      
      const request = {
        userId: user?.id || 'anonymous',
        profile: {
          education: profileData.education.map(edu => ({
            level: edu.level,
            course: edu.course || '',
            specialization: edu.specialization || ''
          })),
          skills: profileData.skills,
          sectorInterests: profileData.sectorInterests,
          locationPreferences: profileData.locationPreferences
        }
      };

      const recs = await recommendationService.getRecommendations(request);
      setRecommendations(recs);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
      alert('Failed to load recommendations. Please try again.');
    } finally {
      setRecLoading(false);
    }
  }, [user?.id, recommendationService]);

  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, user, loading });
    if (loading) return;

    // Get user name from profile or auth
    const savedProfile = localStorage.getItem('pm_internship_profile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        if (parsedProfile.name) {
          setUserName(parsedProfile.name);
        }
      } catch (error) {
        console.error('Error parsing profile:', error);
      }
    } else if (user?.name) {
      setUserName(user.name);
    }

    if (!isAuthenticated) {
      setCurrentStep('login');
    } else if (user && !user.aadhaarNumber) {
      // Check if we have a saved profile
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
          setCurrentStep('recommendations');
          loadRecommendations(parsedProfile);
        } catch {
          setCurrentStep('aadhaar');
        }
      } else {
        setCurrentStep('aadhaar');
      }
    } else {
      // User is authenticated with Aadhaar
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
          setCurrentStep('recommendations');
          loadRecommendations(parsedProfile);
        } catch {
          setCurrentStep('profile');
        }
      } else {
        setCurrentStep('profile');
      }
    }
  }, [isAuthenticated, user, loading, loadRecommendations]);

  const handleLogin = async (data: { phoneNumber: string }) => {
    try {
      setAuthLoading(true);
      console.log('Starting login process...');
      setPendingPhoneNumber(data.phoneNumber);
      await login(data);
      console.log('Login successful, switching to OTP step');
      setCurrentStep('otp');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleOTPVerification = async (data: { otp: string; phoneNumber?: string }) => {
    try {
      setAuthLoading(true);
      console.log('handleOTPVerification called with:', data);
      console.log('pendingPhoneNumber:', pendingPhoneNumber);
      
      const otpData = {
        ...data,
        phoneNumber: pendingPhoneNumber || data.phoneNumber || ''
      };
      
      console.log('Final OTP data:', otpData);
      
      await verifyOTP(otpData);
      console.log('OTP verification successful, moving to aadhaar step');
      setCurrentStep('aadhaar');
    } catch (error) {
      console.error('OTP verification failed:', error);
      alert('Invalid OTP. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAadhaarVerification = async (data: { aadhaarNumber: string; otp: string }) => {
    try {
      setAuthLoading(true);
      await verifyAadhaar(data);
      setCurrentStep('profile');
    } catch (error) {
      console.error('Aadhaar verification failed:', error);
      alert('Invalid Aadhaar OTP. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSkipAadhaar = () => {
    skipAadhaar();
    setCurrentStep('profile');
  };

  const handleProfileSubmit = async (data: ProfileFormData) => {
    try {
      setProfileLoading(true);
      
      // Save profile to localStorage (in a real app, this would be sent to backend)
      localStorage.setItem('pm_internship_profile', JSON.stringify(data));
      setProfile(data);
      
      // Update user name
      if (data.name) {
        setUserName(data.name);
      }
      
      setCurrentStep('recommendations');
      await loadRecommendations(data);
    } catch (error) {
      console.error('Profile save failed:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleApply = (internshipId: string) => {
    alert(`Application submitted for internship ${internshipId}! You will be redirected to the PM Internship Portal.`);
  };

  const handleViewDetails = (internshipId: string) => {
    const internship = recommendations.find(r => r.internship.id === internshipId)?.internship;
    if (internship) {
      alert(`Viewing details for: ${internship['area/field']} at ${internship.sector}`);
    }
  };

  const handleRefreshRecommendations = () => {
    if (profile) {
      loadRecommendations(profile);
    }
  };

  if (loading && currentStep === 'login') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-black font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Render current step
  console.log('Rendering step:', currentStep, 'authLoading:', authLoading, 'globalLoading:', loading);
  switch (currentStep) {
    case 'login':
      return <LoginForm onSubmit={handleLogin} loading={authLoading} />;
    
    case 'otp':
      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6">OTP Verification</h1>
            <p className="text-center mb-6 text-gray-600">
              Enter the 6-digit OTP sent to +91 {pendingPhoneNumber || user?.phoneNumber || ''}
            </p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleOTPVerification({ phoneNumber: pendingPhoneNumber || '', otp: '123456' });
            }} className="space-y-6">
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-12 h-12 text-center text-xl font-bold border-2 rounded-lg"
                    maxLength={1}
                    disabled={authLoading}
                  />
                ))}
              </div>
              
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                  {authLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
                
                <button
                  type="button"
                  onClick={() => handleLogin({ phoneNumber: pendingPhoneNumber })}
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Resend OTP
                </button>
                
                <button
                  type="button"
                  onClick={() => setCurrentStep('login')}
                  className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
                >
                  Change Number
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    
    case 'aadhaar':
      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Aadhaar Verification</h1>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAadhaarVerification({ aadhaarNumber: '123456789012', otp: '123456' });
            }} className="space-y-6">
              <div>
                <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  id="aadhaar"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter 12-digit Aadhaar number"
                  maxLength={12}
                />
              </div>
              
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  {authLoading ? 'Verifying...' : 'Verify Aadhaar'}
                </button>
                
                <button
                  type="button"
                  onClick={handleSkipAadhaar}
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Skip (Do Later)
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    
    case 'profile':
      return (
        <div className="min-h-screen bg-white">
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
            <div>
              <h1 className="text-xl font-bold text-black">PM Internship Portal</h1>
              <p className="text-sm text-black mt-1">Welcome, {userName}</p>
            </div>
            <button
              onClick={logout}
              className="text-sm text-black hover:text-orange-600 font-medium border border-gray-300 px-4 py-2 rounded-lg hover:border-orange-500 transition-colors"
            >
              Logout
            </button>
          </div>
          <ProfileForm onSubmit={handleProfileSubmit} loading={profileLoading} />
        </div>
      );
    
    case 'recommendations':
      return (
        <div className="min-h-screen bg-white">
          <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-black">PM Internship Portal</h1>
                <p className="text-sm text-black mt-1">Welcome, {userName}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/internships')}
                  className="text-sm text-orange-600 hover:text-orange-700 font-semibold border border-orange-200 px-4 py-2 rounded-lg hover:border-orange-500 transition-colors"
                >
                  View All Internships →
                </button>
                <button
                  onClick={logout}
                  className="text-sm text-black hover:text-orange-600 font-medium border border-gray-300 px-4 py-2 rounded-lg hover:border-orange-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 py-8">
            <RecommendationList
              recommendations={recommendations}
              loading={recLoading}
              onApply={handleApply}
              onViewDetails={handleViewDetails}
              onRefresh={handleRefreshRecommendations}
            />
          </div>
        </div>
      );
    
    default:
      return <LoginForm onSubmit={handleLogin} loading={authLoading} />;
  }
}
