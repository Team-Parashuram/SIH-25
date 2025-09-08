import * as XLSX from 'xlsx';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import { NAMASTECode, ParsedRecord } from '../types/namaste.types.js';
import logger from '../utils/logger.js';

/**
 * NAMASTE File Parser Utility
 * Handles CSV and Excel file parsing for NAMASTE terminology data
 */
export class NAMASTEFileParser {

    /**
     * Parse CSV buffer to NAMASTE codes
     */
    static async parseCSV(buffer: Buffer, system: 'ayurveda' | 'siddha' | 'unani'): Promise<ParsedRecord[]> {
        return new Promise((resolve, reject) => {
            const results: ParsedRecord[] = [];
            let rowNumber = 0;

            const stream = Readable.from(buffer.toString());
            
            stream
                .pipe(csvParser())
                .on('data', (row) => {
                    rowNumber++;
                    try {
                        const parsed = this.parseRow(row, system, rowNumber);
                        results.push(parsed);
                    } catch (error) {
                        logger.error(`Error parsing CSV row ${rowNumber}: ${error}`);
                        results.push({
                            isValid: false,
                            error: `Row ${rowNumber}: ${error}`,
                            rowNumber
                        });
                    }
                })
                .on('end', () => {
                    logger.info(`CSV parsing completed. Processed ${rowNumber} rows`);
                    resolve(results);
                })
                .on('error', (error) => {
                    logger.error(`CSV parsing failed: ${error}`);
                    reject(error);
                });
        });
    }

    /**
     * Parse Excel buffer to NAMASTE codes
     */
    static async parseExcel(buffer: Buffer, system: 'ayurveda' | 'siddha' | 'unani'): Promise<ParsedRecord[]> {
        try {
            const workbook = XLSX.read(buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            const results: ParsedRecord[] = [];
            const headers = jsonData[0] as string[];
            logger.info(`Excel file headers: ${JSON.stringify(headers)}`);
            logger.info(`First few rows sample:`, JSON.stringify(jsonData.slice(0, 3)));
            for (let i = 1; i < jsonData.length; i++) {
                const rowArray = jsonData[i] as any[];
                if (!rowArray || rowArray.length === 0) continue;
                const rowObject: any = {};
                headers.forEach((header, index) => {
                    rowObject[header] = rowArray[index] || '';
                });
                
                try {
                    const parsed = this.parseRow(rowObject, system, i + 1);
                    results.push(parsed);
                } catch (error) {
                    logger.error(`Error parsing Excel row ${i + 1}: ${error}`);
                    results.push({
                        isValid: false,
                        error: `Row ${i + 1}: ${error}`,
                        rowNumber: i + 1
                    });
                }
            }
            
            logger.info(`Excel parsing completed. Processed ${results.length} rows`);
            return results;
            
        } catch (error) {
            logger.error(`Excel parsing failed: ${error}`);
            throw new Error(`Excel parsing failed: ${error}`);
        }
    }

    /**
     * Parse individual row data to NAMASTE code
     */
    private static parseRow(row: any, system: 'ayurveda' | 'siddha' | 'unani', rowNumber: number): ParsedRecord {
        try {
            if (rowNumber <= 3) {
                logger.info(`Row ${rowNumber} data sample:`);
            }
            const fieldMappings = this.getSystemFieldMappings(system);

            const namasteCode: NAMASTECode = {
                id: this.extractField(row, fieldMappings.id) || `generated_${rowNumber}`,
                code: this.extractField(row, fieldMappings.code) || `${system}_${rowNumber}`,
                display: this.extractField(row, fieldMappings.display),
                definition: this.extractField(row, fieldMappings.definition),
                system,
                language: fieldMappings.language || 'en',
                synonyms: this.extractSynonyms(row, system),
                parent: undefined,
                children: [],
                status: 'active'
            };
            if (!namasteCode.display || namasteCode.display.trim() === '') {
                return {
                    isValid: false,
                    error: `Row ${rowNumber}: No display name found. Available columns: ${Object.keys(row).slice(0, 5).join(', ')}`,
                    rowNumber
                };
            }
            if (rowNumber <= 3) {
                logger.info(`Row ${rowNumber} successfully parsed: ID=${namasteCode.id}, Code=${namasteCode.code}, Display="${namasteCode.display}"`);
            }

            return {
                isValid: true,
                data: namasteCode,
                rowNumber
            };

        } catch (error) {
            return {
                isValid: false,
                error: `Parsing error: ${error}`,
                rowNumber
            };
        }
    }

    /**
     * Extract field value from NAMASTE-specific column names
     */
    private static extractField(row: any, fieldNames: string[]): string {
        for (const name of fieldNames) {
            if (row[name] !== undefined && row[name] !== null && row[name] !== '') {
                return String(row[name]).trim();
            }
        }
        return '';
    }

    /**
     * Extract synonyms based on system-specific fields
     */
    private static extractSynonyms(row: any, system: 'ayurveda' | 'siddha' | 'unani'): string[] {
        const synonyms: string[] = [];
        const fieldMappings = this.getSystemFieldMappings(system);
        for (const synonymField of fieldMappings.synonyms) {
            if (row[synonymField]) {
                const synonymValue = String(row[synonymField]).trim();
                if (synonymValue) {
                    synonyms.push(synonymValue);
                }
            }
        }
        
        return synonyms;
    }

    /**
     * Get system-specific field mappings
     */
    private static getSystemFieldMappings(system: 'ayurveda' | 'siddha' | 'unani') {
        switch (system) {
            case 'ayurveda':
                return {
                    id: ['NAMC_ID', 'Sr No.'],
                    code: ['NAMC_CODE'],
                    display: ['NAMC_term'],
                    definition: ['Long_definition', 'Short_definition'],
                    synonyms: ['NAMC_term_diacritical', 'NAMC_term_DEVANAGARI'],
                    language: 'en'
                };
            case 'siddha':
                return {
                    id: ['NAMC_ID', 'Sr No.'],
                    code: ['NAMC_CODE'],
                    display: ['NAMC_TERM'],
                    definition: ['Long_definition', 'Short_definition'],
                    synonyms: ['Tamil_term'],
                    language: 'en'
                };
            case 'unani':
                return {
                    id: ['NUMC_ID', 'Sr No.'],
                    code: ['NUMC_CODE'],
                    display: ['NUMC_TERM'],
                    definition: ['Long_definition', 'Short_definition'],
                    synonyms: ['Arabic_term'],
                    language: 'en'
                };
            default:
                throw new Error(`Unknown system: ${system}`);
        }
    }

    /**
     * Get file type from buffer
     */
    static getFileType(buffer: Buffer, filename: string): 'csv' | 'excel' | 'unknown' {
        const ext = filename.toLowerCase().split('.').pop();
        
        if (ext === 'csv') return 'csv';
        if (ext === 'xlsx' || ext === 'xls') return 'excel';
        const header = buffer.toString('utf8', 0, 100);
        if (header.includes('PK')) return 'excel';
        if (header.includes(',') && header.includes('\n')) return 'csv';
        
        return 'unknown';
    }
}
