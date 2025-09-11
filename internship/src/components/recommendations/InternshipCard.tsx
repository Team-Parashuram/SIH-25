'use client';

import { Internship } from '../../types/internship';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Building, GraduationCap, ExternalLink, Eye } from 'lucide-react';

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
    if (score >= 80) return 'bg-green-100 border-green-300 text-green-800';
    if (score >= 60) return 'bg-orange-100 border-orange-300 text-orange-800';
    return 'bg-blue-100 border-blue-300 text-blue-800';
  };

  const formatDescription = (description: string) => {
    return description.length > 150 
      ? description.substring(0, 150) + '...' 
      : description;
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/95 backdrop-blur-sm group hover:scale-[1.02]">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
              {internship['area/field']}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Building className="w-4 h-4 text-blue-600" />
              <span className="font-medium">{internship.sector}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span>{internship.district}, {internship['state/ut']}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-green-600" />
                <span>{internship.internship_type}</span>
              </div>
            </div>
          </div>
          
          {matchScore > 0 && (
            <Badge className={`px-3 py-1 text-xs font-bold border ${getMatchScoreColor(matchScore)}`}>
              {matchScore}% Match
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed">
          {formatDescription(internship.description)}
        </p>

        {/* Requirements and Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Requirements</span>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                {internship.minimum_qualification}
              </Badge>
              {internship.course && (
                <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 ml-2">
                  {internship.course}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-800">Skills Needed</h4>
            <div className="flex flex-wrap gap-1">
              {internship.preferred_skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-green-50 text-green-800 border-green-200 text-xs">
                  {skill}
                </Badge>
              ))}
              {internship.preferred_skills.length > 3 && (
                <span className="text-gray-500 text-xs self-center">
                  +{internship.preferred_skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Match Reasons */}
        {matchReasons.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-green-800 mb-2">Why this matches you</h4>
            <ul className="space-y-1">
              {matchReasons.slice(0, 2).map((reason, index) => (
                <li key={index} className="text-sm text-green-700 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications and Special Requirements */}
        {(internship.certification_name.length > 0 || internship.special_requirements.length > 0) && (
          <div className="space-y-3">
            {internship.certification_name.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Preferred Certifications</h4>
                <div className="flex flex-wrap gap-1">
                  {internship.certification_name.map((cert, index) => (
                    <Badge key={index} variant="outline" className="bg-orange-50 text-orange-800 border-orange-200 text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {internship.special_requirements.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Special Requirements</h4>
                <div className="flex flex-wrap gap-1">
                  {internship.special_requirements.map((req, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50 text-red-800 border-red-200 text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Opportunities */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-700 font-medium">
            {internship.no_of_opportunities} opportunities available
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => onViewDetails?.(internship.id || '')}
            className="flex-1 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 font-semibold transition-all duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button
            onClick={() => onApply?.(internship.id || '')}
            className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
