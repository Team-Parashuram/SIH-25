import { Request, Response } from 'express';
import { whoService } from '../services/who.service.js';
import { ApiResponse } from '../utils/response.util.js';
import logger from '../utils/logger.js';

export class WHOController {
    /**
     * POST /api/v1/who/token
     * Get WHO API access token
     */
    async getToken(req: Request, res: Response) {
        try {
            // logger.info("Token request received");
            const result = await whoService.getToken();
            
            if (result.success) {
                logger.info("Token generated successfully");
                return ApiResponse.success(res, result.data, result.message);
            } else {
                logger.warn(`Token generation failed: ${result.error}`);
                return ApiResponse.unauthorized(res, result.error || 'Failed to generate token');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`Token generation failed with error: ${errorMessage}`);
            return ApiResponse.internalError(res, `Token generation failed: ${errorMessage}`);
        }
    }

    /**
     * GET /api/v1/who/entity/:entityId
     * Get WHO ICD-11 entity by ID
     */
    async getEntity(req: Request, res: Response) {
        try {
            const { entityId } = req.params;
            // logger.info(`Fetching entity: ${entityId}`);
            const authHeader = req.headers.authorization;
            
            if (!entityId) {
                logger.warn("Missing entity id");
                return ApiResponse.validationError(res, 'Entity ID is required');
            }

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                logger.warn("Missing Authorization header");
                return ApiResponse.unauthorized(res, 'Authorization header with Bearer token is required');
            }

            const token = authHeader.substring(7);
            
            const result = await whoService.getEntityById(entityId, token);
            
            if (result.success) {
                logger.info(`Entity ${entityId} fetched successfully`);
                return ApiResponse.success(res, result.data, result.message);
            } else {
                logger.warn(`Entity ${entityId} not found`);
                return ApiResponse.notFound(res, result.error || 'Entity not found');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`Entity retrieval failed : ${errorMessage}`);
            return ApiResponse.internalError(res, `Entity retrieval failed: ${errorMessage}`);
        }
    }
}

export const whoController = new WHOController();
