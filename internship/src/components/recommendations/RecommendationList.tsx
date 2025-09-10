'use client';

import { useState, useEffect } from 'react';
import { InternshipRecommendation } from '../../types/internship';
import InternshipCard from './InternshipCard';

interface RecommendationListProps {
  recommendations: InternshipRecommendation[];
  loading?: boolean;
  onApply?: (internshipId: string) => void;
  onViewDetails?: (internshipId: string) => void;
  onRefresh?: () => void;
}

export default function RecommendationList({ 
  recommendations, 
  loading = false, 
  onApply, 
  onViewDetails,
  onRefresh 
}: RecommendationListProps) {
  const [displayedRecommendations, setDisplayedRecommendations] = useState<InternshipRecommendation[]>([]);

  useEffect(() => {
    // Simulate loading animation by showing recommendations one by one
    if (recommendations.length > 0 && !loading) {
      setDisplayedRecommendations([]);
      recommendations.forEach((recommendation, index) => {
        setTimeout(() => {
          setDisplayedRecommendations(prev => [...prev, recommendation]);
        }, index * 200);
      });
    }
  }, [recommendations, loading]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-black mb-2">Finding Perfect Internships</h3>
          <p className="text-black">Analyzing your profile and matching with opportunities...</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto mb-4 h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-xl font-bold text-black mb-2">No Recommendations Found</h3>
        <p className="text-black mb-6">
          We couldn&apos;t find any internships matching your profile. Try updating your skills or preferences.
        </p>
        <button
          onClick={onRefresh}
          className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
        >
          Refresh Recommendations
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-black">
            🎯 Top Recommendations for You
          </h2>
          <p className="text-black mt-2 text-lg">
            {recommendations.length} carefully selected internship{recommendations.length !== 1 ? 's' : ''} matching your profile
          </p>
        </div>
        
        <button
          onClick={onRefresh}
          className="bg-white text-black border-2 border-gray-300 px-6 py-3 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-colors font-semibold"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayedRecommendations.map((recommendation, index) => (
          <div
            key={recommendation.internship.id}
            className="opacity-0 animate-fade-in"
            style={{
              animationDelay: `${index * 200}ms`,
              animationFillMode: 'forwards'
            }}
          >
            <InternshipCard
              internship={recommendation.internship}
              matchScore={recommendation.matchScore}
              matchReasons={recommendation.matchReasons}
              onApply={onApply}
              onViewDetails={onViewDetails}
            />
          </div>
        ))}
      </div>

      {/* Show More Button for large lists */}
      {displayedRecommendations.length < recommendations.length && (
        <div className="text-center">
          <button
            onClick={() => setDisplayedRecommendations(recommendations)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Show More Recommendations
          </button>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-blue-50 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips to Improve Your Recommendations</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Update your skills regularly to match with more relevant opportunities
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Add multiple location preferences to see more options
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Complete your education details for better matching
          </li>
        </ul>
      </div>

      {/* Explore More Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mt-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">🔍 Want to explore more opportunities?</h3>
          <p className="text-gray-600 mb-4">
            Browse through all available internships and discover opportunities across various sectors and locations.
          </p>
          <a 
            href="/internships"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View All Internships
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
