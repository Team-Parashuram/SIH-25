import { NAMASTEFileParser } from '../parsers/namaste-parser.js';
import { NAMASTECode, NAMASTEUploadResponse, ParsedRecord } from '../types/namaste.types.js';
import {Apiresponse} from "../types/who.types.js";
import { databaseService } from '../database/service.js';
import logger from '../utils/logger.js';

/**
 * NAMASTE Service
 * Handles NAMASTE data processing and management
 */
export class NAMASTEService {

    /**
     * Process uploaded NAMASTE file
     */
    async processFile(
        fileBuffer: Buffer, 
        filename: string, 
        system: 'ayurveda' | 'siddha' | 'unani'
    ): Promise<Apiresponse<NAMASTEUploadResponse>> {
        try {
            logger.info(`Processing NAMASTE file: ${filename} for system: ${system}`);
            const fileType = NAMASTEFileParser.getFileType(fileBuffer, filename);
            
            if (fileType === 'unknown') {
                return {
                    success: false,
                    error: 'Unsupported file format. Please upload CSV or Excel files only.',
                    message: 'File format validation failed'
                };
            }
            let parsedRecords: ParsedRecord[] = [];
            
            if (fileType === 'csv') {
                parsedRecords = await NAMASTEFileParser.parseCSV(fileBuffer, system);
            } else if (fileType === 'excel') {
                parsedRecords = await NAMASTEFileParser.parseExcel(fileBuffer, system);
            }

            const validRecords = parsedRecords.filter(r => r.isValid);
            const invalidRecords = parsedRecords.filter(r => !r.isValid);
            const errors = invalidRecords.map(r => r.error || 'Unknown error');

            logger.info(`Parsed ${parsedRecords.length} total records`);
            logger.info(`Valid records: ${validRecords.length}`);
            logger.info(`Invalid records: ${invalidRecords.length}`);
            await this.saveNAMASTECodes(validRecords.map(r => r.data!), system);
            await databaseService.updateProcessingStats(system, parsedRecords.length, validRecords.length);

            const response: NAMASTEUploadResponse = {
                totalRecords: parsedRecords.length,
                processedRecords: parsedRecords.length,
                validRecords: validRecords.length,
                invalidRecords: invalidRecords.length,
                errors: errors.slice(0, 10), 
                system
            };

            return {
                success: true,
                data: response,
                message: `Successfully processed ${validRecords.length} out of ${parsedRecords.length} records for ${system} system`
            };

        } catch (error) {
            logger.error(`NAMASTE file processing failed: ${error}`);
            return {
                success: false,
                error: `File processing failed: ${error}`,
                message: 'Internal processing error occurred'
            };
        }
    }

        /**
     * Save NAMASTE codes to database
     */
    private async saveNAMASTECodes(codes: NAMASTECode[], system: 'ayurveda' | 'siddha' | 'unani'): Promise<void> {
        try {
            logger.info(`Saving ${codes.length} ${system} codes to database`);
            const dbCodes = codes.map(code => ({
                code: code.code,
                display: code.display,
                definition: code.definition || null,
                system: code.system,
                language: code.language,
                synonyms: code.synonyms || [],
                parent: code.parent || null,
                status: code.status
            }));

            await databaseService.saveNAMASTECodes(dbCodes);
            if (codes.length > 0) {
                logger.info('Sample saved NAMASTE code:', {
                    system: codes[0].system,
                    code: codes[0].code,
                    display: codes[0].display
                });
            }
            
        } catch (error) {
            logger.error(`Failed to save NAMASTE codes: ${error}`);
            throw error;
        }
    }

    /**
     * Get processing statistics
     */
    async getProcessingStats(system?: 'ayurveda' | 'siddha' | 'unani'): Promise<Apiresponse<any>> {
        try {
            const stats = await databaseService.getProcessingStats(system);
            const systemStats = await databaseService.getSystemStats();
            const responseData: any = {};
            
            if (system) {
                const systemStat = stats.find(s => s.system === system);
                responseData[system] = {
                    total: systemStats[system] || 0,
                    processed: systemStat?.validRecords || 0,
                    lastUpdated: systemStat?.lastUpload || null
                };
            } else {
                ['ayurveda', 'siddha', 'unani'].forEach(sys => {
                    const systemStat = stats.find(s => s.system === sys);
                    responseData[sys] = {
                        total: systemStats[sys] || 0,
                        processed: systemStat?.validRecords || 0,
                        lastUpdated: systemStat?.lastUpload || null
                    };
                });
            }

            return {
                success: true,
                data: responseData,
                message: 'Processing statistics retrieved successfully'
            };

        } catch (error) {
            logger.error(`Failed to get processing stats: ${error}`);
            return {
                success: false,
                error: `Failed to retrieve statistics: ${error}`,
                message: 'Statistics retrieval failed'
            };
        }
    }

    /**
     * Validate system parameter
     */
    static isValidSystem(system: string): system is 'ayurveda' | 'siddha' | 'unani' {
        return ['ayurveda', 'siddha', 'unani'].includes(system);
    }
}

export const namasteService = new NAMASTEService();
