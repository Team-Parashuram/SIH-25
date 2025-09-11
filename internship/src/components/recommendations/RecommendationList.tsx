'use client';

import { useState, useEffect } from 'react';
import { InternshipRecommendation } from '../../types/internship';
import InternshipCard from './InternshipCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  RefreshCw, 
  Loader2, 
  Target, 
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 p-4">
        <Card className="max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900 mb-2">
              Finding Perfect Internships
            </CardTitle>
            <p className="text-gray-600">
              Analyzing your profile and matching with opportunities...
            </p>
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 text-sm text-blue-800">
                <Target className="w-4 h-4" />
                <span>AI-powered matching in progress</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 p-4">
        <Card className="max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900 mb-2">
              No Recommendations Found
            </CardTitle>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find any internships matching your profile. Try updating your skills or preferences.
            </p>
            <Button
              onClick={onRefresh}
              className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Personalized Recommendations
                  </CardTitle>
                  <p className="text-gray-600 text-sm">
                    {recommendations.length} AI-matched internships based on your profile
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {recommendations.length} matches
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRefresh}
                  className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center shadow-lg border-0 bg-white/95">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-2 text-orange-600 mb-2">
                <Award className="w-5 h-5" />
                <span className="text-lg font-bold">{recommendations.filter(r => r.matchScore >= 80).length}</span>
              </div>
              <p className="text-sm text-gray-600">High Match (80%+)</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg border-0 bg-white/95">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-lg font-bold">{recommendations.reduce((sum, r) => sum + r.internship.no_of_opportunities, 0)}</span>
              </div>
              <p className="text-sm text-gray-600">Total Positions</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg border-0 bg-white/95">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-lg font-bold">{Math.round(recommendations.reduce((sum, r) => sum + r.matchScore, 0) / recommendations.length)}%</span>
              </div>
              <p className="text-sm text-gray-600">Avg Match Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {displayedRecommendations.slice(0, 5).map((recommendation, index) => (
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

        {/* Load More */}
        {recommendations.length > 5 && displayedRecommendations.length < recommendations.length && (
          <div className="text-center pt-6">
            <Button
              onClick={() => {
                const nextBatch = recommendations.slice(displayedRecommendations.length, displayedRecommendations.length + 5);
                nextBatch.forEach((recommendation, index) => {
                  setTimeout(() => {
                    setDisplayedRecommendations(prev => [...prev, recommendation]);
                  }, index * 200);
                });
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Load More Recommendations
            </Button>
          </div>
        )}

        {/* Footer Info */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="text-center p-6">
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm">AI-powered matching technology by Government of India</span>
            </div>
            <p className="text-xs text-gray-500">
              Recommendations are updated in real-time based on your profile and market trends
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
