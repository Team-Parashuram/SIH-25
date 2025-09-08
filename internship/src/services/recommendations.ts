import { Internship, InternshipRecommendation, RecommendationRequest } from '../types/internship';
import { Profile } from '../types/profile';
import internshipsData from '../data/internships.json';

// Load internship data from JSON file and add IDs
const loadInternships = (): Internship[] => {
  return internshipsData.map((internship, index) => ({
    ...internship,
    id: `internship_${index + 1}` // Add unique ID for each internship
  }));
};

const internships: Internship[] = loadInternships();

export class RecommendationService {
  private static instance: RecommendationService;

  public static getInstance(): RecommendationService {
    if (!RecommendationService.instance) {
      RecommendationService.instance = new RecommendationService();
    }
    return RecommendationService.instance;
  }

  // Calculate match score based on profile and internship
  private calculateMatchScore(profile: Profile, internship: Internship): number {
    let score = 0;
    const factors: { [key: string]: number } = {};

    // Education match (30%)
    const educationMatch = this.calculateEducationMatch(profile, internship);
    score += educationMatch * 0.3;
    factors['education'] = educationMatch;

    // Skills match (25%)
    const skillsMatch = this.calculateSkillsMatch(profile, internship);
    score += skillsMatch * 0.25;
    factors['skills'] = skillsMatch;

    // Location match (20%)
    const locationMatch = this.calculateLocationMatch(profile, internship);
    score += locationMatch * 0.2;
    factors['location'] = locationMatch;

    // Sector interest match (15%)
    const sectorMatch = this.calculateSectorMatch(profile, internship);
    score += sectorMatch * 0.15;
    factors['sector'] = sectorMatch;

    // Experience level match (10%)
    const experienceMatch = this.calculateExperienceMatch(profile, internship);
    score += experienceMatch * 0.1;
    factors['experience'] = experienceMatch;

    return Math.round(score);
  }

  private calculateEducationMatch(profile: Profile, internship: Internship): number {
    const userEducation = profile.education;
    if (!userEducation || userEducation.length === 0) return 0;

    const highestEducation = userEducation.reduce((highest, current) => {
      const levels = ['10th', '12th', 'Diploma', 'Graduation', 'PostGraduation', 'ITI'];
      const currentIndex = levels.indexOf(current.level);
      const highestIndex = levels.indexOf(highest.level);
      return currentIndex > highestIndex ? current : highest;
    });

    const requiredLevel = internship.minimum_qualification;
    const userLevel = highestEducation.level;

    // Check if user meets minimum qualification
    const levels = ['10th', '12th', 'Diploma', 'Graduation', 'PostGraduation', 'ITI'];
    const userLevelIndex = levels.indexOf(userLevel);
    const requiredLevelIndex = levels.indexOf(requiredLevel);

    if (userLevelIndex < requiredLevelIndex) return 0;

    // Bonus for course match
    let courseMatch = 50; // Base score for meeting qualification
    if (internship.course && internship.course !== 'Any') {
      const userCourses = userEducation.map(edu => edu.course?.toLowerCase() || '');
      const requiredCourse = internship.course.toLowerCase();
      if (userCourses.some(course => course.includes(requiredCourse) || requiredCourse.includes(course))) {
        courseMatch += 30;
      }
    } else {
      courseMatch += 20; // Bonus if any course is accepted
    }

    // Bonus for specialization match
    if (internship.specialization && highestEducation.specialization) {
      const userSpec = highestEducation.specialization.toLowerCase();
      const requiredSpec = internship.specialization.toLowerCase();
      if (userSpec.includes(requiredSpec) || requiredSpec.includes(userSpec)) {
        courseMatch += 20;
      }
    }

    return Math.min(courseMatch, 100);
  }

  private calculateSkillsMatch(profile: Profile, internship: Internship): number {
    if (!profile.skills || profile.skills.length === 0) return 0;
    if (!internship.preferred_skills || internship.preferred_skills.length === 0) return 50;

    const userSkills = profile.skills.map(skill => skill.toLowerCase());
    const requiredSkills = internship.preferred_skills.map(skill => skill.toLowerCase());

    const matchingSkills = userSkills.filter(userSkill =>
      requiredSkills.some(reqSkill =>
        userSkill.includes(reqSkill) || reqSkill.includes(userSkill)
      )
    );

    const matchPercentage = (matchingSkills.length / requiredSkills.length) * 100;
    return Math.min(matchPercentage, 100);
  }

  private calculateLocationMatch(profile: Profile, internship: Internship): number {
    if (!profile.locationPreferences || profile.locationPreferences.length === 0) {
      // If user hasn't specified preferences, give neutral score
      return 50;
    }

    const userLocations = profile.locationPreferences.map(loc => loc.toLowerCase());
    const internshipState = internship['state/ut'].toLowerCase();
    const internshipDistrict = internship.district.toLowerCase();

    // Check for exact state/district match
    const stateMatch = userLocations.some(loc => 
      loc.includes(internshipState) || internshipState.includes(loc)
    );
    const districtMatch = userLocations.some(loc => 
      loc.includes(internshipDistrict) || internshipDistrict.includes(loc)
    );

    if (districtMatch) return 100;
    if (stateMatch) return 70;
    
    // Check if user prefers "any" or "anywhere"
    const flexibleKeywords = ['any', 'anywhere', 'flexible', 'remote'];
    const isFlexible = userLocations.some(loc => 
      flexibleKeywords.some(keyword => loc.includes(keyword))
    );
    
    return isFlexible ? 60 : 20;
  }

  private calculateSectorMatch(profile: Profile, internship: Internship): number {
    if (!profile.sectorInterests || profile.sectorInterests.length === 0) return 50;

    const userSectors = profile.sectorInterests.map(sector => sector.toLowerCase());
    const internshipSector = internship.sector.toLowerCase();

    const sectorMatch = userSectors.some(sector =>
      sector.includes(internshipSector) || internshipSector.includes(sector)
    );

    return sectorMatch ? 100 : 20;
  }

  private calculateExperienceMatch(profile: Profile, internship: Internship): number {
    // Simple heuristic based on internship type and user education level
    const userEducation = profile.education;
    if (!userEducation || userEducation.length === 0) return 50;

    const highestEducation = userEducation.reduce((highest, current) => {
      const levels = ['10th', '12th', 'Diploma', 'Graduation', 'PostGraduation', 'ITI'];
      const currentIndex = levels.indexOf(current.level);
      const highestIndex = levels.indexOf(highest.level);
      return currentIndex > highestIndex ? current : highest;
    });

    const internshipType = internship.internship_type.toLowerCase();
    const educationLevel = highestEducation.level;

    // Government/NGO internships are more suitable for beginners
    if (internshipType.includes('government') || internshipType.includes('ngo')) {
      return 80;
    }

    // Corporate internships prefer higher education
    if (internshipType.includes('corporate')) {
      if (educationLevel === 'Graduation' || educationLevel === 'PostGraduation') {
        return 90;
      }
      if (educationLevel === 'Diploma' || educationLevel === '12th') {
        return 60;
      }
      return 30;
    }

    return 70;
  }

  private generateMatchReasons(profile: Profile, internship: Internship, score: number): string[] {
    const reasons: string[] = [];

    // Education reasons
    const userEducation = profile.education;
    if (userEducation && userEducation.length > 0) {
      const highestEducation = userEducation.reduce((highest, current) => {
        const levels = ['10th', '12th', 'Diploma', 'Graduation', 'PostGraduation', 'ITI'];
        const currentIndex = levels.indexOf(current.level);
        const highestIndex = levels.indexOf(highest.level);
        return currentIndex > highestIndex ? current : highest;
      });

      if (internship.course && highestEducation.course) {
        const userCourse = highestEducation.course.toLowerCase();
        const requiredCourse = internship.course.toLowerCase();
        if (userCourse.includes(requiredCourse) || requiredCourse.includes(userCourse)) {
          reasons.push(`Your ${highestEducation.course} background matches perfectly`);
        }
      }
    }

    // Skills reasons
    if (profile.skills && internship.preferred_skills) {
      const userSkills = profile.skills.map(skill => skill.toLowerCase());
      const requiredSkills = internship.preferred_skills.map(skill => skill.toLowerCase());

      const matchingSkills = userSkills.filter(userSkill =>
        requiredSkills.some(reqSkill =>
          userSkill.includes(reqSkill) || reqSkill.includes(userSkill)
        )
      );

      if (matchingSkills.length > 0) {
        reasons.push(`You have ${matchingSkills.length} matching skills: ${matchingSkills.slice(0, 2).join(', ')}`);
      }
    }

    // Location reasons
    if (profile.locationPreferences) {
      const userLocations = profile.locationPreferences.map(loc => loc.toLowerCase());
      const internshipState = internship['state/ut'].toLowerCase();
      const internshipDistrict = internship.district.toLowerCase();

      const districtMatch = userLocations.some(loc => 
        loc.includes(internshipDistrict) || internshipDistrict.includes(loc)
      );
      const stateMatch = userLocations.some(loc => 
        loc.includes(internshipState) || internshipState.includes(loc)
      );

      if (districtMatch) {
        reasons.push(`Located in your preferred area: ${internship.district}`);
      } else if (stateMatch) {
        reasons.push(`Located in your preferred state: ${internship['state/ut']}`);
      }
    }

    // Sector reasons
    if (profile.sectorInterests) {
      const userSectors = profile.sectorInterests.map(sector => sector.toLowerCase());
      const internshipSector = internship.sector.toLowerCase();

      const sectorMatch = userSectors.some(sector =>
        sector.includes(internshipSector) || internshipSector.includes(sector)
      );

      if (sectorMatch) {
        reasons.push(`Matches your interest in ${internship.sector}`);
      }
    }

    // Default reasons if none found
    if (reasons.length === 0) {
      if (score >= 70) {
        reasons.push('Good overall match with your profile');
        reasons.push('Suitable for your experience level');
      } else if (score >= 50) {
        reasons.push('Decent match with growth opportunities');
        reasons.push('Could help develop new skills');
      } else {
        reasons.push('Entry-level friendly position');
        reasons.push('Good learning opportunity');
      }
    }

    return reasons.slice(0, 3); // Limit to 3 reasons
  }

  // Public method to get recommendations
  public async getRecommendations(request: RecommendationRequest): Promise<InternshipRecommendation[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, this would fetch from an API based on request.profile
    const mockProfile: Profile = {
      id: request.userId,
      userId: request.userId,
      name: 'User',
      phoneNumber: '',
      education: request.profile.education.map((edu, index) => ({
        id: index.toString(),
        level: edu.level as '10th' | '12th' | 'Diploma' | 'Graduation' | 'PostGraduation' | 'ITI',
        boardOrUniversity: '',
        institute: '',
        course: edu.course,
        specialization: edu.specialization,
        yearOfPassing: new Date().getFullYear()
      })),
      skills: request.profile.skills,
      languages: ['Hindi', 'English'],
      sectorInterests: request.profile.sectorInterests,
      locationPreferences: request.profile.locationPreferences,
      address: {
        line1: '',
        state: '',
        district: '',
        pincode: ''
      },
      isProfileComplete: true
    };

    // Calculate recommendations
    const recommendations: InternshipRecommendation[] = internships
      .map((internship: Internship) => {
        const matchScore = this.calculateMatchScore(mockProfile, internship);
        const matchReasons = this.generateMatchReasons(mockProfile, internship, matchScore);

        return {
          internship,
          matchScore,
          matchReasons
        };
      })
      .filter((rec: InternshipRecommendation) => rec.matchScore >= 20) // Lower threshold for more options
      .sort((a: InternshipRecommendation, b: InternshipRecommendation) => b.matchScore - a.matchScore); // Sort by match score

    // Ensure we return 3-5 recommendations
    const finalRecommendations = recommendations.slice(0, 5);
    
    // If we have less than 3, add some with lower scores
    if (finalRecommendations.length < 3) {
      const remaining = internships
        .filter((internship: Internship) => !finalRecommendations.some(rec => rec.internship.id === internship.id))
        .map((internship: Internship) => {
          const matchScore = Math.max(this.calculateMatchScore(mockProfile, internship), 25);
          const matchReasons = this.generateMatchReasons(mockProfile, internship, matchScore);
          return { internship, matchScore, matchReasons };
        })
        .slice(0, 3 - finalRecommendations.length);
      
      finalRecommendations.push(...remaining);
    }

    return finalRecommendations;
  }

  // Get all available sectors
  public getAvailableSectors(): string[] {
    return Array.from(new Set(internships.map((internship: Internship) => internship.sector)));
  }

  // Get all available locations
  public getAvailableLocations(): string[] {
    const locations = internships.map((internship: Internship) => 
      `${internship.district}, ${internship['state/ut']}`
    );
    return Array.from(new Set(locations));
  }

  // Get all internships with basic filtering
  public async getAllInternships(filters?: {
    sector?: string;
    location?: string;
    minStipend?: number;
    maxStipend?: number;
    internshipType?: string;
  }): Promise<Internship[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredInternships = [...internships];

    if (filters) {
      if (filters.sector) {
        filteredInternships = filteredInternships.filter(internship => 
          internship.sector.toLowerCase().includes(filters.sector!.toLowerCase())
        );
      }

      if (filters.location) {
        filteredInternships = filteredInternships.filter(internship => 
          internship.district.toLowerCase().includes(filters.location!.toLowerCase()) ||
          internship['state/ut'].toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      if (filters.minStipend !== undefined) {
        filteredInternships = filteredInternships.filter(internship => 
          internship.stipend && internship.stipend >= filters.minStipend!
        );
      }

      if (filters.maxStipend !== undefined) {
        filteredInternships = filteredInternships.filter(internship => 
          internship.stipend && internship.stipend <= filters.maxStipend!
        );
      }

      if (filters.internshipType) {
        filteredInternships = filteredInternships.filter(internship => 
          internship.internship_type.toLowerCase().includes(filters.internshipType!.toLowerCase())
        );
      }
    }

    return filteredInternships;
  }
}
