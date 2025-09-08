'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
  emoji?: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  error?: string;
}

export function Select({ options, value, onChange, placeholder, className, error }: SelectProps) {
  return (
    <div className={className}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full p-3 border rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors',
          error ? 'border-red-300' : 'border-gray-300',
          'text-base' // Better for mobile
        )}
      >
        <option value="" disabled className="text-gray-500">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.emoji ? `${option.emoji} ${option.label}` : option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={cn(
          'w-full p-3 border rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors',
          error ? 'border-red-300' : 'border-gray-300',
          'text-base', // Better for mobile
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

interface RadioGroupProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  className?: string;
}

export function RadioGroup({ options, value, onChange, name, className }: RadioGroupProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            'flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-200',
            value === option.value
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-orange-600 focus:ring-orange-500"
          />
          <div className="flex items-center gap-2">
            {option.emoji && <span className="text-lg">{option.emoji}</span>}
            <span className="font-medium text-gray-900">{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}
