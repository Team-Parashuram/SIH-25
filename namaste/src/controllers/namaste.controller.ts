import { Request, Response } from 'express';
import multer from 'multer';
import { namasteService, NAMASTEService } from '../services/namaste.service.js';
import { searchService } from '../services/search.service.js';
import { databaseService } from '../database/service.js';
import { ApiResponse } from '../utils/response.util.js';
import logger from '../utils/logger.js';

/**
 * Multer configuration for file uploads
 */
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        
        if (allowedTypes.includes(file.mimetype) || 
            file.originalname.match(/\.(csv|xls|xlsx)$/i)) {
            cb(null, true);
        } else {
            cb(new Error('Only CSV and Excel files are allowed'));
        }
    }
});

/**
 * NAMASTE Controller
 * Handles NAMASTE data upload and processing endpoints
 */
export class NAMASTEController {

    /**
     * POST /api/v1/namaste/upload
     * Upload and process NAMASTE CSV/Excel files
     */
    async uploadFile(req: Request, res: Response) {
        try {
            const { system } = req.body;
            const file = req.file;
            if (!system || !NAMASTEService.isValidSystem(system)) {
                return ApiResponse.validationError(res, 'Invalid or missing system parameter. Must be one of: ayurveda, siddha, unani');
            }
            if (!file) {
                return ApiResponse.validationError(res, 'No file uploaded. Please upload a CSV or Excel file.');
            }

            logger.info(`NAMASTE file upload initiated: ${file.originalname} for system: ${system}`);
            const result = await namasteService.processFile(file.buffer, file.originalname, system);

            if (result.success) {
                return ApiResponse.success(res, result.data, result.message, 201);
            } else {
                return ApiResponse.error(res, result.error || 'Processing failed', result.message, 400);
            }

        } catch (error) {
            logger.error(`NAMASTE file upload error: ${error}`);
            
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    return ApiResponse.validationError(res, 'File too large. Maximum size is 10MB.');
                }
                return ApiResponse.validationError(res, `Upload error: ${error.message}`);
            }

            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `File upload failed: ${errorMessage}`);
        }
    }

    /**
     * GET /api/v1/namaste/stats
     * Get processing statistics
     */
    async getStats(req: Request, res: Response) {
        try {
            const { system } = req.query;
            if (system && !NAMASTEService.isValidSystem(system as string)) {
                return ApiResponse.validationError(res, 'Invalid system parameter. Must be one of: ayurveda, siddha, unani');
            }

            const result = await namasteService.getProcessingStats(system as 'ayurveda' | 'siddha' | 'unani');

            if (result.success) {
                return ApiResponse.success(res, result.data, result.message);
            } else {
                return ApiResponse.error(res, result.error || 'Failed to get statistics', result.message, 500);
            }

        } catch (error) {
            logger.error(`NAMASTE stats error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Statistics retrieval failed: ${errorMessage}`);
        }
    }

    /**
     * GET /api/v1/namaste/systems
     * Get available NAMASTE systems
     */
    async getSystems(req: Request, res: Response) {
        try {
            const systems = {
                available: [
                    {
                        code: 'ayurveda',
                        name: 'Ayurveda',
                        description: 'Traditional Indian system of medicine'
                    },
                    {
                        code: 'siddha',
                        name: 'Siddha',
                        description: 'Traditional Tamil system of medicine'
                    },
                    {
                        code: 'unani',
                        name: 'Unani',
                        description: 'Traditional Persian-Arabic system of medicine'
                    }
                ],
                supportedFormats: ['CSV', 'Excel (.xls, .xlsx)'],
                maxFileSize: '10MB'
            };

            return ApiResponse.success(res, systems, 'Available NAMASTE systems retrieved successfully');

        } catch (error) {
            logger.error(`NAMASTE systems error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Systems retrieval failed: ${errorMessage}`);
        }
    }

    /**
     * GET /api/v1/namaste/codes/:system
     * Get all codes for a specific system with pagination
     */
    async getSystemCodes(req: Request, res: Response) {
        try {
            const { system } = req.params;
            const {
                page = '1',
                limit = '50',
                search,
                sortBy = 'code',
                sortOrder = 'asc'
            } = req.query;

            if (!NAMASTEService.isValidSystem(system)) {
                return ApiResponse.validationError(res, 'Invalid system. Must be one of: ayurveda, siddha, unani');
            }
            const pageNum = parseInt(page as string);
            const limitNum = parseInt(limit as string);
            
            if (isNaN(pageNum) || pageNum < 1) {
                return ApiResponse.validationError(res, 'Invalid page number');
            }
            
            if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
                return ApiResponse.validationError(res, 'Invalid limit. Must be between 1 and 100');
            }

            const result = await databaseService.getCodesBySystem(system, {
                page: pageNum,
                limit: limitNum,
                search: search as string,
                sortBy: sortBy as 'code' | 'display' | 'createdAt',
                sortOrder: sortOrder as 'asc' | 'desc'
            });

            return ApiResponse.success(res, result, `${system} codes retrieved successfully`);

        } catch (error) {
            logger.error(`Get system codes error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to retrieve codes: ${errorMessage}`);
        }
    }

    /**
     * GET /api/v1/namaste/codes/:system/:code
     * Get specific code by system and code
     */
    async getCode(req: Request, res: Response) {
        try {
            const { system, code } = req.params;
            if (!NAMASTEService.isValidSystem(system)) {
                return ApiResponse.validationError(res, 'Invalid system. Must be one of: ayurveda, siddha, unani');
            }

            if (!code || code.trim() === '') {
                return ApiResponse.validationError(res, 'Code parameter is required');
            }

            const result = await databaseService.getCodeBySystemAndCode(system, code);

            if (!result) {
                return ApiResponse.notFound(res, `Code '${code}' not found in ${system} system`);
            }

            return ApiResponse.success(res, result, `Code ${code} retrieved successfully`);

        } catch (error) {
            logger.error(`Get code error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to retrieve code: ${errorMessage}`);
        }
    }

    /**
     * GET /api/v1/namaste/search
     * Search across NAMASTE terminology
     */
    async search(req: Request, res: Response) {
        try {
            const {
                q: query,
                system,
                limit = '20',
                offset = '0'
            } = req.query;

            if (!query || typeof query !== 'string' || query.trim().length < 2) {
                return ApiResponse.validationError(res, 'Query parameter "q" is required and must be at least 2 characters');
            }
            if (system && !NAMASTEService.isValidSystem(system as string)) {
                return ApiResponse.validationError(res, 'Invalid system. Must be one of: ayurveda, siddha, unani');
            }

            const limitNum = parseInt(limit as string);
            const offsetNum = parseInt(offset as string);

            if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
                return ApiResponse.validationError(res, 'Invalid limit. Must be between 1 and 100');
            }

            if (isNaN(offsetNum) || offsetNum < 0) {
                return ApiResponse.validationError(res, 'Invalid offset. Must be 0 or greater');
            }

            const result = await searchService.searchCodes(
                query,
                system as 'ayurveda' | 'siddha' | 'unani',
                limitNum,
                offsetNum
            );

            return ApiResponse.success(res, result, `Search completed for "${query}"`);

        } catch (error) {
            logger.error(`Search error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Search failed: ${errorMessage}`);
        }
    }

    /**
     * GET /api/v1/namaste/autocomplete
     * Get autocomplete suggestions
     */
    async autocomplete(req: Request, res: Response) {
        try {
            const {
                q: prefix,
                system,
                limit = '10'
            } = req.query;

            if (!prefix || typeof prefix !== 'string' || prefix.trim().length < 1) {
                return ApiResponse.validationError(res, 'Query parameter "q" is required');
            }
            if (system && !NAMASTEService.isValidSystem(system as string)) {
                return ApiResponse.validationError(res, 'Invalid system. Must be one of: ayurveda, siddha, unani');
            }

            const limitNum = parseInt(limit as string);

            if (isNaN(limitNum) || limitNum < 1 || limitNum > 50) {
                return ApiResponse.validationError(res, 'Invalid limit. Must be between 1 and 50');
            }

            const suggestions = await searchService.autocomplete(
                prefix,
                system as 'ayurveda' | 'siddha' | 'unani',
                limitNum
            );

            return ApiResponse.success(res, { suggestions }, `Autocomplete suggestions for "${prefix}"`);

        } catch (error) {
            logger.error(`Autocomplete error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Autocomplete failed: ${errorMessage}`);
        }
    }

    /**
     * GET /api/v1/namaste/random
     * Get random sample of codes for discovery
     */
    async getRandomSample(req: Request, res: Response) {
        try {
            const {
                system,
                count = '10'
            } = req.query;
            
            if (system && !NAMASTEService.isValidSystem(system as string)) {
                return ApiResponse.validationError(res, 'Invalid system. Must be one of: ayurveda, siddha, unani');
            }

            const countNum = parseInt(count as string);

            if (isNaN(countNum) || countNum < 1 || countNum > 50) {
                return ApiResponse.validationError(res, 'Invalid count. Must be between 1 and 50');
            }

            const samples = await searchService.getRandomSample(
                countNum,
                system as 'ayurveda' | 'siddha' | 'unani'
            );

            return ApiResponse.success(res, { samples }, `Random sample retrieved from ${system || 'all systems'}`);

        } catch (error) {
            logger.error(`Random sample error: ${error}`);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return ApiResponse.internalError(res, `Failed to get random sample: ${errorMessage}`);
        }
    }
}

export const namasteController = new NAMASTEController();
export const uploadMiddleware = upload.single('file');
