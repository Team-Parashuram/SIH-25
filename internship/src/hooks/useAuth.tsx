'use client';

import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { AuthState, User, LoginFormData, OTPVerificationData, AadhaarAuthData } from '../types/auth';

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
        } catch {
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
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store pending phone number for OTP verification
      setPendingPhoneNumber(data.phoneNumber);
      
      // In a real app, this would trigger OTP sending
      console.log('OTP sent to:', data.phoneNumber);
      
    } catch {
      throw new Error('Failed to send OTP');
    }
  };

  const verifyOTP = async (data: OTPVerificationData): Promise<void> => {
    try {
      console.log('Starting OTP verification with data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock OTP verification (in real app, verify with backend)
      console.log('Received OTP:', data.otp, 'Length:', data.otp.length);
      
      if (data.otp === '123456' || data.otp.length === 6) {
        console.log('OTP validation passed');
        
        const user: User = {
          id: Date.now().toString(),
          phoneNumber: data.phoneNumber,
          name: undefined,
          isVerified: true
        };
        
        console.log('Created user:', user);
        
        // Save to localStorage
        localStorage.setItem('pm_internship_user', JSON.stringify(user));
        
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false
        });
        
        setPendingPhoneNumber('');
        console.log('OTP verification completed successfully');
      } else {
        console.log('OTP validation failed');
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      throw error;
    }
  };

  const verifyAadhaar = async (data: AadhaarAuthData): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Verifying Aadhaar with OTP:', data.otp);
      
      // Mock Aadhaar verification - accept ANY OTP (for development/demo purposes)
      if (data.otp && data.otp.length > 0) {
        console.log('OTP validation passed - accepting any OTP');
        // Try to get name from saved profile first
        let userName = 'User';
        try {
          const savedProfile = localStorage.getItem('pm_internship_profile');
          if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            if (profile.name) {
              userName = profile.name;
            }
          }
        } catch (error) {
          console.error('Error getting profile name:', error);
        }

        const updatedUser: User = {
          ...authState.user!,
          aadhaarNumber: data.aadhaarNumber,
          name: userName // Use profile name if available, otherwise default
        };
        
        // Update localStorage
        localStorage.setItem('pm_internship_user', JSON.stringify(updatedUser));
        
        setAuthState({
          isAuthenticated: true,
          user: updatedUser,
          loading: false
        });
        console.log('Aadhaar verification successful, user updated');
      } else {
        console.log('OTP validation failed - no OTP provided');
        throw new Error('Please enter an OTP to continue.');
      }
    } catch (error) {
      console.error('verifyAadhaar error:', error);
      // If it's our custom error, throw it. Otherwise, assume success for demo purposes.
      if (error instanceof Error && error.message.includes('Please enter an OTP')) {
        throw error;
      }
      // For any other error in demo mode, just succeed
      console.log('Demo mode: accepting verification despite error');
      const updatedUser: User = {
        ...authState.user!,
        aadhaarNumber: data.aadhaarNumber,
        name: 'User'
      };
      
      localStorage.setItem('pm_internship_user', JSON.stringify(updatedUser));
      
      setAuthState({
        isAuthenticated: true,
        user: updatedUser,
        loading: false
      });
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
