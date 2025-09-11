'use client';

import { Internship } from '../../types/internship';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Clock, 
  GraduationCap, 
  Target, 
  Trophy, 
  AlertTriangle, 
  Users, 
  ExternalLink, 
  Star,
  BookOpen,
  Award,
  Building2,
  Calendar,
  CheckCircle2
} from 'lucide-react';

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
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getMatchScoreIcon = (score: number) => {
    if (score >= 80) return <Star className="w-3 h-3 fill-current" />;
    if (score >= 60) return <Star className="w-3 h-3" />;
    return <Target className="w-3 h-3" />;
  };

  const formatDescription = (description: string) => {
    return description.length > 120 
      ? description.substring(0, 120) + '...' 
      : description;
  };

  return (
    <Card className="group shadow-lg border-0 bg-gradient-to-br from-white to-slate-50/30 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:bg-gradient-to-br hover:from-green-50/40 hover:to-blue-50/40 h-full flex flex-col">
      <CardHeader className="pb-4">
        {/* Match Score Badge */}
        {matchScore > 0 && (
          <div className="flex justify-end mb-2">
            <Badge 
              variant="secondary" 
              className={`${getMatchScoreColor(matchScore)} px-3 py-1 font-semibold text-sm border`}
            >
              {getMatchScoreIcon(matchScore)}
              <span className="ml-1">{matchScore}% मैच / Match</span>
            </Badge>
          </div>
        )}

        {/* Title and Organization */}
        <CardTitle className="text-xl font-bold text-slate-800 leading-tight mb-3 line-clamp-2">
          {internship['area/field']}
        </CardTitle>
        
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 text-xs">
            <Building2 className="w-3 h-3 mr-1" />
            {internship.sector}
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200 text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {internship.internship_type}
          </Badge>
        </div>

        {/* Location */}
        <div className="flex items-center text-slate-600 mb-3">
          <MapPin className="w-4 h-4 mr-2 text-green-600" />
          <span className="font-medium text-sm">{internship.district}, {internship['state/ut']}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        {/* Description */}
        <div>
          <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
            {formatDescription(internship.description)}
          </p>
        </div>

        <Separator className="bg-slate-200" />

        {/* Requirements Section */}
        <div className="grid grid-cols-1 gap-4">
          {/* Educational Requirements */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-3 h-3 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">
                शिक्षा / Education
              </h4>
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className="bg-blue-50 text-blue-800 border-blue-200 text-xs">
                {internship.minimum_qualification}
              </Badge>
              {internship.course && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-800 border-blue-200 text-xs">
                  {internship.course}
                </Badge>
              )}
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-3 h-3 text-green-600" />
              <h4 className="text-xs font-bold text-slate-800">
                कौशल / Skills
              </h4>
            </div>
            <div className="flex flex-wrap gap-1">
              {internship.preferred_skills.slice(0, 2).map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-green-50 text-green-800 border-green-200 text-xs">
                  {skill}
                </Badge>
              ))}
              {internship.preferred_skills.length > 2 && (
                <Badge variant="outline" className="text-xs text-slate-500 border-slate-300">
                  +{internship.preferred_skills.length - 2} और
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Match Reasons */}
        {matchReasons.length > 0 && (
          <>
            <Separator className="bg-slate-200" />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                <h4 className="text-xs font-bold text-slate-800">
                  आपके लिए उपयुक्त / Perfect for You
                </h4>
              </div>
              <ul className="space-y-1">
                {matchReasons.slice(0, 1).map((reason, index) => (
                  <li key={index} className="text-xs text-slate-700 flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                    <span className="line-clamp-2">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1"></div>

        <Separator className="bg-slate-200" />

        {/* Opportunities Available */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-semibold text-slate-800">
              {internship.no_of_opportunities} अवसर / Opportunities
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => onViewDetails?.(internship.id || '')}
            className="w-full h-9 text-sm font-semibold border-2 border-slate-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <ExternalLink className="w-3 h-3 mr-2" />
            विवरण देखें / View Details
          </Button>
          <Button
            onClick={() => onApply?.(internship.id || '')}
            className="w-full h-9 text-sm font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <BookOpen className="w-3 h-3 mr-2" />
            आवेदन करें / Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
