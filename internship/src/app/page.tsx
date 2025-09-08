'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import OTPVerification from '../components/auth/OTPVerification';
import AadhaarAuth from '../components/auth/AadhaarAuth';
import ProfileForm from '../components/profile/ProfileForm';
import RecommendationList from '../components/recommendations/RecommendationList';
import { ProfileFormData } from '../types/profile';
import { InternshipRecommendation } from '../types/internship';
import { RecommendationService } from '../services/recommendations';

type AppStep = 'login' | 'otp' | 'aadhaar' | 'profile' | 'recommendations';

export default function Home() {
  const { isAuthenticated, user, loading, login, verifyOTP, verifyAadhaar, skipAadhaar, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState<AppStep>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<InternshipRecommendation[]>([]);
  const [recLoading, setRecLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileFormData | null>(null);
  const [pendingPhoneNumber, setPendingPhoneNumber] = useState<string>('');

  const recommendationService = RecommendationService.getInstance();

  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, user, loading, currentStep });
    if (loading) return;

    if (!isAuthenticated) {
      setCurrentStep('login');
    } else if (user && !user.aadhaarNumber) {
      // Check if we have a saved profile
      const savedProfile = localStorage.getItem('pm_internship_profile');
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
          setCurrentStep('recommendations');
          loadRecommendations(parsedProfile);
        } catch (error) {
          setCurrentStep('aadhaar');
        }
      } else {
        setCurrentStep('aadhaar');
      }
    } else {
      // User is authenticated with Aadhaar
      const savedProfile = localStorage.getItem('pm_internship_profile');
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
          setCurrentStep('recommendations');
          loadRecommendations(parsedProfile);
        } catch (error) {
          setCurrentStep('profile');
        }
      } else {
        setCurrentStep('profile');
      }
    }
  }, [isAuthenticated, user, loading]);

  const handleLogin = async (data: any) => {
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

  const handleOTPVerification = async (data: any) => {
    try {
      setAuthLoading(true);
      const otpData = {
        ...data,
        phoneNumber: pendingPhoneNumber || data.phoneNumber
      };
      await verifyOTP(otpData);
      setCurrentStep('aadhaar');
    } catch (error) {
      console.error('OTP verification failed:', error);
      alert('Invalid OTP. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAadhaarVerification = async (data: any) => {
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
      
      setCurrentStep('recommendations');
      await loadRecommendations(data);
    } catch (error) {
      console.error('Profile save failed:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  };

  const loadRecommendations = async (profileData: ProfileFormData) => {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-900">PM Internship Portal</h1>
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
          <ProfileForm onSubmit={handleProfileSubmit} loading={profileLoading} />
        </div>
      );
    
    case 'recommendations':
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">PM Internship Portal</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name || 'User'}</p>
            </div>
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 py-8">
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
