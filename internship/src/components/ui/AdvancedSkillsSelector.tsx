'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Star, TrendingUp, Code, Users, Briefcase, Lightbulb, Palette } from 'lucide-react';

interface AdvancedSkillsSelectorProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  maxSelections?: number;
  className?: string;
}

const skillCategories = {
  'Technical Skills': {
    icon: Code,
    color: 'blue',
    skills: [
      'Programming', 'Web Development', 'Mobile App Development', 'Data Analysis', 
      'Database Management', 'Cloud Computing', 'Cybersecurity', 'AI/ML Basics',
      'Software Testing', 'DevOps', 'Blockchain', 'UI/UX Design'
    ]
  },
  'Business Skills': {
    icon: Briefcase,
    color: 'green',
    skills: [
      'Project Management', 'Business Analysis', 'Financial Analysis', 'Marketing',
      'Digital Marketing', 'Sales', 'Customer Service', 'Operations Management',
      'Strategic Planning', 'Risk Management', 'Quality Assurance', 'Supply Chain'
    ]
  },
  'Soft Skills': {
    icon: Users,
    color: 'orange',
    skills: [
      'Communication Skills', 'Leadership', 'Teamwork', 'Problem Solving',
      'Critical Thinking', 'Adaptability', 'Time Management', 'Negotiation',
      'Presentation Skills', 'Conflict Resolution', 'Emotional Intelligence', 'Mentoring'
    ]
  },
  'Creative Skills': {
    icon: Palette,
    color: 'pink',
    skills: [
      'Graphic Design', 'Content Writing', 'Video Editing', 'Photography',
      'Animation', 'Creative Writing', 'Brand Design', 'Social Media Content',
      'Illustration', 'Music Production', 'Interior Design', 'Fashion Design'
    ]
  },
  'Industry Specific': {
    icon: TrendingUp,
    color: 'orange',
    skills: [
      'Manufacturing Processes', 'Healthcare Knowledge', 'Financial Services',
      'Retail Operations', 'Agriculture Technology', 'Legal Research',
      'Education & Training', 'Tourism Management', 'Real Estate', 'Logistics'
    ]
  },
  'Emerging Skills': {
    icon: Lightbulb,
    color: 'indigo',
    skills: [
      'Data Science', 'Machine Learning', 'Digital Transformation', 'E-commerce',
      'Sustainable Practices', 'Remote Work Tools', 'Automation', 'IoT',
      'Virtual Reality', 'Cryptocurrency', 'Green Technology', 'Robotics'
    ]
  }
};

const trendingSkills = [
  'Data Analysis', 'Digital Marketing', 'AI/ML Basics', 'Cloud Computing',
  'Project Management', 'Communication Skills', 'Problem Solving', 'Data Science'
];

export function AdvancedSkillsSelector({
  selectedSkills,
  onSkillsChange,
  maxSelections = 12,
  className
}: AdvancedSkillsSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Trending');
  const [skillLevels, setSkillLevels] = useState<Record<string, string>>({});

  const toggleSkill = (skillName: string) => {
    if (selectedSkills.includes(skillName)) {
      onSkillsChange(selectedSkills.filter(skill => skill !== skillName));
      // Remove skill level when deselecting
      const newLevels = { ...skillLevels };
      delete newLevels[skillName];
      setSkillLevels(newLevels);
    } else if (selectedSkills.length < maxSelections) {
      onSkillsChange([...selectedSkills, skillName]);
      // Set default level to Intermediate
      setSkillLevels({ ...skillLevels, [skillName]: 'Intermediate' });
    }
  };

  const setSkillLevel = (skillName: string, level: string) => {
    setSkillLevels({ ...skillLevels, [skillName]: level });
  };

  const renderSkillCard = (skillName: string) => {
    const isSelected = selectedSkills.includes(skillName);
    const isDisabled = !isSelected && selectedSkills.length >= maxSelections;
    const isTrending = trendingSkills.includes(skillName);
    const skillLevel = skillLevels[skillName] || 'Intermediate';

    return (
      <div key={skillName} className="space-y-2">
        <button
          onClick={() => !isDisabled && toggleSkill(skillName)}
          disabled={isDisabled}
          className={cn(
            'w-full p-3 text-left border rounded-lg transition-all duration-200 relative',
            isSelected
              ? 'border-orange-500 bg-orange-50 text-black'
              : isDisabled
              ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
            'text-sm font-medium'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isTrending && <TrendingUp className="h-4 w-4 text-orange-500" />}
              <span className="truncate">{skillName}</span>
            </div>
            {isSelected && <Check className="h-4 w-4 text-orange-600 flex-shrink-0" />}
          </div>
          {isTrending && (
            <div className="absolute -top-1 -right-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
            </div>
          )}
        </button>

        {/* Skill Level Selector */}
        {isSelected && (
          <div className="ml-4 space-y-1">
            <div className="text-xs text-gray-600 mb-1">Your level:</div>
            <div className="flex gap-1">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSkillLevel(skillName, level)}
                  className={cn(
                    'px-2 py-1 text-xs rounded-md transition-colors',
                    skillLevel === level
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {level.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTrendingSkills = () => (
    <div className="space-y-3">
      <div className="text-center mb-4">
        <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
        <h3 className="font-semibold text-gray-900">🔥 Most In-Demand Skills</h3>
        <p className="text-sm text-gray-600">Skills that employers are actively seeking</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {trendingSkills.map(skill => renderSkillCard(skill))}
      </div>
    </div>
  );

  const renderCategorySkills = (categoryName: string) => {
    const category = skillCategories[categoryName as keyof typeof skillCategories];
    const IconComponent = category.icon;
    
    return (
      <div className="space-y-3">
        <div className="text-center mb-4">
          <IconComponent className={`h-8 w-8 text-${category.color}-500 mx-auto mb-2`} />
          <h3 className="font-semibold text-gray-900">{categoryName}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {category.skills.map(skill => renderSkillCard(skill))}
        </div>
      </div>
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          🧠 AI-Powered Skills Assessment
        </h3>
        <p className="text-sm text-gray-600">
          Select skills that match your experience • {selectedSkills.length}/{maxSelections} selected
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setActiveCategory('Trending')}
          className={cn(
            'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            activeCategory === 'Trending'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          🔥 Trending
        </button>
        {Object.keys(skillCategories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              activeCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="max-h-64 overflow-y-auto bg-gray-50 rounded-lg p-4">
        {activeCategory === 'Trending' 
          ? renderTrendingSkills()
          : renderCategorySkills(activeCategory)
        }
      </div>

      {/* Selected Skills Summary */}
      {selectedSkills.length > 0 && (
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-medium text-black mb-2">Your Selected Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs"
              >
                {skill}
                {skillLevels[skill] && (
                  <span className="text-orange-600">({skillLevels[skill].slice(0, 3)})</span>
                )}
                <button
                  onClick={() => toggleSkill(skill)}
                  className="text-orange-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ML Insight */}
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-3 border border-orange-200">
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb className="h-4 w-4 text-orange-600" />
          <span className="text-sm font-medium text-orange-900">AI Recommendation</span>
        </div>
        <p className="text-xs text-orange-800">
          Based on current job market trends, we recommend selecting a mix of technical and soft skills 
          for better matching accuracy.
        </p>
      </div>
    </div>
  );
}
