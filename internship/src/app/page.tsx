'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Heart, Users, User, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileForm } from '@/components/ProfileForm';
import { RecommendationResults } from '@/components/RecommendationResults';
import { MLProcessingScreen } from '@/components/MLProcessingScreen';
import { generateMLRecommendations } from '@/utils/mlRecommendations';
import { CandidateProfile, RecommendationResult } from '@/types/internship';

type AppState = 'welcome' | 'form' | 'processing' | 'results';

const Page = () => {
  const { state: authState } = useAuth();
  const [appState, setAppState] = useState<AppState>('welcome');
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);

  // Check if user is authenticated and has completed profile
  const isAuthenticated = authState.step === 'complete' || authState.step === 'profile_creation';
  const hasCompletedAuth = authState.step === 'complete';

  const handleProfileSubmit = async (profile: CandidateProfile) => {
    setCandidateProfile(profile);
    setAppState('processing');
    
    // Simulate ML processing with realistic delay
    const recs = await generateMLRecommendations(profile);
    setRecommendations(recs);
  };

  const handleProcessingComplete = () => {
    setAppState('results');
  };

  const handleStartOver = () => {
    setAppState('form');
    setCandidateProfile(null);
    setRecommendations([]);
  };

  const handleGetStarted = () => {
    setAppState('form');
  };

  if (appState === 'processing') {
    return (
      <MLProcessingScreen
        onComplete={handleProcessingComplete}
        candidateName={candidateProfile?.name || 'Candidate'}
      />
    );
  }

  if (appState === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-orange-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Header Navigation */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-white font-bold">PM Internship Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white/80 hover:text-white text-sm">हिंदी</button>
              <button className="text-white/80 hover:text-white text-sm">A+</button>
              <button className="text-white/80 hover:text-white text-sm">Skip to main content</button>
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto py-8">
          <ProfileForm onSubmit={handleProfileSubmit} />
        </div>
      </div>
    );
  }

  if (appState === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-orange-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Header Navigation */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-white font-bold">PM Internship Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white/80 hover:text-white text-sm">हिंदी</button>
              <button className="text-white/80 hover:text-white text-sm">A+</button>
              <button className="text-white/80 hover:text-white text-sm">Skip to main content</button>
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto py-8">
          <RecommendationResults
            recommendations={recommendations}
            candidateName={candidateProfile?.name || 'Candidate'}
            onStartOver={handleStartOver}
          />
        </div>
      </div>
    );
  }

  // Welcome Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-orange-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Header Navigation */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-white font-bold">PM Internship Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/80 hover:text-white text-sm">हिंदी</button>
            <button className="text-white/80 hover:text-white text-sm">A+</button>
            <button className="text-white/80 hover:text-white text-sm">Skip to main content</button>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <Target className="h-10 w-10 text-purple-600" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight">
                PM Internship
              </h1>
              <p className="text-xl text-orange-200 font-medium">Smart Recommendation Portal</p>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/30">
            <h2 className="text-2xl font-bold text-white mb-3">
              AI-Powered Career Matching System
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Find your perfect internship match using advanced machine learning. 
              Complete secure authentication and get personalized recommendations in minutes.
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-5xl w-full"
        >
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
            <Zap className="h-10 w-10 text-orange-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-white/80 text-sm">
              Neural networks analyze your profile in seconds
            </p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
            <Heart className="h-10 w-10 text-orange-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">ML Matching</h3>
            <p className="text-white/80 text-sm">
              Machine learning finds your perfect matches
            </p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
            <Users className="h-10 w-10 text-orange-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Government Verified</h3>
            <p className="text-white/80 text-sm">
              Official PM Internship Scheme portal
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6"
        >
          {hasCompletedAuth ? (
            <>
              <button
                onClick={handleGetStarted}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl px-16 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-orange-400"
              >
                🤖 Continue to ML Recommendations
              </button>
              
              <div className="flex items-center justify-center gap-2 text-white/90 text-lg bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                <User className="h-5 w-5" />
                <span>Welcome, {authState.demographics?.name}!</span>
              </div>
            </>
          ) : isAuthenticated ? (
            <>
              <button
                onClick={handleGetStarted}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl px-16 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-orange-400"
              >
                🤖 Complete Demo Profile & Find Internships
              </button>
              
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-2xl px-6 py-3">
                <p className="text-white font-medium">
                  ✅ Demo eKYC Verified • Complete demo profile to see ML recommendations
                </p>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => window.location.href = '/signin'}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl px-16 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-orange-400 flex items-center gap-4 mx-auto"
              >
                <LogIn className="h-6 w-6" />
                Start Demo Login Flow
              </button>
              
              <div className="space-y-3">
                <div className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4">
                  <p className="text-white font-bold text-lg mb-2">
                    🎯 UI DEMONSTRATION
                  </p>
                  <p className="text-white/90">Complete authentication flow simulation</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <span className="text-orange-300">✓</span> Mobile OTP Demo
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <span className="text-orange-300">✓</span> Simulated eKYC
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <span className="text-orange-300">✓</span> AI Recommendations
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 grid grid-cols-3 gap-8 text-center max-w-lg"
        >
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl py-4 px-3 border border-white/30">
            <div className="text-3xl font-bold text-orange-300">1000+</div>
            <div className="text-white/80 text-sm font-medium">Internships</div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl py-4 px-3 border border-white/30">
            <div className="text-3xl font-bold text-orange-300">50+</div>
            <div className="text-white/80 text-sm font-medium">Sectors</div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl py-4 px-3 border border-white/30">
            <div className="text-3xl font-bold text-orange-300">700+</div>
            <div className="text-white/80 text-sm font-medium">Districts</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
