'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Internship } from '../../types/internship';
import { RecommendationService } from '../../services/recommendations';
import { useRouter } from 'next/navigation';

export default function AllInternshipsPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sector: '',
    location: '',
    minStipend: '',
    maxStipend: '',
    internshipType: ''
  });
  const [userName, setUserName] = useState('User');

  const recommendationService = RecommendationService.getInstance();

  const loadInternships = useCallback(async () => {
    try {
      setLoading(true);
      const filterData = {
        sector: filters.sector || undefined,
        location: filters.location || undefined,
        minStipend: filters.minStipend ? parseInt(filters.minStipend) : undefined,
        maxStipend: filters.maxStipend ? parseInt(filters.maxStipend) : undefined,
        internshipType: filters.internshipType || undefined
      };
      
      const data = await recommendationService.getAllInternships(filterData);
      setInternships(data);
    } catch (error) {
      console.error('Failed to load internships:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, recommendationService]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    // Get user name from profile or auth
    const savedProfile = localStorage.getItem('pm_internship_profile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.name) {
          setUserName(profile.name);
        }
      } catch (error) {
        console.error('Error parsing profile:', error);
      }
    } else if (user?.name) {
      setUserName(user.name);
    }

    loadInternships();
  }, [isAuthenticated, router, user, loadInternships]);

  const handleApply = (internshipId: string) => {
    alert(`Application submitted for internship ${internshipId}! You will be redirected to the PM Internship Portal.`);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      sector: '',
      location: '',
      minStipend: '',
      maxStipend: '',
      internshipType: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">PM Internship Portal</h1>
            <p className="text-sm text-gray-600">Welcome, {userName}</p>
          </div>
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading All Internships</h3>
            <p className="text-gray-600">Please wait while we fetch all available opportunities...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">PM Internship Portal</h1>
            <p className="text-sm text-gray-600">Welcome, {userName}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Recommendations
            </button>
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Available Internships</h2>
          <p className="text-gray-600">Browse through {internships.length} internship opportunities across various sectors</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Internships</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
              <select
                value={filters.sector}
                onChange={(e) => handleFilterChange('sector', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Sectors</option>
                <option value="IT and Software Development">IT & Software</option>
                <option value="Banking and financial Services">Banking & Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Manufacturing & Industrial">Manufacturing</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                placeholder="City or State"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Stipend</label>
              <input
                type="number"
                value={filters.minStipend}
                onChange={(e) => handleFilterChange('minStipend', e.target.value)}
                placeholder="₹5000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Stipend</label>
              <input
                type="number"
                value={filters.maxStipend}
                onChange={(e) => handleFilterChange('maxStipend', e.target.value)}
                placeholder="₹20000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.internshipType}
                onChange={(e) => handleFilterChange('internshipType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Corporate">Corporate</option>
                <option value="Government">Government</option>
                <option value="NGO">NGO</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={loadInternships}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                clearFilters();
                setTimeout(loadInternships, 100);
              }}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {internships.map((internship) => (
            <div key={internship.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {internship['area/field']}
                    </h3>
                    <p className="text-blue-600 font-medium">{internship.company}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {internship.no_of_opportunities} positions
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">🏢</span>
                    <span>{internship.sector}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">📍</span>
                    <span>{internship.district}, {internship['state/ut']}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">💰</span>
                    <span>₹{internship.stipend?.toLocaleString()}/month</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">⏱️</span>
                    <span>{internship.duration} • {internship.internship_type}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {internship.description}
                </p>

                {/* Requirements */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {internship.minimum_qualification}
                    </span>
                    {internship.course && internship.course !== 'Any' && (
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {internship.course}
                      </span>
                    )}
                    {internship.specialization && (
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {internship.specialization}
                      </span>
                    )}
                  </div>
                </div>

                {/* Skills */}
                {internship.preferred_skills && internship.preferred_skills.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preferred Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {internship.preferred_skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                      {internship.preferred_skills.length > 4 && (
                        <span className="text-xs text-gray-500">
                          +{internship.preferred_skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleApply(internship.id)}
                    className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => alert(`Viewing details for: ${internship['area/field']} at ${internship.company}`)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {internships.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Internships Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more opportunities.
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
