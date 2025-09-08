'use client';

import { Internship } from '../../types/internship';

interface InternshipCardProps {
  internship: Internship;
  matchScore?: number;
  matchReasons?: string[];
  onApply?: (internshipId: string) => void;
  onViewDetails?: (internshipId: string) => void;
}

export default function InternshipCard({ 
  internship, 
  matchScore = 0, 
  matchReasons = [], 
  onApply, 
  onViewDetails 
}: InternshipCardProps) {
  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'bg-orange-100 text-orange-800';
    if (score >= 60) return 'bg-orange-50 text-orange-700';
    return 'bg-gray-100 text-gray-700';
  };

  const formatDescription = (description: string) => {
    return description.length > 150 
      ? description.substring(0, 150) + '...' 
      : description;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-200 hover:border-orange-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-black mb-3">
            {internship['area/field']} - {internship.sector}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-black">
            <span className="flex items-center font-medium">
              📍 {internship.district}, {internship['state/ut']}
            </span>
            <span className="flex items-center font-medium">
              ⏰ {internship.internship_type}
            </span>
          </div>
        </div>
        
        {matchScore > 0 && (
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(matchScore)}`}>
            {matchScore}% Match
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-black text-base mb-6 leading-relaxed font-medium">
        {formatDescription(internship.description)}
      </p>

      {/* Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm font-bold text-black mb-3">📚 Requirements</h4>
          <div className="space-y-2">
            <span className="inline-block bg-orange-50 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium">
              {internship.minimum_qualification}
            </span>
            {internship.course && (
              <span className="inline-block bg-orange-50 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium ml-2">
                {internship.course}
              </span>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-black mb-3">🎯 Skills Needed</h4>
          <div className="flex flex-wrap gap-2">
            {internship.preferred_skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                {skill}
              </span>
            ))}
            {internship.preferred_skills.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{internship.preferred_skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Match Reasons */}
      {matchReasons.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">✨ Why this matches you</h4>
          <ul className="space-y-1">
            {matchReasons.slice(0, 2).map((reason, index) => (
              <li key={index} className="text-sm text-black flex items-center font-medium">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Opportunities */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-black font-semibold">
          🎪 {internship.no_of_opportunities} opportunities available
        </span>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={() => onViewDetails?.(internship.id)}
          className="flex-1 bg-white text-black border-2 border-gray-300 py-3 px-4 rounded-lg font-semibold hover:border-orange-500 hover:text-orange-600 transition-all duration-200"
        >
          View Details
        </button>
        <button
          onClick={() => onApply?.(internship.id)}
          className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
