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
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const formatDescription = (description: string) => {
    return description.length > 150 
      ? description.substring(0, 150) + '...' 
      : description;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {internship['area/field']} - {internship.sector}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              📍 {internship.district}, {internship['state/ut']}
            </span>
            <span className="flex items-center">
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
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        {formatDescription(internship.description)}
      </p>

      {/* Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">📚 Requirements</h4>
          <div className="space-y-1">
            <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
              {internship.minimum_qualification}
            </span>
            {internship.course && (
              <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs ml-1">
                {internship.course}
              </span>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">🎯 Skills Needed</h4>
          <div className="flex flex-wrap gap-1">
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
              <li key={index} className="text-xs text-gray-600 flex items-center">
                <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Opportunities */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">
          🎪 {internship.no_of_opportunities} opportunities available
        </span>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={() => onViewDetails?.(internship.id)}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          View Details
        </button>
        <button
          onClick={() => onApply?.(internship.id)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
