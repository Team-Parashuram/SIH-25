export interface Internship {
  id: string;
  internship_type: string;
  sector: string;
  'area/field': string;
  no_of_opportunities: number;
  description: string;
  'state/ut': string;
  district: string;
  minimum_qualification: string;
  course: string;
  specialization: string;
  preferred_skills: string[];
  certification_name: string[];
  stipend?: number;
  duration?: string;
  company?: string;
  applicationDeadline?: string;
}

export interface InternshipRecommendation {
  internship: Internship;
  matchScore: number;
  matchReasons: string[];
}

export interface RecommendationFilters {
  sector?: string;
  location?: string;
  qualification?: string;
  skills?: string[];
  internshipType?: string;
}

export interface RecommendationRequest {
  userId: string;
  profile: {
    education: Array<{
      level: string;
      course: string;
      specialization: string;
    }>;
    skills: string[];
    sectorInterests: string[];
    locationPreferences: string[];
  };
  filters?: RecommendationFilters;
}
