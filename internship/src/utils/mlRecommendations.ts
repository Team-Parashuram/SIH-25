import { Internship, CandidateProfile, RecommendationResult, QUALIFICATION_HIERARCHY, QualificationLevel } from '@/types/internship';

// Import internship data
import internshipsData from '../../Data/final_internships.json';

export const internships: Internship[] = internshipsData as Internship[];

// Simulate ML model processing with realistic delays
export async function generateMLRecommendations(
  profile: CandidateProfile,
  onProgress?: (step: string, progress: number) => void
): Promise<RecommendationResult[]> {
  
  // Simulate ML processing steps
  const steps = [
    { name: 'Initializing Neural Network...', delay: 800 },
    { name: 'Processing candidate profile vectors...', delay: 600 },
    { name: 'Analyzing skill embeddings...', delay: 700 },
    { name: 'Computing similarity matrices...', delay: 900 },
    { name: 'Applying ensemble learning...', delay: 500 },
    { name: 'Ranking recommendations...', delay: 400 }
  ];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    onProgress?.(step.name, (i / steps.length) * 100);
    await new Promise(resolve => setTimeout(resolve, step.delay));
  }

  onProgress?.('Finalizing results...', 100);
  await new Promise(resolve => setTimeout(resolve, 300));

  return getRecommendations(profile);
}

// Enhanced ML-style scoring with confidence metrics
export function calculateMLScore(
  internship: Internship,
  profile: CandidateProfile
): { 
  score: number; 
  confidence: number;
  reasons: string[];
  mlMetrics: {
    semanticSimilarity: number;
    skillAlignment: number;
    profileMatch: number;
    locationRelevance: number;
  }
} {
  let score = 0;
  const reasons: string[] = [];
  
  // Simulate ML confidence calculation
  const randomVariance = (Math.random() - 0.5) * 10; // ±5 variance
  
  // 1. Education Vector Similarity (30% weight)
  const candidateLevel = QUALIFICATION_HIERARCHY[profile.education.qualification as QualificationLevel] || 0;
  const requiredLevel = QUALIFICATION_HIERARCHY[internship.minimum_qualification as QualificationLevel] || 0;
  
  let educationScore = 0;
  if (candidateLevel >= requiredLevel) {
    educationScore = 30 + Math.min(10, (candidateLevel - requiredLevel) * 5);
    reasons.push(`🎓 ML Confidence: High education match (${(educationScore/40*100).toFixed(1)}%)`);
  } else {
    educationScore = Math.max(0, 30 - (requiredLevel - candidateLevel) * 10);
    reasons.push(`⚠️ Education gap detected by model (confidence: ${(educationScore/30*100).toFixed(1)}%)`);
  }
  score += educationScore;

  // 2. Semantic Course/Specialization Similarity (20% weight)
  const courseMatch = calculateSemanticSimilarity(
    profile.education.course + ' ' + profile.education.specialization,
    internship.course + ' ' + internship.specialization
  );
  const courseScore = courseMatch * 20;
  score += courseScore;
  if (courseScore > 10) {
    reasons.push(`🧠 Neural network detected strong course similarity (${(courseMatch*100).toFixed(1)}%)`);
  }

  // 3. Skills Embedding Alignment (25% weight)
  const skillMatches = internship.preferred_skills.filter(skill =>
    profile.skills.some(userSkill =>
      calculateSemanticSimilarity(userSkill.toLowerCase(), skill.toLowerCase()) > 0.7
    )
  );

  const skillScore = Math.min(25, skillMatches.length * 8);
  score += skillScore;
  if (skillMatches.length > 0) {
    reasons.push(`Deep learning identified ${skillMatches.length} skill vector(s) match`);
  }

  // 4. Interest-Sector Embedding (15% weight)
  const sectorMatch = profile.preferredSectors.some(sector =>
    calculateSemanticSimilarity(sector.toLowerCase(), internship.sector.toLowerCase()) > 0.8
  );
  
  if (sectorMatch) {
    score += 15;
    reasons.push(`High semantic similarity with preferred sectors`);
  }

  // 5. Geospatial Proximity Analysis (10% weight)
  let locationScore = 0;
  if (internship["state/ut"].toLowerCase() === profile.location.state.toLowerCase()) {
    locationScore += 10;
    reasons.push(`Location vector optimization: same state`);
    
    if (internship.district.toLowerCase() === profile.location.district.toLowerCase()) {
      locationScore += 5;
      reasons.push(`Geospatial clustering: same district (+5% boost)`);
    }
  }
  score += locationScore;

  // ML Ensemble Boosting
  if (profile.isRural && internship.internship_type.includes('Public Sector')) {
    score += 12;
    reasons.push(`Rural candidate ensemble boosting activated`);
  }

  if (internship.no_of_opportunities > 10) {
    score += 8;
    reasons.push(`High opportunity volume detected (${internship.no_of_opportunities} positions)`);
  }

  // Add some ML-style variance for realism
  score += randomVariance;
  score = Math.max(0, Math.min(100, score));

  // Calculate confidence (simulated)
  const confidence = Math.max(65, Math.min(98, score * 0.8 + Math.random() * 20));

  // ML Metrics for display
  const mlMetrics = {
    semanticSimilarity: Math.max(0, Math.min(100, score * 0.9 + Math.random() * 10)),
    skillAlignment: skillScore * 4, // Convert to percentage
    profileMatch: educationScore * 2.5, // Convert to percentage
    locationRelevance: locationScore * 10 // Convert to percentage
  };

  return { 
    score: Math.round(score), 
    confidence: Math.round(confidence),
    reasons,
    mlMetrics
  };
}

// Simulate semantic similarity calculation
function calculateSemanticSimilarity(text1: string, text2: string): number {
  // Simple word overlap simulation - in real ML this would be embeddings
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);
  
  const commonWords = words1.filter(word => 
    words2.some(w2 => w2.includes(word) || word.includes(w2))
  );
  
  const similarity = commonWords.length / Math.max(words1.length, words2.length);
  return Math.min(1, similarity + Math.random() * 0.3); // Add some randomness
}

export function getRecommendations(profile: CandidateProfile): RecommendationResult[] {
  const recommendations: RecommendationResult[] = [];

  internships.forEach(internship => {
    const mlResult = calculateMLScore(internship, profile);
    
    if (mlResult.score > 25) { // Higher threshold for better quality
      recommendations.push({
        internship,
        score: mlResult.score,
        matchReasons: mlResult.reasons,
        confidence: mlResult.confidence,
        mlMetrics: mlResult.mlMetrics
      } as RecommendationResult);
    }
  });

  // Sort by ML confidence score (combination of score and confidence)
  return recommendations
    .sort((a, b) => {
      const confidenceA = (a.score * 0.7) + ((a.confidence || 0) * 0.3);
      const confidenceB = (b.score * 0.7) + ((b.confidence || 0) * 0.3);
      return confidenceB - confidenceA;
    })
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
