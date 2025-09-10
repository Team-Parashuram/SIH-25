import { Request, Response } from 'express';
import { CodeSystem, ConceptMap, Condition, Bundle, CapabilityStatement } from 'fhir/r4';
import { FHIRCodeSystemGenerator } from '../fhir/codesystem-generator.js';
import { DualCodingService, TranslationRequest } from '../services/dual-coding.service.js';
import { ApiResponse } from '../utils/response.util.js';
import { NAMASTEService } from '../services/namaste.service.js';
import logger from '../utils/logger.js';

/**
 * FHIR Controller
 * Handles FHIR R4 compliant endpoints for terminology services
 */
export class FHIRController {

    /**
     * GET /fhir/CodeSystem/namaste-{system}
     * Get FHIR CodeSystem for NAMASTE terminology
     */
    async getCodeSystem(req: Request, res: Response) {
        try {
            const { system } = req.params;
            
            if (!NAMASTEService.isValidSystem(system)) {
                return ApiResponse.validationError(res, 'Invalid system. Must be one of: ayurveda, siddha, unani');
            }

            const codeSystem = await FHIRCodeSystemGenerator.generateNAMASTECodeSystem(system as 'ayurveda' | 'siddha' | 'unani');
            
            // Set FHIR content type
            res.setHeader('Content-Type', 'application/fhir+json; fhirVersion=4.0');
            return res.status(200).json(codeSystem);

        } catch (error) {
            logger.error(`FHIR CodeSystem error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to generate CodeSystem: ${errorMessage}`);
        }
    }

    /**
     * GET /fhir/CodeSystem
     * Get all available CodeSystems
     */
    async getAllCodeSystems(req: Request, res: Response) {
        try {
            const systems = ['ayurveda', 'siddha', 'unani'];
            const codeSystems: CodeSystem[] = [];

            for (const system of systems) {
                const codeSystem = await FHIRCodeSystemGenerator.generateNAMASTECodeSystem(system as 'ayurveda' | 'siddha' | 'unani');
                codeSystems.push(codeSystem);
            }

            const bundle: Bundle = {
                resourceType: 'Bundle',
                id: 'namaste-codesystems',
                type: 'collection',
                timestamp: new Date().toISOString(),
                total: codeSystems.length,
                entry: codeSystems.map(cs => ({
                    resource: cs,
                    fullUrl: `${req.protocol}://${req.get('host')}/fhir/CodeSystem/${cs.id}`
                }))
            };

            res.setHeader('Content-Type', 'application/fhir+json; fhirVersion=4.0');
            return res.status(200).json(bundle);

        } catch (error) {
            logger.error(`FHIR CodeSystems error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to get CodeSystems: ${errorMessage}`);
        }
    }

    /**
     * GET /fhir/ConceptMap/namaste-{system}-to-icd11
     * Get FHIR ConceptMap for NAMASTE to ICD-11 mappings
     */
    async getConceptMap(req: Request, res: Response) {
        try {
            const { system } = req.params;
            
            if (!NAMASTEService.isValidSystem(system)) {
                return ApiResponse.validationError(res, 'Invalid system. Must be one of: ayurveda, siddha, unani');
            }

            const conceptMap = await FHIRCodeSystemGenerator.generateNAMASTEToICD11ConceptMap(system as 'ayurveda' | 'siddha' | 'unani');
            
            res.setHeader('Content-Type', 'application/fhir+json; fhirVersion=4.0');
            return res.status(200).json(conceptMap);

        } catch (error) {
            logger.error(`FHIR ConceptMap error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to generate ConceptMap: ${errorMessage}`);
        }
    }

    /**
     * GET /fhir/ConceptMap
     * Get all available ConceptMaps
     */
    async getAllConceptMaps(req: Request, res: Response) {
        try {
            const systems = ['ayurveda', 'siddha', 'unani'];
            const conceptMaps: ConceptMap[] = [];

            for (const system of systems) {
                const conceptMap = await FHIRCodeSystemGenerator.generateNAMASTEToICD11ConceptMap(system as 'ayurveda' | 'siddha' | 'unani');
                conceptMaps.push(conceptMap);
            }

            const bundle: Bundle = {
                resourceType: 'Bundle',
                id: 'namaste-conceptmaps',
                type: 'collection',
                timestamp: new Date().toISOString(),
                total: conceptMaps.length,
                entry: conceptMaps.map(cm => ({
                    resource: cm,
                    fullUrl: `${req.protocol}://${req.get('host')}/fhir/ConceptMap/${cm.id}`
                }))
            };

            res.setHeader('Content-Type', 'application/fhir+json; fhirVersion=4.0');
            return res.status(200).json(bundle);

        } catch (error) {
            logger.error(`FHIR ConceptMaps error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to get ConceptMaps: ${errorMessage}`);
        }
    }

    /**
     * POST /fhir/Condition
     * Create dual-coded FHIR Condition resource
     */
    async createCondition(req: Request, res: Response) {
        try {
            const { namasteCode, system, patientId, encounterId } = req.body;

            if (!namasteCode || !system || !patientId) {
                return ApiResponse.validationError(res, 'namasteCode, system, and patientId are required');
            }

            if (!NAMASTEService.isValidSystem(system)) {
                return ApiResponse.validationError(res, 'Invalid system. Must be one of: ayurveda, siddha, unani');
            }

            // Get NAMASTE code details
            const namasteCodeDetails = await databaseService.getCodeBySystemAndCode(system, namasteCode);
            if (!namasteCodeDetails) {
                return ApiResponse.notFound(res, `NAMASTE code ${namasteCode} not found in ${system} system`);
            }

            // Translate to ICD-11
            const translation = await DualCodingService.translateNAMASTEToICD11({ code: namasteCode, system });

            // Generate dual-coded condition
            const condition = FHIRCodeSystemGenerator.generateDualCodedCondition(
                namasteCode,
                namasteCodeDetails.display,
                system,
                patientId,
                translation.targetCodes.icd11TM2?.code,
                translation.targetCodes.icd11Biomedicine?.code
            );

            res.setHeader('Content-Type', 'application/fhir+json; fhirVersion=4.0');
            res.setHeader('Location', `${req.protocol}://${req.get('host')}/fhir/Condition/${condition.id}`);
            return res.status(201).json(condition);

        } catch (error) {
            logger.error(`FHIR Condition creation error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to create Condition: ${errorMessage}`);
        }
    }

    /**
     * GET /fhir/Condition/:id
     * Get FHIR Condition by ID
     */
    async getCondition(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            // In a real implementation, this would fetch from database
            // For demo purposes, return a sample condition
            const sampleCondition: Condition = {
                resourceType: 'Condition',
                id: id,
                clinicalStatus: {
                    coding: [
                        {
                            system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                            code: 'active',
                            display: 'Active'
                        }
                    ]
                },
                code: {
                    coding: [
                        {
                            system: 'https://namaste.ayush.gov.in/CodeSystem/NAMASTE-AYURVEDA',
                            code: 'A001',
                            display: 'Jvara'
                        }
                    ],
                    text: 'Sample dual-coded condition'
                },
                subject: {
                    reference: 'Patient/sample-patient'
                },
                recordedDate: new Date().toISOString()
            };

            res.setHeader('Content-Type', 'application/fhir+json; fhirVersion=4.0');
            return res.status(200).json(sampleCondition);

        } catch (error) {
            logger.error(`FHIR Condition retrieval error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to get Condition: ${errorMessage}`);
        }
    }

    /**
     * POST /fhir/Bundle
     * Process FHIR Bundle with dual-coded conditions
     */
    async processBundle(req: Request, res: Response) {
        try {
            const bundle = req.body as Bundle;

            if (!bundle || bundle.resourceType !== 'Bundle') {
                return ApiResponse.validationError(res, 'Valid FHIR Bundle required');
            }

            // Process each entry in the bundle
            const processedEntries = bundle.entry?.map(entry => {
                // Add processing timestamp
                if (entry.resource) {
                    entry.resource.meta = {
                        ...entry.resource.meta,
                        lastUpdated: new Date().toISOString(),
                        tag: [
                            {
                                system: 'https://namaste.ayush.gov.in/tags',
                                code: 'processed',
                                display: 'Processed by NAMASTE'
                            }
                        ]
                    };
                }
                return entry;
            }) || [];

            const responseBundle: Bundle = {
                ...bundle,
                id: `processed-${bundle.id || Date.now()}`,
                timestamp: new Date().toISOString(),
                entry: processedEntries
            };

            logger.info(`Processed FHIR Bundle with ${processedEntries.length} entries`);

            res.setHeader('Content-Type', 'application/fhir+json; fhirVersion=4.0');
            return res.status(200).json(responseBundle);

        } catch (error) {
            logger.error(`FHIR Bundle processing error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to process Bundle: ${errorMessage}`);
        }
    }

    /**
     * GET /fhir/Bundle/:id
     * Get FHIR Bundle by ID
     */
    async getBundle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            // Sample bundle for demo
            const sampleBundle: Bundle = {
                resourceType: 'Bundle',
                id: id,
                type: 'collection',
                timestamp: new Date().toISOString(),
                total: 0,
                entry: []
            };

            res.setHeader('Content-Type', 'application/fhir+json; fhirVersion=4.0');
            return res.status(200).json(sampleBundle);

        } catch (error) {
            logger.error(`FHIR Bundle retrieval error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to get Bundle: ${errorMessage}`);
        }
    }

    /**
     * GET /fhir/metadata
     * Get FHIR server capability statement
     */
    async getCapabilityStatement(req: Request, res: Response) {
        try {
            const capabilityStatement: CapabilityStatement = {
                resourceType: 'CapabilityStatement',
                id: 'namaste-fhir-server',
                url: `${req.protocol}://${req.get('host')}/fhir/metadata`,
                version: '1.0.0',
                name: 'NAMASTEFHIRServer',
                title: 'NAMASTE FHIR Terminology Server',
                status: 'active',
                date: new Date().toISOString(),
                publisher: 'Ministry of AYUSH, Government of India',
                description: 'FHIR R4 compliant terminology server for NAMASTE and ICD-11 integration',
                kind: 'instance',
                software: {
                    name: 'NAMASTE FHIR Server',
                    version: '1.0.0',
                    releaseDate: new Date().toISOString()
                },
                fhirVersion: '4.0.1',
                format: ['application/fhir+json', 'application/fhir+xml'],
                rest: [
                    {
                        mode: 'server',
                        resource: [
                            {
                                type: 'CodeSystem',
                                interaction: [
                                    { code: 'read' },
                                    { code: 'search-type' }
                                ]
                            },
                            {
                                type: 'ConceptMap',
                                interaction: [
                                    { code: 'read' },
                                    { code: 'search-type' }
                                ]
                            },
                            {
                                type: 'Condition',
                                interaction: [
                                    { code: 'create' },
                                    { code: 'read' }
                                ]
                            },
                            {
                                type: 'Bundle',
                                interaction: [
                                    { code: 'create' },
                                    { code: 'read' }
                                ]
                            }
                        ]
                    }
                ]
            };

            res.setHeader('Content-Type', 'application/fhir+json; fhirVersion=4.0');
            return res.status(200).json(capabilityStatement);

        } catch (error) {
            logger.error(`FHIR Capability Statement error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to get capability statement: ${errorMessage}`);
        }
    }

    /**
     * POST /fhir/translate
     * Translate NAMASTE codes to ICD-11
     */
    async translateCode(req: Request, res: Response) {
        try {
            const request: TranslationRequest = req.body;

            if (!request.code || !request.system) {
                return ApiResponse.validationError(res, 'code and system are required');
            }

            if (!NAMASTEService.isValidSystem(request.system)) {
                return ApiResponse.validationError(res, 'Invalid system. Must be one of: ayurveda, siddha, unani');
            }

            const result = await DualCodingService.translateNAMASTEToICD11(request);
            return ApiResponse.success(res, result, 'Translation completed successfully');

        } catch (error) {
            logger.error(`Translation error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Translation failed: ${errorMessage}`);
        }
    }

    /**
     * POST /fhir/dual-code
     * Generate dual coding for clinical use
     */
    async generateDualCoding(req: Request, res: Response) {
        try {
            const { code, system } = req.body;

            if (!code || !system) {
                return ApiResponse.validationError(res, 'code and system are required');
            }

            if (!NAMASTEService.isValidSystem(system)) {
                return ApiResponse.validationError(res, 'Invalid system. Must be one of: ayurveda, siddha, unani');
            }

            const codings = await DualCodingService.generateDualCoding(code, system);
            return ApiResponse.success(res, { codings }, 'Dual coding generated successfully');

        } catch (error) {
            logger.error(`Dual coding error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Dual coding failed: ${errorMessage}`);
        }
    }
}

export const fhirController = new FHIRController();

// Fix the import issue by importing required services
import { databaseService } from '../database/service.js';
