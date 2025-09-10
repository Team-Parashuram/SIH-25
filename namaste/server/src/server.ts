import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { router as whoRoutes } from './routers/who.routes.js';
import { router as namasteRoutes } from './routers/namaste.routes.js';
import { router as fhirRoutes } from './routers/fhir.routes.js';
import { ApiResponse } from './utils/response.util.js';
import { HealthResponse, ApiInfoResponse } from './types/who.types.js';
import DatabaseClient from './database/client.js';
import logger from './utils/logger.js';
import morgan from 'morgan';



const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/demo', express.static('public'));
app.use(morgan('combined', {
    stream: {
        write: (message: string) => logger.http(message.trim()),
    },
}));

app.get('/health', async (req: Request, res: Response) => {
    const dbHealthy = await DatabaseClient.healthCheck();
    
    const healthData: HealthResponse = {
        status: dbHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        database: dbHealthy ? 'connected' : 'disconnected'
    };
    
    logger.info(`Health check requested - DB: ${dbHealthy ? 'healthy' : 'unhealthy'}`);
    
    if (dbHealthy) {
        return ApiResponse.success(res, healthData, 'NAMASTE WHO API Server is running!');
    } else {
        return ApiResponse.error(res, 'Database connection failed', 'Health check failed', 503);
    }
});

app.use('/api/v1/who', whoRoutes);
app.use('/api/v1/namaste', namasteRoutes);
app.use('/fhir', fhirRoutes);

app.get('/', (req: Request, res: Response) => {
    const apiInfo: ApiInfoResponse = {
        name: 'NAMASTE - FHIR Compliant WHO ICD-11 Integration API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            whoToken: '/api/v1/who/token',
            whoEntity: '/api/v1/who/entity/:entityId',
            namasteUpload: '/api/v1/namaste/upload',
            namasteStats: '/api/v1/namaste/stats',
            namasteSystems: '/api/v1/namaste/systems',
            fhirCodeSystems: '/fhir/CodeSystem',
            fhirConceptMaps: '/fhir/ConceptMap',
            fhirConditions: '/fhir/Condition',
            fhirBundles: '/fhir/Bundle',
            fhirMetadata: '/fhir/metadata',
            fhirTranslate: '/fhir/translate'
        }
    };
    logger.info('Root endpoint accessed');
    return ApiResponse.success(res, apiInfo, 'Welcome to NAMASTE API');
});

// app.use("(.*)", (req: Request, res: Response) => {
//     return ApiResponse.notFound(res, `The route ${req.method} ${req.originalUrl} does not exist`);
// });

// Initialize database connection and start server
async function startServer() {
    try {
        // Connect to database
        await DatabaseClient.connect();
        
        // Start the server
        app.listen(port, () => {
            console.log(`🚀 NAMASTE Server is running on port ${port}`);
            logger.info(`Server started on port ${port} with database connection`);
        });
        
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
