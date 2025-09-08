'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, ChevronLeft, User, GraduationCap, MapPin, Briefcase, Heart, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { candidateProfileSchema, type CandidateProfileForm } from '@/schemas/candidate';
import { Input, Select, RadioGroup } from './ui/FormElements';
import { MultiSelect } from './ui/MultiSelect';
import { AdvancedSkillsSelector } from './ui/AdvancedSkillsSelector';
import { getSectorLabel } from '@/lib/utils';
import { CandidateProfile } from '@/types/internship';

interface ProfileFormProps {
  onSubmit: (profile: CandidateProfile) => void;
}

const steps = [
  { id: 'personal', title: 'Personal Info', icon: User },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'location', title: 'Location', icon: MapPin },
  { id: 'skills', title: 'Skills', icon: Briefcase },
  { id: 'interests', title: 'Interests', icon: Heart },
  { id: 'preferences', title: 'Preferences', icon: Settings },
];

const qualificationOptions = [
  { value: '10th', label: '10th Grade', emoji: '📚' },
  { value: '12th', label: '12th Grade', emoji: '📖' },
  { value: 'ITI', label: 'ITI', emoji: '⚙️' },
  { value: 'Diploma', label: 'Diploma', emoji: '📋' },
  { value: 'Graduation', label: 'Graduation', emoji: '🎓' },
];

const digitalLiteracyOptions = [
  { value: 'low', label: 'Basic (New to smartphones/internet)', emoji: '📱' },
  { value: 'medium', label: 'Moderate (Comfortable with apps)', emoji: '💻' },
  { value: 'high', label: 'Advanced (Tech-savvy)', emoji: '🚀' },
];

const sectors = [
  'IT and Software Development', 'Banking and financial Services', 'Healthcare',
  'Manufacturing & Industrial', 'Agriculture and allied', 'Automotive',
  'Aviation & Defence', 'Pharmaceutical', 'Education', 'Telecom',
  'Infrastructure & Construction', 'FMCG (Fast-Moving Consumer Goods)',
  'Media, Entertainment & Education', 'Oil, Gas & Energy', 'Textile'
].map(sector => ({ value: sector, label: sector }));

const states = [
  'ANDHRA PRADESH', 'ASSAM', 'BIHAR', 'GUJARAT', 'HARYANA', 'HIMACHAL PRADESH',
  'JHARKHAND', 'KARNATAKA', 'KERALA', 'MADHYA PRADESH', 'MAHARASHTRA',
  'ODISHA', 'PUNJAB', 'RAJASTHAN', 'TAMIL NADU', 'TELANGANA', 'UTTAR PRADESH',
  'WEST BENGAL', 'DELHI'
].map(state => ({ value: state, label: state }));

// Sample districts for demo - in real app, this would be dynamic based on state
const districts = [
  'Ahmedabad', 'Bangalore', 'Chennai', 'Delhi', 'Hyderabad', 'Kolkata',
  'Mumbai', 'Pune', 'Jaipur', 'Lucknow', 'Bhopal', 'Chandigarh'
].map(district => ({ value: district, label: district }));

export function ProfileForm({ onSubmit }: ProfileFormProps) {
  const { state: authState } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<CandidateProfileForm>({
    resolver: zodResolver(candidateProfileSchema),
    mode: 'onChange',
    defaultValues: {
      // Pre-fill name from eKYC if available
      name: authState.demographics?.name || '',
      education: {
        qualification: '10th' as const,
        course: '',
        specialization: '',
      },
      location: {
        state: '',
        district: '',
      },
      skills: [],
      interests: [],
      preferredSectors: [],
      isRural: false,
      digitalLiteracy: 'medium' as const,
    }
  });

  const nextStep = async () => {
    const stepFields = getStepFields(currentStep);
    const isStepValid = await trigger(stepFields as Array<keyof CandidateProfileForm>);
    
    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepFields = (step: number) => {
    switch (step) {
      case 0: return ['name'];
      case 1: return ['education.qualification', 'education.course', 'education.specialization'];
      case 2: return ['location.state', 'location.district'];
      case 3: return ['skills'];
      case 4: return ['interests'];
      case 5: return ['preferredSectors'];
      default: return [];
    }
  };

  const onFormSubmit = handleSubmit((data: CandidateProfileForm) => {
    onSubmit(data as CandidateProfile);
  });

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-orange-500 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-gray-900">Let&apos;s start with your name</h2>
              <p className="text-gray-600 mt-2">What should we call you?</p>
            </div>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter your full name"
                  error={errors.name?.message}
                />
              )}
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <GraduationCap className="h-12 w-12 text-orange-500 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-gray-900">Your Education</h2>
              <p className="text-gray-600 mt-2">Tell us about your academic background</p>
            </div>
            
            <Controller
              name="education.qualification"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={qualificationOptions}
                  placeholder="Select your highest qualification"
                  error={errors.education?.qualification?.message}
                />
              )}
            />

            <Controller
              name="education.course"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Course/Stream (e.g., B.Com, Science, Arts)"
                  error={errors.education?.course?.message}
                />
              )}
            />

            <Controller
              name="education.specialization"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Specialization (e.g., Computer Science, Commerce)"
                  error={errors.education?.specialization?.message}
                />
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-gray-900">Where are you from?</h2>
              <p className="text-gray-600 mt-2">This helps us find nearby opportunities</p>
            </div>

            <Controller
              name="location.state"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={states}
                  placeholder="Select your state"
                  error={errors.location?.state?.message}
                />
              )}
            />

            <Controller
              name="location.district"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={districts}
                  placeholder="Select your district"
                  error={errors.location?.district?.message}
                />
              )}
            />

            <Controller
              name="isRural"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value ? 'true' : 'false'}
                  onChange={(value) => field.onChange(value === 'true')}
                  name="area-type"
                  options={[
                    { value: 'false', label: 'Urban/City Area', emoji: '🏙️' },
                    { value: 'true', label: 'Rural/Village Area', emoji: '🌾' },
                  ]}
                />
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Briefcase className="h-12 w-12 text-orange-500 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-gray-900">Your Skills & Expertise</h2>
              <p className="text-gray-600 mt-2">Help our AI understand your capabilities</p>
            </div>

            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <AdvancedSkillsSelector
                  selectedSkills={field.value}
                  onSkillsChange={field.onChange}
                  maxSelections={12}
                />
              )}
            />
            {errors.skills && (
              <p className="text-sm text-red-600">{errors.skills.message}</p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Heart className="h-12 w-12 text-orange-500 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-gray-900">Your Interests</h2>
              <p className="text-gray-600 mt-2">What type of work excites you?</p>
            </div>

            <Controller
              name="interests"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={[
                    { value: 'Technical Work', label: 'Technical Work' },
                    { value: 'Creative Work', label: 'Creative Work' },
                    { value: 'People Interaction', label: 'People Interaction' },
                    { value: 'Research & Analysis', label: 'Research & Analysis' },
                    { value: 'Sales & Marketing', label: 'Sales & Marketing' },
                    { value: 'Teaching & Training', label: 'Teaching & Training' },
                    { value: 'Problem Solving', label: 'Problem Solving' },
                    { value: 'Leadership', label: 'Leadership' },
                  ]}
                  selected={field.value}
                  onSelectionChange={field.onChange}
                  placeholder="Select your interests"
                  maxSelections={5}
                />
              )}
            />
            {errors.interests && (
              <p className="text-sm text-red-600">{errors.interests.message}</p>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Settings className="h-12 w-12 text-orange-500 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-gray-900">Almost Done!</h2>
              <p className="text-gray-600 mt-2">Just a few more preferences</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Preferred Sectors</h3>
              <Controller
                name="preferredSectors"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={sectors}
                    selected={field.value}
                    onSelectionChange={field.onChange}
                    placeholder="Select sectors you're interested in"
                    maxSelections={5}
                  />
                )}
              />
              {errors.preferredSectors && (
                <p className="text-sm text-red-600 mt-2">{errors.preferredSectors.message}</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">How comfortable are you with technology?</h3>
              <Controller
                name="digitalLiteracy"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    name="digital-literacy"
                    options={digitalLiteracyOptions}
                  />
                )}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Progress Bar */}
      <div className="mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    index <= currentStep
                      ? 'border-orange-400 bg-orange-500 text-white shadow-lg'
                      : 'border-white/40 text-white/60'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1 text-center text-white/80 hidden sm:block">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-orange-400 h-2 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-sm text-white/90 mt-2">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      {/* Form Content */}
      <form onSubmit={onFormSubmit} className="space-y-6">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-lg"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors font-medium shadow-lg"
            >
              Get My Recommendations 🚀
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
