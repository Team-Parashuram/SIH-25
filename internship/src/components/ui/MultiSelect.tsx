'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface MultiSelectProps {
  options: { value: string; label: string; emoji?: string }[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder: string;
  maxSelections?: number;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onSelectionChange,
  placeholder,
  maxSelections = 5,
  className
}: MultiSelectProps) {
  const toggleSelection = (value: string) => {
    if (selected.includes(value)) {
      onSelectionChange(selected.filter(item => item !== value));
    } else if (selected.length < maxSelections) {
      onSelectionChange([...selected, value]);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="text-sm text-gray-600 mb-2">
        {placeholder} ({selected.length}/{maxSelections} selected)
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          const isDisabled = !isSelected && selected.length >= maxSelections;
          
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => !isDisabled && toggleSelection(option.value)}
              disabled={isDisabled}
              className={cn(
                'flex items-center justify-between p-3 text-left border rounded-lg transition-all duration-200',
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : isDisabled
                  ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                'text-sm font-medium'
              )}
            >
              <div className="flex items-center gap-2">
                {option.emoji && <span className="text-lg">{option.emoji}</span>}
                <span className="truncate">{option.label}</span>
              </div>
              {isSelected && (
                <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
