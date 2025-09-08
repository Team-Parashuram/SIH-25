import { Internship, CandidateProfile, RecommendationResult, QUALIFICATION_HIERARCHY, QualificationLevel } from '@/types/internship';

// Import internship data
import internshipsData from '../../Data/final_internships.json';

export const internships: Internship[] = internshipsData as Internship[];

// Calculate recommendation score based on multiple factors
export function calculateRecommendationScore(
  internship: Internship,
  profile: CandidateProfile
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // 1. Qualification match (30% weight)
  const candidateLevel = QUALIFICATION_HIERARCHY[profile.education.qualification as QualificationLevel] || 0;
  const requiredLevel = QUALIFICATION_HIERARCHY[internship.minimum_qualification as QualificationLevel] || 0;
  
  if (candidateLevel >= requiredLevel) {
    score += 30;
    reasons.push(`✓ Meets qualification requirement (${internship.minimum_qualification})`);
  } else {
    score -= 20;
    reasons.push(`⚠ Qualification gap: requires ${internship.minimum_qualification}`);
  }

  // 2. Course/Specialization match (20% weight)
  if (profile.education.course.toLowerCase().includes(internship.course.toLowerCase()) ||
      internship.course.toLowerCase().includes(profile.education.course.toLowerCase())) {
    score += 20;
    reasons.push(`✓ Course match (${internship.course})`);
  }

  if (profile.education.specialization.toLowerCase().includes(internship.specialization.toLowerCase()) ||
      internship.specialization.toLowerCase().includes(profile.education.specialization.toLowerCase())) {
    score += 15;
    reasons.push(`✓ Specialization match (${internship.specialization})`);
  }

  // 3. Skills match (25% weight)
  const skillMatches = internship.preferred_skills.filter(skill =>
    profile.skills.some(userSkill =>
      userSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(userSkill.toLowerCase())
    )
  );

  if (skillMatches.length > 0) {
    score += Math.min(25, skillMatches.length * 8);
    reasons.push(`✓ ${skillMatches.length} skill match(es): ${skillMatches.slice(0, 2).join(', ')}`);
  }

  // 4. Sector interest match (15% weight)
  if (profile.preferredSectors.some(sector =>
    sector.toLowerCase().includes(internship.sector.toLowerCase()) ||
    internship.sector.toLowerCase().includes(sector.toLowerCase())
  )) {
    score += 15;
    reasons.push(`✓ Sector interest match (${internship.sector})`);
  }

  // 5. Location preference (10% weight)
  if (internship["state/ut"].toLowerCase() === profile.location.state.toLowerCase()) {
    score += 10;
    reasons.push(`✓ Same state location`);
    
    if (internship.district.toLowerCase() === profile.location.district.toLowerCase()) {
      score += 5;
      reasons.push(`✓ Same district location`);
    }
  }

  // Bonus for rural candidates in Public Sector opportunities
  if (profile.isRural && internship.internship_type.includes('Public Sector')) {
    score += 10;
    reasons.push(`✓ Public sector opportunity (good for rural background)`);
  }

  // Bonus for high opportunity count
  if (internship.no_of_opportunities > 10) {
    score += 5;
    reasons.push(`✓ Multiple openings available (${internship.no_of_opportunities})`);
  }

  return { score: Math.max(0, Math.min(100, score)), reasons };
}

export function getRecommendations(profile: CandidateProfile): RecommendationResult[] {
  const recommendations: RecommendationResult[] = [];

  internships.forEach(internship => {
    const { score, reasons } = calculateRecommendationScore(internship, profile);
    
    if (score > 20) { // Only include reasonable matches
      recommendations.push({
        internship,
        score,
        matchReasons: reasons
      });
    }
  });

  // Sort by score and return top 5
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// Get unique values for form dropdowns
export function getUniqueValues<T extends keyof Internship>(field: T): string[] {
  const values = new Set<string>();
  
  internships.forEach(internship => {
    const value = internship[field];
    if (typeof value === 'string') {
      values.add(value);
    }
  });
  
  return Array.from(values).sort();
}

export function getAllSkills(): string[] {
  const skills = new Set<string>();
  
  internships.forEach(internship => {
    internship.preferred_skills.forEach(skill => {
      skills.add(skill);
    });
  });
  
  return Array.from(skills).sort();
}
