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
    if (score >= 80) return 'bg-green-50 border-green-300 text-green-700';
    if (score >= 60) return 'bg-orange-50 border-orange-300 text-orange-700';
    return 'bg-blue-50 border-blue-300 text-blue-700';
  };

  const formatDescription = (description: string) => {
    return description.length > 120 
      ? description.substring(0, 120) + '...' 
      : description;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      {/* Header - Fixed Height */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
              {internship['area/field']}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-medium truncate">{internship.sector}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{internship.district}, {internship['state/ut']}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="truncate">{internship.internship_type}</span>
              </div>
            </div>
          </div>
          
          {matchScore > 0 && (
            <div className={`px-3 py-1 text-xs font-semibold border rounded-md flex-shrink-0 ${getMatchScoreColor(matchScore)}`}>
              {matchScore}% Match
            </div>
          )}
        </div>
      </div>

      {/* Content - Flexible Height */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        {/* Description - Fixed Height */}
        <div className="min-h-[3rem]">
          <p className="text-gray-700 text-sm leading-relaxed">
            {formatDescription(internship.description)}
          </p>
        </div>

        {/* Requirements and Skills - Fixed Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[8rem]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span>Requirements</span>
            </div>
            <div className="space-y-2">
              <span className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-800 border border-blue-200 rounded">
                {internship.minimum_qualification}
              </span>
              {internship.course && (
                <span className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-800 border border-blue-200 rounded ml-2">
                  {internship.course}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-800">Skills Needed</h4>
            <div className="flex flex-wrap gap-1">
              {internship.preferred_skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 border border-gray-300 rounded">
                  {skill}
                </span>
              ))}
              {internship.preferred_skills.length > 3 && (
                <span className="text-gray-500 text-xs self-center">
                  +{internship.preferred_skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Match Reasons - Variable Height */}
        {matchReasons.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <h4 className="text-sm font-semibold text-green-800 mb-2">Why this matches you</h4>
            <ul className="space-y-1">
              {matchReasons.slice(0, 2).map((reason, index) => (
                <li key={index} className="text-sm text-green-700 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Opportunities - Fixed at bottom */}
        <div className="mt-auto">
          <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md">
            <span className="text-sm text-gray-700 font-medium">
              {internship.no_of_opportunities} opportunities available
            </span>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-xs font-bold">{internship.no_of_opportunities}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions - Fixed at Bottom */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg mt-auto">
        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails?.(internship.id || '')}
            className="flex-1 flex items-center justify-center px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 hover:border-blue-500 font-medium transition-colors duration-200 text-sm"
          >
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button>
          <button
            onClick={() => onApply?.(internship.id || '')}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors duration-200 text-sm shadow-sm"
          >
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
