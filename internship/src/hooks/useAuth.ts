'use client';

import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { AuthState, User, LoginFormData, OTPVerificationData, AadhaarAuthData } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  verifyOTP: (data: OTPVerificationData) => Promise<void>;
  verifyAadhaar: (data: AadhaarAuthData) => Promise<void>;
  logout: () => void;
  resendOTP: () => Promise<void>;
  skipAadhaar: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  const [pendingPhoneNumber, setPendingPhoneNumber] = useState<string>('');

  useEffect(() => {
    // Check for existing auth on mount
    const checkAuth = () => {
      const savedUser = localStorage.getItem('pm_internship_user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false
          });
        } catch (error) {
          localStorage.removeItem('pm_internship_user');
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (data: LoginFormData): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store pending phone number for OTP verification
      setPendingPhoneNumber(data.phoneNumber);
      
      // In a real app, this would trigger OTP sending
      console.log('OTP sent to:', data.phoneNumber);
      
      setAuthState(prev => ({ ...prev, loading: false }));
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw new Error('Failed to send OTP');
    }
  };

  const verifyOTP = async (data: OTPVerificationData): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock OTP verification (in real app, verify with backend)
      if (data.otp === '123456' || data.otp.length === 6) {
        const user: User = {
          id: Date.now().toString(),
          phoneNumber: data.phoneNumber,
          name: undefined,
          isVerified: true
        };
        
        // Save to localStorage
        localStorage.setItem('pm_internship_user', JSON.stringify(user));
        
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false
        });
        
        setPendingPhoneNumber('');
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const verifyAadhaar = async (data: AadhaarAuthData): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock Aadhaar verification
      if (data.otp === '123456' || data.otp.length === 6) {
        const updatedUser: User = {
          ...authState.user!,
          aadhaarNumber: data.aadhaarNumber,
          name: 'John Doe' // In real app, this would come from Aadhaar
        };
        
        // Update localStorage
        localStorage.setItem('pm_internship_user', JSON.stringify(updatedUser));
        
        setAuthState({
          isAuthenticated: true,
          user: updatedUser,
          loading: false
        });
      } else {
        throw new Error('Invalid Aadhaar OTP');
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('pm_internship_user');
    localStorage.removeItem('pm_internship_profile');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
    setPendingPhoneNumber('');
  };

  const resendOTP = async (): Promise<void> => {
    if (pendingPhoneNumber) {
      await login({ phoneNumber: pendingPhoneNumber });
    }
  };

  const skipAadhaar = (): void => {
    // User can skip Aadhaar verification and continue with phone verification only
    console.log('User skipped Aadhaar verification');
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    verifyOTP,
    verifyAadhaar,
    logout,
    resendOTP,
    skipAadhaar
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
