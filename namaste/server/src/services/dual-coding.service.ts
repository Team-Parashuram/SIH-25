import { Coding } from 'fhir/r4';
import { whoService } from '../services/who.service.js';
import { databaseService } from '../database/service.js';
import logger from '../utils/logger.js';

export interface TranslationRequest {
    code: string;
    system: 'ayurveda' | 'siddha' | 'unani';
    targetSystem?: 'icd11-tm2' | 'icd11-biomedicine' | 'both';
}

export interface TranslationResult {
    sourceCode: {
        code: string;
        display: string;
        system: string;
    };
    targetCodes: {
        icd11TM2?: {
            code: string;
            display: string;
            system: string;
        };
        icd11Biomedicine?: {
            code: string;
            display: string;
            system: string;
        };
    };
    mappingQuality: 'exact' | 'approximate' | 'unmapped';
    confidence: number; // 0-100
}

/**
 * Dual Coding Service
 * Handles translation between NAMASTE and ICD-11 codes for dual coding scenarios
 */
export class DualCodingService {

    /**
     * Translate NAMASTE code to ICD-11 equivalents
     */
    static async translateNAMASTEToICD11(request: TranslationRequest): Promise<TranslationResult> {
        logger.info(`Translating NAMASTE code ${request.code} from ${request.system}`);

        try {
            // Get NAMASTE code details
            const namasteCode = await databaseService.getCodeBySystemAndCode(request.system, request.code);
            
            if (!namasteCode) {
                throw new Error(`NAMASTE code ${request.code} not found in ${request.system} system`);
            }

            // For now, using mock mappings - in production, this would use a comprehensive mapping database
            const mockMappings = this.getMockMappings();
            const mapping = mockMappings.find(m => 
                m.namasteCode === request.code && m.namasteSystem === request.system
            );

            const result: TranslationResult = {
                sourceCode: {
                    code: namasteCode.code,
                    display: namasteCode.display,
                    system: `https://namaste.ayush.gov.in/CodeSystem/NAMASTE-${request.system.toUpperCase()}`
                },
                targetCodes: {},
                mappingQuality: mapping ? 'approximate' : 'unmapped',
                confidence: mapping ? 75 : 0
            };

            if (mapping) {
                if (mapping.icd11TM2Code && (request.targetSystem === 'icd11-tm2' || request.targetSystem === 'both' || !request.targetSystem)) {
                    result.targetCodes.icd11TM2 = {
                        code: mapping.icd11TM2Code,
                        display: mapping.icd11TM2Display,
                        system: 'https://id.who.int/icd/release/11/mms'
                    };
                }

                if (mapping.icd11BiomedicineCode && (request.targetSystem === 'icd11-biomedicine' || request.targetSystem === 'both' || !request.targetSystem)) {
                    result.targetCodes.icd11Biomedicine = {
                        code: mapping.icd11BiomedicineCode,
                        display: mapping.icd11BiomedicineDisplay,
                        system: 'https://id.who.int/icd/release/11/mms'
                    };
                }
            }

            logger.info(`Translation completed for ${request.code} with quality: ${result.mappingQuality}`);
            return result;

        } catch (error) {
            logger.error(`Translation failed for ${request.code}: ${error}`);
            throw error;
        }
    }

    /**
     * Generate dual coding for clinical use
     */
    static async generateDualCoding(
        namasteCode: string,
        system: 'ayurveda' | 'siddha' | 'unani'
    ): Promise<Coding[]> {
        const translation = await this.translateNAMASTEToICD11({ code: namasteCode, system });
        
        const codings: Coding[] = [
            {
                system: translation.sourceCode.system,
                code: translation.sourceCode.code,
                display: translation.sourceCode.display
            }
        ];

        if (translation.targetCodes.icd11TM2) {
            codings.push({
                system: translation.targetCodes.icd11TM2.system,
                code: translation.targetCodes.icd11TM2.code,
                display: translation.targetCodes.icd11TM2.display
            });
        }

        if (translation.targetCodes.icd11Biomedicine) {
            codings.push({
                system: translation.targetCodes.icd11Biomedicine.system,
                code: translation.targetCodes.icd11Biomedicine.code,
                display: translation.targetCodes.icd11Biomedicine.display
            });
        }

        return codings;
    }

    /**
     * Validate mapping quality
     */
    static validateMapping(translation: TranslationResult): {
        isValid: boolean;
        warnings: string[];
        recommendations: string[];
    } {
        const warnings: string[] = [];
        const recommendations: string[] = [];

        if (translation.mappingQuality === 'unmapped') {
            warnings.push('No ICD-11 mapping found for this NAMASTE code');
            recommendations.push('Consider manual mapping or clinical review');
        }

        if (translation.confidence < 50) {
            warnings.push('Low confidence mapping detected');
            recommendations.push('Clinical validation recommended');
        }

        if (!translation.targetCodes.icd11TM2 && !translation.targetCodes.icd11Biomedicine) {
            warnings.push('No target codes available');
            recommendations.push('Manual coding required');
        }

        return {
            isValid: warnings.length === 0,
            warnings,
            recommendations
        };
    }

    /**
     * Mock mappings for demonstration
     * In production, this would be loaded from a comprehensive mapping database
     */
    private static getMockMappings() {
        return [
            {
                namasteCode: 'A001',
                namasteSystem: 'ayurveda' as const,
                namasteDisplay: 'Jvara',
                icd11TM2Code: '5A00',
                icd11TM2Display: 'Jvara (Traditional Medicine)',
                icd11BiomedicineCode: 'MD11',
                icd11BiomedicineDisplay: 'Fever, unspecified'
            },
            {
                namasteCode: 'A002',
                namasteSystem: 'ayurveda' as const,
                namasteDisplay: 'Kasa',
                icd11TM2Code: '5A10',
                icd11TM2Display: 'Kasa (Traditional Medicine)',
                icd11BiomedicineCode: 'MD12',
                icd11BiomedicineDisplay: 'Cough'
            },
            {
                namasteCode: 'S001',
                namasteSystem: 'siddha' as const,
                namasteDisplay: 'Kaaithu Noi',
                icd11TM2Code: '5S00',
                icd11TM2Display: 'Kaaithu Noi (Siddha)',
                icd11BiomedicineCode: 'MD20',
                icd11BiomedicineDisplay: 'Respiratory disease, unspecified'
            },
            {
                namasteCode: 'U001',
                namasteSystem: 'unani' as const,
                namasteDisplay: 'Bukhar',
                icd11TM2Code: '5U00',
                icd11TM2Display: 'Bukhar (Unani)',
                icd11BiomedicineCode: 'MD11',
                icd11BiomedicineDisplay: 'Fever, unspecified'
            }
        ];
    }

    /**
     * Batch translation for multiple codes
     */
    static async batchTranslate(requests: TranslationRequest[]): Promise<TranslationResult[]> {
        logger.info(`Batch translating ${requests.length} codes`);
        
        const results: TranslationResult[] = [];
        
        for (const request of requests) {
            try {
                const result = await this.translateNAMASTEToICD11(request);
                results.push(result);
            } catch (error) {
                logger.warn(`Failed to translate ${request.code}: ${error}`);
                // Add failed translation result
                results.push({
                    sourceCode: {
                        code: request.code,
                        display: 'Unknown',
                        system: `https://namaste.ayush.gov.in/CodeSystem/NAMASTE-${request.system.toUpperCase()}`
                    },
                    targetCodes: {},
                    mappingQuality: 'unmapped',
                    confidence: 0
                });
            }
        }

        logger.info(`Batch translation completed: ${results.length} results`);
        return results;
    }
}
