import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatLocation(state: string, district: string): string {
  return `${district}, ${state}`;
}

export function getQualificationLabel(qualification: string): string {
  switch (qualification) {
    case '10th': return '10th Grade';
    case '12th': return '12th Grade';
    case 'ITI': return 'ITI';
    case 'Diploma': return 'Diploma';
    case 'Graduation': return 'Graduation';
    default: return 'Education';
  }
}

export function getSectorLabel(sector: string): string {
  return sector; // Return as is, no emojis
}

export function getInternshipTypeLabel(type: string): string {
  return type; // Return as is, no emojis
}
