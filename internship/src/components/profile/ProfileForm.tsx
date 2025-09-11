'use client';

import { useState } from 'react';
import { ProfileFormData } from '../../types/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, User, Mail, Calendar, MapPin, Home, Target, Languages, Plus, X, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

const categories = [
  { value: 'SC', label: 'SC (Scheduled Caste)' },
  { value: 'ST', label: 'ST (Scheduled Tribe)' },
  { value: 'OBC', label: 'OBC (Other Backward Class)' },
  { value: 'General', label: 'General' }
];

const genders = [
  { value: 'M', label: 'पुरुष / Male', icon: '👨' },
  { value: 'F', label: 'महिला / Female', icon: '👩' },
  { value: 'T', label: 'तृतीय लिंग / Transgender', icon: '⚧️' }
];

const popularSkills = [
  'Communication', 'MS Office', 'English', 'Hindi', 'Computer Skills',
  'Data Entry', 'Customer Service', 'Sales', 'Marketing', 'Accounting',
  'Teaching', 'Content Writing', 'Social Media', 'Photography', 'Design'
];

const educationLevels = [
  { value: '10th' as const, label: 'Class 10th' },
  { value: '12th' as const, label: 'Class 12th' },
  { value: 'Diploma' as const, label: 'Diploma' },
  { value: 'Graduation' as const, label: 'Bachelor\'s Degree' },
  { value: 'PostGraduation' as const, label: 'Master\'s Degree' },
  { value: 'ITI' as const, label: 'ITI' }
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
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleAddPopularSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required / नाम आवश्यक है';
      if (!formData.email.trim()) newErrors.email = 'Email is required / ईमेल आवश्यक है';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required / जन्म तिथि आवश्यक है';
    } else if (step === 2) {
      if (!formData.address.line1.trim()) newErrors.addressLine1 = 'Address is required / पता आवश्यक है';
      if (!formData.address.state) newErrors.state = 'State is required / राज्य आवश्यक है';
      if (!formData.address.district.trim()) newErrors.district = 'District is required / जिला आवश्यक है';
      if (!formData.address.pincode.trim()) newErrors.pincode = 'PIN code is required / पिन कोड आवश्यक है';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const stepTitles = [
    { title: 'व्यक्तिगत जानकारी / Personal Information', icon: User },
    { title: 'पता विवरण / Address Details', icon: Home },
    { title: 'कौशल और रुचियां / Skills & Interests', icon: Target }
  ];

  const renderStep1 = () => (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">व्यक्तिगत जानकारी / Personal Information</h2>
        <p className="text-slate-600">कृपया अपनी व्यक्तिगत जानकारी भरें / Please fill your personal information</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            पूरा नाम / Full Name *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={`h-12 text-base ${errors.name ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'} transition-all duration-200`}
            placeholder="अपना पूरा नाम दर्ज करें / Enter your full name"
            required
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <Alert variant="destructive" className="p-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription id="name-error" className="text-sm">{errors.name}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            ईमेल पता / Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`h-12 text-base ${errors.email ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'} transition-all duration-200`}
            placeholder="आपका ईमेल / Your email address"
            required
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <Alert variant="destructive" className="p-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription id="email-error" className="text-sm">{errors.email}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            जन्म तिथि / Date of Birth *
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
            className={`h-12 text-base ${errors.dateOfBirth ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'} transition-all duration-200`}
            required
            aria-describedby={errors.dateOfBirth ? "dob-error" : undefined}
          />
          {errors.dateOfBirth && (
            <Alert variant="destructive" className="p-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription id="dob-error" className="text-sm">{errors.dateOfBirth}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            लिंग / Gender *
          </Label>
          <Select 
            value={formData.gender} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value as 'M' | 'F' | 'T' }))}
          >
            <SelectTrigger className="h-12 text-base border-slate-300 focus:border-blue-600 focus:ring-blue-200">
              <SelectValue placeholder="लिंग चुनें / Select gender" />
            </SelectTrigger>
            <SelectContent>
              {genders.map(gender => (
                <SelectItem key={gender.value} value={gender.value} className="text-base py-3">
                  <div className="flex items-center gap-2">
                    <span>{gender.icon}</span>
                    <span>{gender.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 lg:col-span-2">
          <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            श्रेणी / Category *
          </Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as 'SC' | 'ST' | 'OBC' | 'General' }))}
          >
            <SelectTrigger className="h-12 text-base border-slate-300 focus:border-blue-600 focus:ring-blue-200">
              <SelectValue placeholder="श्रेणी चुनें / Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value} className="text-base py-3">
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mb-4">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">पता विवरण / Address Details</h2>
        <p className="text-slate-600">कृपया अपना पूरा पता भरें / Please fill your complete address</p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="addressLine1" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            पता पंक्ति 1 / Address Line 1 *
          </Label>
          <Input
            id="addressLine1"
            type="text"
            value={formData.address.line1}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, line1: e.target.value }
            }))}
            className={`h-12 text-base ${errors.addressLine1 ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-200'} transition-all duration-200`}
            placeholder="मकान/फ्लैट नंबर, गली का नाम / House/Flat No., Street Name"
            required
            aria-describedby={errors.addressLine1 ? "address-error" : undefined}
          />
          {errors.addressLine1 && (
            <Alert variant="destructive" className="p-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription id="address-error" className="text-sm">{errors.addressLine1}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine2" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            पता पंक्ति 2 / Address Line 2 (वैकल्पिक / Optional)
          </Label>
          <Input
            id="addressLine2"
            type="text"
            value={formData.address.line2 || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, line2: e.target.value }
            }))}
            className="h-12 text-base border-slate-300 focus:border-orange-500 focus:ring-orange-200 transition-all duration-200"
            placeholder="क्षेत्र, स्थान चिह्न / Area, Landmark"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              राज्य / State *
            </Label>
            <Select 
              value={formData.address.state} 
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, state: value }
              }))}
            >
              <SelectTrigger className={`h-12 text-base ${errors.state ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-200'} transition-all duration-200`}>
                <SelectValue placeholder="राज्य चुनें / Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map(state => (
                  <SelectItem key={state} value={state} className="text-base py-3">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <Alert variant="destructive" className="p-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">{errors.state}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="district" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              जिला / District *
            </Label>
            <Input
              id="district"
              type="text"
              value={formData.address.district}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, district: e.target.value }
              }))}
              className={`h-12 text-base ${errors.district ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-200'} transition-all duration-200`}
              placeholder="जिला दर्ज करें / Enter district"
              required
              aria-describedby={errors.district ? "district-error" : undefined}
            />
            {errors.district && (
              <Alert variant="destructive" className="p-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription id="district-error" className="text-sm">{errors.district}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              पिन कोड / PIN Code *
            </Label>
            <Input
              id="pincode"
              type="text"
              value={formData.address.pincode}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }
              }))}
              className={`h-12 text-base ${errors.pincode ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-200'} transition-all duration-200`}
              placeholder="6-अंकीय पिन कोड / 6-digit PIN code"
              maxLength={6}
              required
              aria-describedby={errors.pincode ? "pincode-error" : undefined}
            />
            {errors.pincode && (
              <Alert variant="destructive" className="p-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription id="pincode-error" className="text-sm">{errors.pincode}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">कौशल और रुचियां / Skills & Interests</h2>
        <p className="text-slate-600">अपने कौशल और रुचियों को बताएं / Tell us about your skills and interests</p>
      </div>
      
      <div className="space-y-8">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              कौशल / Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  className="flex-1 h-11 text-base border-slate-300 focus:border-green-500 focus:ring-green-200"
                  placeholder="कौशल दर्ज करें / Enter a skill"
                />
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white h-11 px-6"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  जोड़ें / Add
                </Button>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-700">लोकप्रिय कौशल / Popular Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {popularSkills
                    .filter(skill => !formData.skills.includes(skill))
                    .map((skill) => (
                      <Button
                        key={skill}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddPopularSkill(skill)}
                        className="text-sm border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all duration-200"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {skill}
                      </Button>
                    ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-700">चयनित कौशल / Selected Skills:</p>
                <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-3 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50">
                  {formData.skills.length > 0 ? (
                    formData.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1.5 text-sm font-medium border border-green-300"
                      >
                        {skill}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 h-auto p-0 hover:bg-transparent text-green-600 hover:text-green-800"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm italic">कोई कौशल नहीं जोड़ा गया / No skills added yet</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Languages className="w-5 h-5 text-blue-600" />
              शिक्षा / Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">
                  शिक्षा स्तर / Education Level
                </Label>
                <Select 
                  value={formData.education[0]?.level || '12th'} 
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    education: [{ ...prev.education[0], level: value as "10th" | "12th" | "Diploma" | "Graduation" | "PostGraduation" | "ITI" }]
                  }))}
                >
                  <SelectTrigger className="h-11 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-200">
                    <SelectValue placeholder="शिक्षा स्तर चुनें / Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map(level => (
                      <SelectItem key={level.value} value={level.value} className="text-base py-3">
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institute" className="text-sm font-semibold text-slate-700">
                  संस्थान / Institution
                </Label>
                <Input
                  id="institute"
                  type="text"
                  value={formData.education[0]?.institute || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    education: [{ ...prev.education[0], institute: e.target.value }]
                  }))}
                  className="h-11 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                  placeholder="संस्थान का नाम / Institution name"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            प्रोफ़ाइल पूर्ण करें / Complete Your Profile
          </h1>
          <p className="text-lg text-slate-600">
            भारत सरकार इंटर्नशिप पोर्टल / Government of India Internship Portal
          </p>
        </div>

        {/* Progress Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {stepTitles.map((step, index) => {
                    const StepIcon = step.icon;
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;
                    
                    return (
                      <div key={stepNumber} className="flex items-center">
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                            isActive 
                              ? 'bg-blue-600 text-white shadow-lg scale-110' 
                              : isCompleted 
                                ? 'bg-green-600 text-white' 
                                : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        {stepNumber < 3 && (
                          <div 
                            className={`w-8 h-1 mx-2 rounded-full transition-all duration-300 ${
                              stepNumber < currentStep ? 'bg-green-600' : 'bg-slate-200'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-slate-600">चरण / Step</p>
                <p className="text-2xl font-bold text-slate-800">{currentStep} of 3</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>प्रगति / Progress</span>
                <span>{Math.round((currentStep / 3) * 100)}%</span>
              </div>
              <Progress 
                value={(currentStep / 3) * 100} 
                className="h-3 bg-slate-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step Content */}
              <div className="min-h-[600px]">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-slate-200">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="order-2 sm:order-1 h-12 px-8 text-base font-semibold border-2 border-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    वापस / Previous
                  </Button>
                ) : (
                  <div className="order-2 sm:order-1" />
                )}
                
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="order-1 sm:order-2 h-12 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    आगे / Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="order-1 sm:order-2 h-12 px-8 text-base font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-slate-400 disabled:to-slate-500 text-white shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        सहेजा जा रहा है / Saving...
                      </div>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        प्रोफ़ाइल पूर्ण करें / Complete Profile
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-8 border-blue-200 bg-blue-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  सहायता / Help
                </h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  यदि आपको इस फॉर्म को भरने में कोई समस्या आ रही है, तो कृपया हमारे हेल्पलाइन नंबर 1800-XXX-XXXX पर संपर्क करें। 
                  / If you&apos;re facing any issues filling this form, please contact our helpline at 1800-XXX-XXXX.
                </p>
                <p className="text-blue-700 text-xs mt-2">
                  सभी जानकारी सुरक्षित और गोपनीय रखी जाएगी / All information will be kept secure and confidential.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
