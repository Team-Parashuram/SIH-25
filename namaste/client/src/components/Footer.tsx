import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Footer: React.FC = () => {
  return (
    <Card>
      <CardContent className="text-center py-6 bg-gray-50">
        <p className="text-gray-600 mb-1">
          &copy; 2025 Ministry of AYUSH - NAMASTE FHIR Integration Demo
        </p>
        <p className="text-gray-500 text-sm">
          Built for SIH 2025 - Digital Health Innovation
        </p>
      </CardContent>
    </Card>
  );
};

export default Footer;
