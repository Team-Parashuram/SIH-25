import { whoApiClient } from '../utils/who-client.js';
import { WHOEntityResponse, WHOTokenResponse, Apiresponse } from '../types/who.types.js';

export class WHOService {
    
    /**
     * Get WHO access token
     */
    async getToken(): Promise<Apiresponse<WHOTokenResponse>> {
        try {
        const tokenData = await whoApiClient.getAccessToken();
        
        return {
            success: true,
            data: tokenData,
            message: 'Token generated successfully'
        };
        } catch (error) {
        return {
            success: false,
            error: `Failed to get token: ${error}`
        };
        }
    }

    /**
     * Get WHO ICD-11 entity by ID using provided token
     */
    async getEntityById(entityId: string, token: string): Promise<Apiresponse<WHOEntityResponse>> {
        try {
        const entity = await whoApiClient.getEntity(entityId, token);
        
        return {
            success: true,
            data: entity,
            message: `Entity ${entityId} retrieved successfully`
        };
        } catch (error) {
        return {
            success: false,
            error: `Failed to retrieve entity ${entityId}: ${error}`
        };
        }
    }
}

export const whoService = new WHOService();
