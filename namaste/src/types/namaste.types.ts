
/**
 * NAMASTE Data Interfaces
 */
export interface NAMASTECode {
    id: string;
    code: string;
    display: string;
    definition?: string;
    system: 'ayurveda' | 'siddha' | 'unani';
    language: string;
    synonyms?: string[];
    parent?: string;
    children?: string[];
    status: 'active' | 'inactive';
}

export interface NAMASTEUploadResponse {
    totalRecords: number;
    processedRecords: number;
    validRecords: number;
    invalidRecords: number;
    errors: string[];
    system: 'ayurveda' | 'siddha' | 'unani';
}

export interface FileUploadRequest {
    system: 'ayurveda' | 'siddha' | 'unani';
    file: any;
}

export interface ParsedRecord {
    isValid: boolean;
    data?: NAMASTECode;
    error?: string;
    rowNumber: number;
}
