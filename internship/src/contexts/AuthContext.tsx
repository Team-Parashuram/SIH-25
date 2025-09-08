'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthStep, Profile, Demographics } from '@/types/auth';

type AuthAction = 
  | { type: 'SET_STEP'; payload: AuthStep }
  | { type: 'SET_MOBILE'; payload: string }
  | { type: 'VERIFY_MOBILE'; payload: boolean }
  | { type: 'SET_AADHAAR_CONSENT'; payload: boolean }
  | { type: 'SET_DEMOGRAPHICS'; payload: Demographics }
  | { type: 'VERIFY_EMAIL'; payload: boolean }
  | { type: 'UPDATE_PROFILE'; payload: Partial<Profile> }
  | { type: 'SET_SESSION'; payload: string }
  | { type: 'RESET_AUTH' };

const initialState: AuthState = {
  step: 'mobile_input',
  mobileVerified: false,
  aadhaarConsent: false,
  emailVerified: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_MOBILE':
      return { ...state, mobile: action.payload };
    case 'VERIFY_MOBILE':
      return { ...state, mobileVerified: action.payload };
    case 'SET_AADHAAR_CONSENT':
      return { ...state, aadhaarConsent: action.payload };
    case 'SET_DEMOGRAPHICS':
      return { ...state, demographics: action.payload };
    case 'VERIFY_EMAIL':
      return { ...state, emailVerified: action.payload };
    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.payload } };
    case 'SET_SESSION':
      return { ...state, sessionId: action.payload };
    case 'RESET_AUTH':
      return initialState;
    default:
      return state;
  }
}

type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  sendMobileOTP: (mobile: string) => Promise<boolean>;
  verifyMobileOTP: (mobile: string, otp: string) => Promise<boolean>;
  startDigiLockerFlow: () => Promise<string>;
  handleDigiLockerCallback: () => Promise<boolean>;
  sendEmailOTP: () => Promise<boolean>;
  verifyEmailOTP: (email: string, otp: string) => Promise<boolean>;
  updateProfile: (profileData: Partial<Profile>) => Promise<boolean>;
  checkEligibility: () => Promise<boolean>;
  completeProfile: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load auth state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('pmis_auth_state');
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState);
          Object.keys(parsedState).forEach(key => {
            if (key === 'step') dispatch({ type: 'SET_STEP', payload: parsedState[key] });
            if (key === 'mobile') dispatch({ type: 'SET_MOBILE', payload: parsedState[key] });
            if (key === 'mobileVerified') dispatch({ type: 'VERIFY_MOBILE', payload: parsedState[key] });
            if (key === 'aadhaarConsent') dispatch({ type: 'SET_AADHAAR_CONSENT', payload: parsedState[key] });
            if (key === 'demographics') dispatch({ type: 'SET_DEMOGRAPHICS', payload: parsedState[key] });
            if (key === 'emailVerified') dispatch({ type: 'VERIFY_EMAIL', payload: parsedState[key] });
            if (key === 'profile') dispatch({ type: 'UPDATE_PROFILE', payload: parsedState[key] });
            if (key === 'sessionId') dispatch({ type: 'SET_SESSION', payload: parsedState[key] });
          });
        } catch (error) {
          console.error('Failed to load auth state:', error);
        }
      }
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pmis_auth_state', JSON.stringify(state));
    }
  }, [state]);

  // HARDCODED for UI demo - no real backend
  const sendMobileOTP = async (mobile: string): Promise<boolean> => {
    // Just simulate loading for UI
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Accept any 10-digit mobile for demo
    if (mobile.length === 10) {
      dispatch({ type: 'SET_MOBILE', payload: mobile });
      dispatch({ type: 'SET_STEP', payload: 'mobile_otp' });
      return true;
    }
    
    throw new Error('Please enter a valid 10-digit mobile number');
  };

  const verifyMobileOTP = async (mobile: string, otp: string): Promise<boolean> => {
    // Just simulate loading for UI
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Accept ANY OTP for demo - no real verification
    if (otp.length >= 4) {
      dispatch({ type: 'VERIFY_MOBILE', payload: true });
      dispatch({ type: 'SET_STEP', payload: 'aadhaar_consent' });
      return true;
    }
    
    throw new Error('Please enter the OTP');
  };

  const startDigiLockerFlow = async (): Promise<string> => {
    // Just simulate for UI demo
    await new Promise(resolve => setTimeout(resolve, 300));
    
    dispatch({ type: 'SET_AADHAAR_CONSENT', payload: true });
    dispatch({ type: 'SET_STEP', payload: 'digilocker_redirect' });
    
    // Return fake URL for demo
    return 'https://demo-digilocker.gov.in/auth';
  };

  const handleDigiLockerCallback = async (): Promise<boolean> => {
    // Just simulate eKYC processing for UI
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // HARDCODED demographics for demo
    const demoNames = ['Rahul Kumar', 'Priya Sharma', 'Arjun Singh', 'Sneha Patel'];
    const randomName = demoNames[Math.floor(Math.random() * demoNames.length)];
    
    const demographics: Demographics = {
      name: randomName,
      gender: Math.random() > 0.5 ? 'M' : 'F',
      dob: '2000-05-15', // Always eligible age for demo
      source: 'digilocker',
      consent: {
        id: 'demo_consent_123',
        purpose: 'onboarding',
        at: new Date().toISOString(),
      },
    };
    
    dispatch({ type: 'SET_DEMOGRAPHICS', payload: demographics });
    dispatch({ type: 'SET_STEP', payload: 'email_verification' });
    return true;
  };

  const sendEmailOTP = async (): Promise<boolean> => {
    // Just simulate for UI demo
    await new Promise(resolve => setTimeout(resolve, 600));
    // Accept any email format for demo
    return true;
  };

  const verifyEmailOTP = async (email: string, otp: string): Promise<boolean> => {
    // Just simulate for UI demo
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Accept ANY OTP for demo
    if (otp.length >= 4) {
      dispatch({ type: 'VERIFY_EMAIL', payload: true });
      dispatch({ type: 'SET_STEP', payload: 'profile_creation' });
      return true;
    }
    
    throw new Error('Please enter the OTP');
  };

  const updateProfile = async (profileData: Partial<Profile>): Promise<boolean> => {
    // Just simulate for UI demo
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
    return true;
  };

  const checkEligibility = async (): Promise<boolean> => {
    // Always return true for demo
    return true;
  };

  const completeProfile = async (): Promise<boolean> => {
    // Just simulate for UI demo
    await new Promise(resolve => setTimeout(resolve, 800));
    dispatch({ type: 'SET_STEP', payload: 'complete' });
    dispatch({ type: 'UPDATE_PROFILE', payload: { status: 'complete' } });
    return true;
  };

  const value: AuthContextType = {
    state,
    dispatch,
    sendMobileOTP,
    verifyMobileOTP,
    startDigiLockerFlow,
    handleDigiLockerCallback,
    sendEmailOTP,
    verifyEmailOTP,
    updateProfile,
    checkEligibility,
    completeProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
