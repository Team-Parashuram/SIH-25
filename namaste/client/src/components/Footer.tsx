import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Footer: React.FC = () => {
  return (
    <div className="mt-12">
      <Card className="border-2 border-gray-200 shadow-md">
        <CardContent className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Government of India</h3>
              <p className="text-blue-200">Ministry of Health and Family Welfare</p>
              <p className="text-blue-300 text-sm">Department of AYUSH</p>
            </div>
            
            <div className="border-t border-blue-700 pt-6">
              <p className="text-blue-100 mb-2">
                &copy; 2025 NAMASTE FHIR Integration System
              </p>
              <p className="text-blue-300 text-sm mb-4">
                National Ayurveda Medical Standards and Terminology Exchange
              </p>
              <p className="text-blue-400 text-xs">
                Built for SIH 2025 - Digital Health Innovation Initiative
              </p>
            </div>
            
            <div className="flex justify-center items-center mt-6 space-x-6 text-blue-300 text-sm">
              <span>🇮🇳 Digital India</span>
              <span>•</span>
              <span>🏥 Healthcare Interoperability</span>
              <span>•</span>
              <span>🌿 Traditional Medicine</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Footer;
