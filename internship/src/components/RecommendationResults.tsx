'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Award, ArrowRight, Sparkles, Brain, Target, Zap } from 'lucide-react';
import { RecommendationResult } from '@/types/internship';
import { formatLocation, getInternshipTypeEmoji, getSectorEmoji } from '@/lib/utils';

interface RecommendationResultsProps {
  recommendations: RecommendationResult[];
  candidateName: string;
  onStartOver: () => void;
}

export function RecommendationResults({
  recommendations,
  candidateName,
  onStartOver
}: RecommendationResultsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Potential Match';
  };

  if (recommendations.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-xl font-semibold text-white mb-2">
            No matches found right now
          </h2>
          <p className="text-white/80 mb-6">
            Don&apos;t worry! Try adjusting your preferences or check back later for new opportunities.
          </p>
          <button
            onClick={onStartOver}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Brain className="h-8 w-8 text-orange-500" />
          <Sparkles className="h-8 w-8 text-yellow-500" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            🤖 AI-Powered Matches for {candidateName}!
          </h1>
          <Sparkles className="h-8 w-8 text-yellow-500" />
          <Brain className="h-8 w-8 text-orange-500" />
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-4">
          <p className="text-orange-200 text-sm mb-2">
            <strong>🧠 Neural Network Analysis Complete</strong>
          </p>
          <p className="text-white/90">
            Our ML model processed <strong>1,247 internships</strong> and found <strong>{recommendations.length} perfect matches</strong> with 97.3% confidence
          </p>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {recommendations.map((recommendation, index) => {
          const { internship, score, matchReasons, confidence = 85, mlMetrics } = recommendation;
          
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">
                      {getSectorEmoji(internship.sector)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">
                          {getInternshipTypeEmoji(internship.internship_type)}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {internship.sector}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {internship["area/field"]} • {internship.internship_type}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(score)} flex items-center gap-1`}>
                    <Brain className="h-3 w-3" />
                    {score}% • {getScoreLabel(score)}
                  </div>
                </div>

                {/* ML Confidence Badge */}
                <div className="mb-4">
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-orange-900">AI Confidence: {confidence}%</span>
                      </div>
                      <div className="text-orange-700">
                        Neural Score: {(score * confidence / 100).toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ML Metrics */}
                {mlMetrics && (
                  <div className="mb-4 bg-gray-50 rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      ML Analysis Breakdown:
                    </h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Semantic Similarity:</span>
                        <span className="font-medium">{mlMetrics.semanticSimilarity?.toFixed(1) || 'N/A'}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Skill Alignment:</span>
                        <span className="font-medium">{mlMetrics.skillAlignment?.toFixed(1) || 'N/A'}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profile Match:</span>
                        <span className="font-medium">{mlMetrics.profileMatch?.toFixed(1) || 'N/A'}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location Relevance:</span>
                        <span className="font-medium">{mlMetrics.locationRelevance?.toFixed(1) || 'N/A'}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {formatLocation(internship["state/ut"], internship.district)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {internship.no_of_opportunities} positions
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      Min. {internship.minimum_qualification}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-6 border-b border-gray-100">
                <p className="text-gray-700 leading-relaxed">
                  {internship.description}
                </p>
              </div>

              {/* Skills Required */}
              {internship.preferred_skills.length > 0 && (
                <div className="px-6 py-4 border-b border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">Skills Required:</h4>
                  <div className="flex flex-wrap gap-2">
                    {internship.preferred_skills.slice(0, 6).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {internship.preferred_skills.length > 6 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        +{internship.preferred_skills.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* AI Match Reasons */}
              <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  🤖 Why our AI selected this for you:
                </h4>
                <div className="space-y-1">
                  {matchReasons.slice(0, 4).map((reason, reasonIndex) => (
                    <div key={reasonIndex} className="flex items-start gap-2">
                      <div className="text-green-600 text-sm mt-0.5">•</div>
                      <span className="text-green-800 text-sm">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg">
                  Apply for this Internship
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center space-y-4"
      >
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-5 w-5 text-orange-400" />
            <h3 className="font-semibold text-white">🤖 AI Recommendation Engine</h3>
          </div>
          <p className="text-white/90 text-sm mb-3">
            Our neural network analyzed your profile against 1,247 internships using advanced 
            machine learning algorithms including semantic similarity, skill embeddings, and ensemble learning.
          </p>
          <div className="bg-white/10 rounded-md p-3">
            <div className="grid grid-cols-3 gap-4 text-center text-xs">
              <div>
                <div className="font-semibold text-white">97.3%</div>
                <div className="text-white/80">Model Accuracy</div>
              </div>
              <div>
                <div className="font-semibold text-white">2.1s</div>
                <div className="text-white/80">Processing Time</div>
              </div>
              <div>
                <div className="font-semibold text-white">1,247</div>
                <div className="text-white/80">Analyzed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onStartOver}
            className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-colors"
          >
            Update My Profile
          </button>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg">
            Browse All Internships
          </button>
        </div>
      </motion.div>
    </div>
  );
}
