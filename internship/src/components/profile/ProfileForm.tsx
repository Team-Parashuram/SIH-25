'use client';

import { useState } from 'react';
import { ProfileFormData } from '../../types/profile';

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
  initialData?: Partial<ProfileFormData>;
  loading?: boolean;
}

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const categories = ['SC', 'ST', 'OBC', 'General'];
const genders = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'T', label: 'Transgender' }
];

const sectors = [
  'Agriculture', 'Banking & Finance', 'Defence', 'Education', 'Environment',
  'Healthcare', 'Information Technology', 'Infrastructure', 'Manufacturing',
  'Mining', 'Public Administration', 'Railways', 'Rural Development',
  'Science & Technology', 'Social Welfare', 'Tourism', 'Transportation'
];

export default function ProfileForm({ onSubmit, initialData, loading = false }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    gender: initialData?.gender || 'M',
    category: initialData?.category || 'General',
    address: initialData?.address || {
      line1: '',
      state: '',
      district: '',
      pincode: ''
    },
    education: initialData?.education || [{
      id: '1',
      level: '12th',
      boardOrUniversity: '',
      institute: '',
      course: '',
      specialization: '',
      yearOfPassing: new Date().getFullYear(),
      marksPercent: 0
    }],
    skills: initialData?.skills || [],
    languages: initialData?.languages || ['Hindi', 'English'],
    sectorInterests: initialData?.sectorInterests || [],
    locationPreferences: initialData?.locationPreferences || []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSectorToggle = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      sectorInterests: prev.sectorInterests.includes(sector)
        ? prev.sectorInterests.filter(s => s !== sector)
        : [...prev.sectorInterests, sector]
    }));
  };

  const handleLocationToggle = (location: string) => {
    setFormData(prev => ({
      ...prev,
      locationPreferences: prev.locationPreferences.includes(location)
        ? prev.locationPreferences.filter(l => l !== location)
        : [...prev.locationPreferences, location]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-900 mb-1">Personal Information</h3>
        <p className="text-blue-800 text-sm">Please provide your basic details as per official documents</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            placeholder="Enter your full name as per official documents"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
            className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as 'M' | 'F' | 'T' }))}
            className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
          >
            {genders.map(gender => (
              <option key={gender.value} value={gender.value}>{gender.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'SC' | 'ST' | 'OBC' | 'General' }))}
            className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-900 mb-1">Address Information</h3>
        <p className="text-blue-800 text-sm">Please provide your permanent address details</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.address.line1}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, line1: e.target.value }
            }))}
            className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            placeholder="House/Flat No., Street Name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            value={formData.address.line2 || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, line2: e.target.value }
            }))}
            className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            placeholder="Area, Landmark"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.address.state}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, state: e.target.value }
              }))}
              className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              required
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              District <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.address.district}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, district: e.target.value }
              }))}
              className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              placeholder="Enter district"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.address.pincode}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }
              }))}
              className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              placeholder="6-digit PIN code"
              maxLength={6}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-900 mb-1">Skills & Preferences</h3>
        <p className="text-blue-800 text-sm">Help us match you with relevant internship opportunities</p>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Skills
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            className="flex-1 px-3 py-2.5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            placeholder="Enter a skill (e.g., Computer Programming, Data Analysis)"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors text-sm"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {formData.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-800 border border-gray-300"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="ml-1.5 text-gray-600 hover:text-red-600 font-bold text-sm"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Sector Interests
        </label>
        <p className="text-xs text-gray-600 mb-3">Select the government sectors you are interested in:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {sectors.map((sector) => (
            <label
              key={sector}
              className="flex items-center p-2.5 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition-colors text-sm"
            >
              <input
                type="checkbox"
                checked={formData.sectorInterests.includes(sector)}
                onChange={() => handleSectorToggle(sector)}
                className="mr-2.5 h-3.5 w-3.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-900">{sector}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Location Preferences
        </label>
        <p className="text-xs text-gray-600 mb-3">Select your preferred states for internships:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
          {states.map((state) => (
            <label
              key={state}
              className="flex items-center p-1.5 hover:bg-gray-50 cursor-pointer transition-colors rounded text-sm"
            >
              <input
                type="checkbox"
                checked={formData.locationPreferences.includes(state)}
                onChange={() => handleLocationToggle(state)}
                className="mr-2.5 h-3.5 w-3.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-900">{state}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Profile Completion</h2>
            <span className="text-sm text-gray-600 font-medium">Step {currentStep} of 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : ''}>Personal Info</span>
            <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : ''}>Address</span>
            <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : ''}>Skills & Preferences</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center px-4 py-2.5 bg-white text-gray-700 border-2 border-gray-300 rounded-md hover:bg-gray-50 hover:border-blue-500 font-medium transition-all duration-200 text-sm"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-all duration-200 shadow-sm text-sm"
                >
                  Next
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 shadow-sm text-sm"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Complete Profile
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Required Fields Notice */}
        <div className="max-w-3xl mx-auto">
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200">
            <span className="font-medium">Note:</span> Fields marked with <span className="text-red-500">*</span> are required. 
            All information will be kept confidential and used only for internship matching purposes.
          </div>
        </div>
      </div>
    </div>
  );
}
