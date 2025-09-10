export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface User {
  id: string;
  phoneNumber: string;
  aadhaarNumber?: string;
  name?: string;
  isVerified: boolean;
}

export interface LoginFormData {
  phoneNumber: string;
}

export interface OTPVerificationData {
  phoneNumber: string;
  otp: string;
}

export interface AadhaarAuthData {
  aadhaarNumber: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}
