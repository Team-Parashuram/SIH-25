// Auth types following PM Internship Scheme specification

export type Demographics = {
  name: string;
  gender: 'M' | 'F' | 'T';
  dob: string; // ISO date
  source: 'digilocker' | 'aadhaar_xml';
  consent: {
    id: string;
    purpose: 'onboarding';
    at: string;
  };
};

export type Address = {
  line1: string;
  line2?: string;
  house?: string;
  state: string;
  district: string;
  block?: string;
  village?: string;
  pincode: string;
};

export type EducationEntry = {
  level: '10th' | '12th' | 'Diploma' | 'Graduation' | 'PostGraduation' | 'ITI';
  boardOrUniversity: string;
  institute: string;
  course?: string;
  specialization?: string;
  yearOfPassing: number;
  marksPercent?: number;
  documentUrl?: string;
};

export type Profile = {
  userId: string;
  demographics: Demographics; // read-only after eKYC
  fatherMotherGuardian: string; // manual entry
  category: 'SC' | 'ST' | 'OBC' | 'General';
  contact: {
    mobile: { number: string; verified: boolean };
    email: { id: string; verified: boolean };
    notifyPref: 'SMS' | 'WhatsApp';
  };
  address: Address;
  education: EducationEntry[];
  bank: { ifsc: string; accountLast4: string; aadhaarSeeded: boolean };
  skills: string[];
  languages: string[];
  eligibility: { ageOk: boolean; checkedAt: string };
  status: 'incomplete' | 'complete';
};

// Authentication flow types
export type AuthStep = 
  | 'mobile_input'
  | 'mobile_otp'
  | 'aadhaar_consent' 
  | 'digilocker_redirect'
  | 'email_input'
  | 'email_otp'
  | 'email_verification'
  | 'profile_creation'
  | 'complete';

export type AuthState = {
  step: AuthStep;
  mobile?: string;
  mobileVerified: boolean;
  aadhaarConsent: boolean;
  demographics?: Demographics;
  emailVerified: boolean;
  profile?: Partial<Profile>;
  sessionId?: string;
};

export type MobileOTPRequest = {
  mobile: string;
  captcha: string;
};

export type MobileOTPVerify = {
  mobile: string;
  otp: string;
};

export type DigiLockerStartResponse = {
  redirectUrl: string;
  sessionId: string;
};

export type DigiLockerCallbackData = {
  sessionId: string;
  demographics: Demographics;
  success: boolean;
};

export type EmailOTPRequest = {
  email: string;
};

export type EmailOTPVerify = {
  email: string;
  otp: string;
};

// API response types
export type AuthResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  sessionId?: string;
};

export type EligibilityCheck = {
  ageOk: boolean;
  minAge: number;
  maxAge: number;
  currentAge: number;
  checkedAt: string;
};
