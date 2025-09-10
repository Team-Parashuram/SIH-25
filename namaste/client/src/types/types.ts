export interface ApiResponse {
  [key: string]: any;
}

export interface ApiState {
  data: ApiResponse | null;
  loading: boolean;
  error: string | null;
}

export type MedicineSystem = 'ayurveda' | 'siddha' | 'unani';

export const API_BASE = 'http://localhost:3000';
