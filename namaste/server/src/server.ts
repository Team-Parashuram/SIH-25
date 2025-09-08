import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { router as whoRoutes } from './routers/who.routes.js';
import { ApiResponse } from './utils/response.util.js';
import { HealthResponse, ApiInfoResponse } from './types/who.types.js';
import logger from './utils/logger.js';
import morgan from 'morgan';



const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', {
    stream: {
        write: (message: string) => logger.http(message.trim()),
    },
}));

app.get('/health', (req: Request, res: Response) => {
    const healthData: HealthResponse = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    };
    logger.info('Health check requested');
    return ApiResponse.success(res, healthData, 'NAMASTE WHO API Server is running!');
});

app.use('/api/v1/who', whoRoutes);
app.get('/', (req: Request, res: Response) => {
    const apiInfo: ApiInfoResponse = {
        name: 'NAMASTE - FHIR Compliant WHO ICD-11 Integration API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            whoToken: '/api/v1/who/token',
            whoEntity: '/api/v1/who/entity/:entityId'
        }
    };
    logger.info('Root endpoint accessed');
    return ApiResponse.success(res, apiInfo, 'Welcome to NAMASTE API');
});

// app.use("(.*)", (req: Request, res: Response) => {
//     return ApiResponse.notFound(res, `The route ${req.method} ${req.originalUrl} does not exist`);
// });


app.listen(port, () => {
    console.log(`🚀 NAMASTE Server is running on port ${port}`);
});
