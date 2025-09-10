import { Response } from 'express';
import { Apiresponse } from '../types/who.types.js';

/**
 * Utility class for standardized API responses
 */
export class ApiResponse {

    static success<T>(res: Response, data: T, message?: string, statusCode: number = 200): Response {
        const response: Apiresponse<T> = {
        success: true,
        data,
        message: message || 'Operation successful',
        timestamp: new Date().toISOString()
        };
        return res.status(statusCode).json(response);
    }

    static error(res: Response, error: string, message?: string, statusCode: number = 400): Response {
        const response: Apiresponse<null> = {
        success: false,
        error,
        message: message || 'Operation failed',
        timestamp: new Date().toISOString()
        };
        return res.status(statusCode).json(response);
    }

    static validationError(res: Response, error: string): Response {
        return this.error(res, error, 'Validation failed', 400);
    }

    static unauthorized(res: Response, error: string = 'Unauthorized'): Response {
        return this.error(res, error, 'Authentication required', 401);
    }

    static notFound(res: Response, error: string = 'Resource not found'): Response {
        return this.error(res, error, 'Resource not found', 404);
    }

    static internalError(res: Response, error: string = 'Internal server error'): Response {
        return this.error(res, error, 'Internal server error occurred', 500);
    }
}
