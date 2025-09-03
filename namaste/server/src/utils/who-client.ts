import axios from 'axios';
import { WHOTokenResponse } from '../types/who.types.js';
import dotenv from 'dotenv';
dotenv.config();

export class WHOApiClient {
    private clientId: string;
    private clientSecret: string;
    private tokenUrl: string;
    private apiBaseUrl: string;
    private apiVersion: string;


    constructor() {
        this.clientId = process.env.WHO_CLIENT_ID || '';
        this.clientSecret = process.env.WHO_CLIENT_SECRET || '';
        this.tokenUrl = process.env.WHO_TOKEN_URL || '';
        this.apiBaseUrl = process.env.WHO_API_BASE_URL || '';
        this.apiVersion = process.env.WHO_API_VERSION || 'v2';
    }
    

    /**
     * Get access token from WHO API
     */
    async getAccessToken(): Promise<WHOTokenResponse> {
        try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('scope', 'icdapi_access');

        const response = await axios.post<WHOTokenResponse>(this.tokenUrl, params, {
            auth: {
            username: this.clientId,
            password: this.clientSecret
            },
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data;
        } catch (error) {
        throw new Error(`Failed to get WHO access token: ${error}`);
        }
    }

    /**
     * Get WHO ICD-11 entity by ID
     */
    async getEntity(entityId: string, token: string) {
        try {
        const url = `${this.apiBaseUrl}/entity/${entityId}`;
        
        const response = await axios.get(url, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'API-Version': this.apiVersion,
            'Accept': 'application/json',
            'Accept-Language': 'en'
            }
        });
        
        return response.data;
        } catch (error) {
        throw new Error(`Failed to get entity ${entityId}: ${error}`);
        }
    }
}

export const whoApiClient = new WHOApiClient();
