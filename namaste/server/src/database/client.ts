import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger.js';

class DatabaseClient {
    private static instance: PrismaClient;

    public static getInstance(): PrismaClient {
        if (!DatabaseClient.instance) {
            DatabaseClient.instance = new PrismaClient({
                log: ['query', 'info', 'warn', 'error'],
                errorFormat: 'minimal',
            });
            process.on('SIGINT', async () => {
                logger.info('Disconnecting from database...');
                await DatabaseClient.instance.$disconnect();
                process.exit(0);
            });

            process.on('SIGTERM', async () => {
                logger.info('Disconnecting from database...');
                await DatabaseClient.instance.$disconnect();
                process.exit(0);
            });
        }

        return DatabaseClient.instance;
    }

    public static async connect(): Promise<void> {
        try {
            const client = DatabaseClient.getInstance();
            await client.$connect();
            logger.info('✅ Connected to PostgreSQL database via Prisma Accelerate');
        } catch (error) {
            logger.error('❌ Failed to connect to database:', error);
            throw error;
        }
    }

    public static async disconnect(): Promise<void> {
        if (DatabaseClient.instance) {
            await DatabaseClient.instance.$disconnect();
            logger.info('✅ Disconnected from database');
        }
    }

    public static async healthCheck(): Promise<boolean> {
        try {
            const client = DatabaseClient.getInstance();
            await client.$queryRaw`SELECT 1`;
            return true;
        } catch (error) {
            logger.error('Database health check failed:', error);
            return false;
        }
    }
}

export const db = DatabaseClient.getInstance();
export default DatabaseClient;
