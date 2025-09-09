
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import OTPVerification from '../components/auth/OTPVerification';
import AadhaarAuth from '../components/auth/AadhaarAuth';
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
        <OTPVerification
          phoneNumber={pendingPhoneNumber || user?.phoneNumber || ''}
          onSubmit={handleOTPVerification}
          onResend={() => handleLogin({ phoneNumber: pendingPhoneNumber })}
          onBack={() => setCurrentStep('login')}
          loading={authLoading}
        />
      );
    
    case 'aadhaar':
      return (
        <AadhaarAuth
          onSubmit={handleAadhaarVerification}
          onSkip={handleSkipAadhaar}
          loading={authLoading}
        />
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
            <div className="max-w-6xl mx-auto flex justify-between items-center">
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
          
          <div className="max-w-6xl mx-auto px-6 py-8">
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
