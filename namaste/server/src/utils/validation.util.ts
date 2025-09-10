/**
 * Data validation utilities
 */
export class ValidationUtil {
    
    /**
     * Validate NAMASTE system parameter
     */
    static isValidNAMASTESystem(system: string): system is 'ayurveda' | 'siddha' | 'unani' {
        return ['ayurveda', 'siddha', 'unani'].includes(system);
    }

    /**
     * Validate file type
     */
    static isValidFileType(filename: string): boolean {
        return /\.(csv|xls|xlsx)$/i.test(filename);
    }

    /**
     * Validate required string field
     */
    static isValidString(value: any): value is string {
        return typeof value === 'string' && value.trim().length > 0;
    }

    /**
     * Safe string extraction with fallback
     */
    static extractString(value: any, fallback: string = ''): string {
        if (typeof value === 'string') {
            return value.trim();
        }
        if (value !== null && value !== undefined) {
            return String(value).trim();
        }
        return fallback;
    }
}
