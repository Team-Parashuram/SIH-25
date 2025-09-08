export interface Internship {
  internship_type: string;
  sector: string;
  "area/field": string;
  no_of_opportunities: number;
  description: string;
  "state/ut": string;
  district: string;
  minimum_qualification: string;
  course: string;
  specialization: string;
  preferred_skills: string[];
  certification_name: string[];
  special_requirements: string[];
}

export interface CandidateProfile {
  name: string;
  education: {
    qualification: string;
    course: string;
    specialization: string;
  };
  location: {
    state: string;
    district: string;
  };
  skills: string[];
  interests: string[];
  preferredSectors: string[];
  isRural: boolean;
  digitalLiteracy: 'low' | 'medium' | 'high';
}

export interface RecommendationResult {
  internship: Internship;
  score: number;
  matchReasons: string[];
  confidence?: number;
  mlMetrics?: {
    semanticSimilarity: number;
    skillAlignment: number;
    profileMatch: number;
    locationRelevance: number;
  };
}

export type QualificationLevel = '10th' | '12th' | 'ITI' | 'Diploma' | 'Graduation';

export const QUALIFICATION_HIERARCHY: Record<QualificationLevel, number> = {
  '10th': 1,
  '12th': 2,
  'ITI': 2,
  'Diploma': 3,
  'Graduation': 4,
};
