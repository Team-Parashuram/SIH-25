import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatLocation(state: string, district: string): string {
  return `${district}, ${state}`;
}

export function getQualificationEmoji(qualification: string): string {
  switch (qualification) {
    case '10th': return '📚';
    case '12th': return '🎓';
    case 'ITI': return '⚙️';
    case 'Diploma': return '📋';
    case 'Graduation': return '🎓';
    default: return '📖';
  }
}

export function getSectorEmoji(sector: string): string {
  const sectorMap: Record<string, string> = {
    'IT and Software Development': '💻',
    'Banking and financial Services': '🏦',
    'Healthcare': '🏥',
    'Manufacturing & Industrial': '🏭',
    'Agriculture and allied': '🌾',
    'Automotive': '🚗',
    'Aviation & Defence': '✈️',
    'Pharmaceutical': '💊',
    'Education': '🎓',
    'Telecom': '📱',
    'Infrastructure & Construction': '🏗️',
    'FMCG (Fast-Moving Consumer Goods)': '🛒',
    'Media, Entertainment & Education': '🎬',
    'Oil, Gas & Energy': '⚡',
    'Textile': '🧵',
    'Tourism': '🌍',
    'Transportation': '🚛',
    'Retail': '🏪'
  };
  
  return sectorMap[sector] || '💼';
}

export function getInternshipTypeEmoji(type: string): string {
  if (type.includes('Corporate')) return '🏢';
  if (type.includes('Public Sector')) return '🏛️';
  if (type.includes('Short Term')) return '⏱️';
  return '💼';
}
