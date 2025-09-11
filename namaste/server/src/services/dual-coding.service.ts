import { Coding } from 'fhir/r4';
import { whoService } from './who.service.js';
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
            const namasteCode = await databaseService.getCodeBySystemAndCode(request.system, request.code);
            
            if (!namasteCode) {
                throw new Error(`NAMASTE code ${request.code} not found in ${request.system} system`);
            }

            // For now, using mock mappings 
            const mockMappings = this.getMockMappings();
            logger.info(`Available mock mappings: ${JSON.stringify(mockMappings.map(m => ({ code: m.namasteCode, system: m.namasteSystem })))}`);
            
            const mapping = mockMappings.find(m => 
                m.namasteCode === request.code && m.namasteSystem === request.system
            );
            
            logger.info(`Looking for mapping: code=${request.code}, system=${request.system}, found=${!!mapping}`);

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
     * Mock mappings for demonstration with more accurate semantic matching
     * In production, this would be loaded from a comprehensive mapping database
     */
    private static getMockMappings() {
        return [
            {
                namasteCode: 'EC-3.9.1',
                namasteSystem: 'ayurveda' as const,
                namasteDisplay: 'ABighAtajajvaraH',
                icd11TM2Code: 'XM1G51',
                icd11TM2Display: 'Jvara (Fever in Traditional Medicine)',
                icd11BiomedicineCode: 'MG30',
                icd11BiomedicineDisplay: 'Fever, unspecified'
            },
            {
                namasteCode: 'AAE-4',
                namasteSystem: 'ayurveda' as const,
                namasteDisplay: 'AmASayagatavAtaH',
                icd11TM2Code: 'XM7G42',
                icd11TM2Display: 'Amasaya Vata (Stomach disorders in Traditional Medicine)',
                icd11BiomedicineCode: 'DA90',
                icd11BiomedicineDisplay: 'Functional dyspepsia'
            },
            {
                namasteCode: 'LAC1.3',
                namasteSystem: 'siddha' as const,
                namasteDisplay: 'Aiya Aẕal Kurutiyaẕal Nōy',
                icd11TM2Code: 'XM5S33',
                icd11TM2Display: 'Aiya Azal (Blood and circulation disorders in Siddha)',
                icd11BiomedicineCode: 'BA00',
                icd11BiomedicineDisplay: 'Circulatory system disorders'
            },
            {
                namasteCode: 'P-7',
                namasteSystem: 'unani' as const,
                namasteDisplay: 'Amrāḍ Mudiya',
                icd11TM2Code: 'XM3U15',
                icd11TM2Display: 'Bukhar (Fever conditions in Unani)',
                icd11BiomedicineCode: 'MG30',
                icd11BiomedicineDisplay: 'Fever, unspecified'
            },
            {
                namasteCode: 'AB-1.1',
                namasteSystem: 'ayurveda' as const,
                namasteDisplay: 'AnnavAhastrotogatavAtaH',
                icd11TM2Code: 'XM8A21',
                icd11TM2Display: 'Annavaha Srotasa Vata (Digestive tract disorders)',
                icd11BiomedicineCode: 'DA92',
                icd11BiomedicineDisplay: 'Digestive disorders, unspecified'
            },
            {
                namasteCode: 'SYS-2.4',
                namasteSystem: 'siddha' as const,
                namasteDisplay: 'Kapala Nōy',
                icd11TM2Code: 'XM6S44',
                icd11TM2Display: 'Kapala Noy (Head disorders in Siddha)',
                icd11BiomedicineCode: '8A80',
                icd11BiomedicineDisplay: 'Headache'
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
