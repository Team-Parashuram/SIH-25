import { CodeSystem, Coding, ConceptMap, Bundle, Condition, Patient } from 'fhir/r4';
import { databaseService } from '../database/service.js';
import logger from '../utils/logger.js';

/**
 * FHIR CodeSystem Generator
 * Generates FHIR R4 compliant CodeSystem resources from NAMASTE data
 */
export class FHIRCodeSystemGenerator {
    
    /**
     * Generate FHIR CodeSystem for NAMASTE terminology
     */
    static async generateNAMASTECodeSystem(system: 'ayurveda' | 'siddha' | 'unani'): Promise<CodeSystem> {
        logger.info(`Generating FHIR CodeSystem for ${system}`);
        
        const codes = await databaseService.getCodesBySystem(system, {
            page: 1,
            limit: 1000,
            sortBy: 'code',
            sortOrder: 'asc'
        });

        const codeSystem: CodeSystem = {
            resourceType: 'CodeSystem',
            id: `namaste-${system}`,
            url: `https://namaste.ayush.gov.in/CodeSystem/NAMASTE-${system.toUpperCase()}`,
            version: '1.0.0',
            name: `NAMASTE${system.charAt(0).toUpperCase() + system.slice(1)}`,
            title: `NAMASTE ${system.charAt(0).toUpperCase() + system.slice(1)} Terminology`,
            status: 'active',
            experimental: false,
            date: new Date().toISOString(),
            publisher: 'Ministry of AYUSH, Government of India',
            contact: [
                {
                    name: 'Ministry of AYUSH',
                    telecom: [
                        {
                            system: 'url',
                            value: 'https://ayush.gov.in'
                        }
                    ]
                }
            ],
            description: `FHIR CodeSystem for NAMASTE ${system.toUpperCase()} traditional medicine terminology codes`,
            purpose: 'Support for traditional medicine diagnosis coding and interoperability with global healthcare standards',
            copyright: '© Ministry of AYUSH, Government of India',
            caseSensitive: true,
            content: 'complete',
            count: codes.codes?.length || 0,
            concept: codes.codes?.map(code => ({
                code: code.code,
                display: code.display,
                definition: code.definition || undefined,
                designation: code.synonyms?.map((synonym: string) => ({
                    language: 'en',
                    value: synonym
                })) || undefined
            })) || []
        };

        logger.info(`Generated CodeSystem with ${codeSystem.count} concepts for ${system}`);
        return codeSystem;
    }

    /**
     * Generate FHIR ConceptMap for NAMASTE to ICD-11 mappings
     */
    static async generateNAMASTEToICD11ConceptMap(system: 'ayurveda' | 'siddha' | 'unani'): Promise<ConceptMap> {
        logger.info(`Generating ConceptMap for ${system} to ICD-11`);
        
        const conceptMap: ConceptMap = {
            resourceType: 'ConceptMap',
            id: `namaste-${system}-to-icd11`,
            url: `https://namaste.ayush.gov.in/ConceptMap/NAMASTE-${system.toUpperCase()}-to-ICD11`,
            version: '1.0.0',
            name: `NAMASTE${system.charAt(0).toUpperCase() + system.slice(1)}ToICD11`,
            title: `NAMASTE ${system.toUpperCase()} to ICD-11 Concept Map`,
            status: 'active',
            experimental: false,
            date: new Date().toISOString(),
            publisher: 'Ministry of AYUSH, Government of India',
            description: `Concept mapping from NAMASTE ${system.toUpperCase()} codes to ICD-11 Traditional Medicine Module 2 (TM2) and Biomedicine`,
            purpose: 'Enable dual coding for traditional medicine diagnoses with international standards',
            sourceUri: `https://namaste.ayush.gov.in/CodeSystem/NAMASTE-${system.toUpperCase()}`,
            targetUri: 'https://id.who.int/icd/release/11/mms',
            group: [
                {
                    source: `https://namaste.ayush.gov.in/CodeSystem/NAMASTE-${system.toUpperCase()}`,
                    target: 'https://id.who.int/icd/release/11/mms',
                    element: [
                        // Sample mapping - in real implementation, this would be populated from mapping database
                        {
                            code: 'A001',
                            display: 'Jvara (Fever)',
                            target: [
                                {
                                    code: 'MD11',
                                    display: 'Fever, unspecified',
                                    equivalence: 'equivalent',
                                    comment: 'Traditional medicine fever concept mapped to biomedical fever'
                                },
                                {
                                    code: '5A00',
                                    display: 'Jvara',
                                    equivalence: 'equal',
                                    comment: 'Direct mapping to ICD-11 TM2 concept'
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        logger.info(`Generated ConceptMap for ${system} to ICD-11`);
        return conceptMap;
    }

    /**
     * Generate FHIR Condition resource with dual coding
     */
    static generateDualCodedCondition(
        namasteCode: string,
        namasteDisplay: string,
        system: 'ayurveda' | 'siddha' | 'unani',
        patientId: string,
        icd11TM2Code?: string,
        icd11BiomedicineCode?: string
    ): Condition {
        const codings: Coding[] = [
            {
                system: `https://namaste.ayush.gov.in/CodeSystem/NAMASTE-${system.toUpperCase()}`,
                code: namasteCode,
                display: namasteDisplay
            }
        ];

        // Add ICD-11 TM2 coding if available
        if (icd11TM2Code) {
            codings.push({
                system: 'https://id.who.int/icd/release/11/mms',
                code: icd11TM2Code,
                display: `${namasteDisplay} (TM2)`
            });
        }

        // Add ICD-11 Biomedicine coding if available
        if (icd11BiomedicineCode) {
            codings.push({
                system: 'https://id.who.int/icd/release/11/mms',
                code: icd11BiomedicineCode,
                display: 'Biomedical equivalent'
            });
        }

        const condition: Condition = {
            resourceType: 'Condition',
            id: `condition-${namasteCode}-${Date.now()}`,
            clinicalStatus: {
                coding: [
                    {
                        system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                        code: 'active',
                        display: 'Active'
                    }
                ]
            },
            verificationStatus: {
                coding: [
                    {
                        system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                        code: 'confirmed',
                        display: 'Confirmed'
                    }
                ]
            },
            code: {
                coding: codings,
                text: `${namasteDisplay} — dual-coded NAMASTE + ICD-11`
            },
            subject: {
                reference: `Patient/${patientId}`
            },
            recordedDate: new Date().toISOString(),
            meta: {
                profile: ['https://namaste.ayush.gov.in/StructureDefinition/dual-coded-condition']
            }
        };

        logger.info(`Generated dual-coded Condition resource for ${namasteCode}`);
        return condition;
    }

    /**
     * Generate FHIR Bundle for encounter with dual-coded conditions
     */
    static generateEncounterBundle(
        patientId: string,
        conditions: Condition[],
        encounterId?: string
    ): Bundle {
        const bundle: Bundle = {
            resourceType: 'Bundle',
            id: `encounter-bundle-${Date.now()}`,
            type: 'collection',
            timestamp: new Date().toISOString(),
            meta: {
                profile: ['https://namaste.ayush.gov.in/StructureDefinition/ayush-encounter-bundle']
            },
            entry: conditions.map(condition => ({
                resource: condition,
                fullUrl: `urn:uuid:${condition.id}`
            }))
        };

        logger.info(`Generated encounter Bundle with ${conditions.length} conditions`);
        return bundle;
    }
}
