export interface Profile {
  id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  aadhaarNumber?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: 'M' | 'F' | 'T';
  category?: 'SC' | 'ST' | 'OBC' | 'General';
  address: Address;
  education: Education[];
  skills: string[];
  languages: string[];
  sectorInterests: string[];
  locationPreferences: string[];
  isProfileComplete: boolean;
}

export interface Address {
  line1: string;
  line2?: string;
  state: string;
  district: string;
  pincode: string;
  village?: string;
  block?: string;
}

export interface Education {
  id: string;
  level: '10th' | '12th' | 'Diploma' | 'Graduation' | 'PostGraduation' | 'ITI';
  boardOrUniversity: string;
  institute: string;
  course?: string;
  specialization?: string;
  yearOfPassing: number;
  marksPercent?: number;
}

export interface ProfileFormData {
  name: string;
  email: string;
  dateOfBirth: string;
  gender: 'M' | 'F' | 'T';
  category: 'SC' | 'ST' | 'OBC' | 'General';
  address: Address;
  education: Education[];
  skills: string[];
  languages: string[];
  sectorInterests: string[];
  locationPreferences: string[];
}
