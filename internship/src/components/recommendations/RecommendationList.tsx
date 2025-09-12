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
    if (recommendations.length > 0 && !loading) {
      setDisplayedRecommendations([]);
      recommendations.forEach((recommendation, index) => {
        setTimeout(() => {
          setDisplayedRecommendations(prev => [...prev, recommendation]);
        }, index * 150);
      });
    }
  }, [recommendations, loading]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Finding Perfect Internships
          </h3>
          <p className="text-gray-600 text-sm">
            Analyzing your profile and matching with opportunities...
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-center justify-center gap-2 text-sm text-blue-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>AI-powered matching in progress</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Recommendations Found
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            We couldn't find any internships matching your profile. Try updating your skills or preferences.
          </p>
          <button
            onClick={onRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 text-sm"
          >
            <svg className="w-4 h-4 mr-1.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Personalized Recommendations
              </h2>
              <p className="text-gray-600 text-sm">
                {recommendations.length} AI-matched internships based on your profile
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-md text-sm font-medium">
              <svg className="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {recommendations.length} matches
            </div>
            <button
              onClick={onRefresh}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-blue-500 px-3 py-1 rounded-md transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-orange-600 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-lg font-bold">{recommendations.filter(r => r.matchScore >= 80).length}</span>
          </div>
          <p className="text-sm text-gray-600">High Match (80%+)</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a3 3 0 01-3-3v-2a3 3 0 013-3 3 3 0 013 3v2a3 3 0 01-3 3zm8-10a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-lg font-bold">{recommendations.reduce((sum, r) => sum + r.internship.no_of_opportunities, 0)}</span>
          </div>
          <p className="text-sm text-gray-600">Total Positions</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-lg font-bold">{Math.round(recommendations.reduce((sum, r) => sum + r.matchScore, 0) / recommendations.length)}%</span>
          </div>
          <p className="text-sm text-gray-600">Avg Match Score</p>
        </div>
      </div>

      {/* Recommendations Grid - 2x2 Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedRecommendations.slice(0, 4).map((recommendation, index) => (
          <div
            key={recommendation.internship.id}
            className="opacity-0 animate-fade-in"
            style={{
              animationDelay: `${index * 150}ms`,
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

      {/* Load More */}
      {recommendations.length > 4 && displayedRecommendations.length < recommendations.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => {
              const nextBatch = recommendations.slice(displayedRecommendations.length, displayedRecommendations.length + 4);
              nextBatch.forEach((recommendation, index) => {
                setTimeout(() => {
                  setDisplayedRecommendations(prev => [...prev, recommendation]);
                }, index * 150);
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200 text-sm"
          >
            Load More Recommendations
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">AI-powered matching technology by Government of India</span>
          </div>
          <p className="text-xs text-gray-500">
            Recommendations are updated in real-time based on your profile and market trends
          </p>
        </div>
      </div>
    </div>
  );
}
