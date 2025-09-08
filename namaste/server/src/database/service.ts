import { db } from './client.js';
import { NAMASTECode, ProcessingStats, WHOCode } from '../generated/prisma/index.js';
import logger from '../utils/logger.js';

/**
 * Database Service for NAMASTE operations
 */
export class DatabaseService {

    /**
     * Save NAMASTE codes to database using optimized batch upserts with production safeguards
     */
    async saveNAMASTECodes(codes: Omit<NAMASTECode, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<number> {
        try {
            logger.info(`🚀 Starting save operation for ${codes.length} NAMASTE codes`);

            if (codes.length === 0) {
                logger.warn('No codes provided for save operation');
                return 0;
            }
            const systems = [...new Set(codes.map(code => code.system))];
            if (systems.length > 1) {
                throw new Error(`Mixed systems detected: ${systems.join(', ')}. All codes must belong to the same system.`);
            }

            const system = codes[0].system;
            let processedCount = 0;
            let createdCount = 0;
            let updatedCount = 0;

            if (!['ayurveda', 'siddha', 'unani'].includes(system)) {
                throw new Error(`Invalid system: ${system}. Must be one of: ayurveda, siddha, unani`);
            }

            const BATCH_SIZE = 150;
            const totalBatches = Math.ceil(codes.length / BATCH_SIZE);
            
            logger.info(`📦 Processing ${codes.length} ${system} codes in ${totalBatches} batches of ${BATCH_SIZE}`);

            for (let i = 0; i < codes.length; i += BATCH_SIZE) {
                const batch = codes.slice(i, i + BATCH_SIZE);
                const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
                
                try {
                    const batchResults = await db.$transaction(async (tx) => {
                        const upsertPromises = batch.map(async (code) => {
                            if (!code.code || !code.display) {
                                throw new Error(`Invalid code data: missing code or display for ${JSON.stringify(code)}`);
                            }
                            const existing = await tx.nAMASTECode.findUnique({
                                where: {
                                    system_code: {
                                        system: code.system,
                                        code: code.code
                                    }
                                }
                            });

                            const result = await tx.nAMASTECode.upsert({
                                where: {
                                    system_code: {
                                        system: code.system,
                                        code: code.code
                                    }
                                },
                                update: {
                                    display: code.display,
                                    definition: code.definition,
                                    synonyms: code.synonyms || [],
                                    language: code.language,
                                    parent: code.parent,
                                    status: code.status
                                },
                                create: {
                                    ...code,
                                    synonyms: code.synonyms || []
                                }
                            });

                            return { isNew: !existing, record: result };
                        });
                        
                        return await Promise.all(upsertPromises);
                    }, {
                        maxWait: 30000,
                        timeout: 60000,
                    });
                    const batchCreated = batchResults.filter(r => r.isNew).length;
                    const batchUpdated = batchResults.filter(r => !r.isNew).length;
                    
                    createdCount += batchCreated;
                    updatedCount += batchUpdated;
                    processedCount += batch.length;
                    
                    logger.info(`✅ Batch ${batchNumber}/${totalBatches}: ${batchCreated} created, ${batchUpdated} updated - Progress: ${processedCount}/${codes.length}`);
                    
                } catch (batchError) {
                    logger.error(`❌ Failed to process batch ${batchNumber}/${totalBatches}:`, batchError);
                    throw new Error(`Batch ${batchNumber} failed: ${batchError}`);
                }
            }

            logger.info(`🎉 Successfully processed ${processedCount} ${system} NAMASTE codes:`);
            logger.info(`   📝 Created: ${createdCount} new records`);
            logger.info(`   🔄 Updated: ${updatedCount} existing records`);
            
            return processedCount;

        } catch (error) {
            logger.error('💥 Failed to save NAMASTE codes:', error);
            throw error;
        }
    }

    /**
     * Update processing statistics
     */
    async updateProcessingStats(
        system: string,
        totalRecords: number,
        validRecords: number
    ): Promise<ProcessingStats> {
        try {
            const stats = await db.processingStats.upsert({
                where: { system },
                update: {
                    totalRecords,
                    validRecords,
                    lastUpload: new Date()
                },
                create: {
                    system,
                    totalRecords,
                    validRecords,
                    lastUpload: new Date()
                }
            });

            logger.info(`✅ Updated processing stats for ${system}: ${validRecords}/${totalRecords} valid`);
            return stats;

        } catch (error) {
            logger.error(`Failed to update processing stats for ${system}:`, error);
            throw error;
        }
    }

    /**
     * Get processing statistics
     */
    async getProcessingStats(system?: string): Promise<ProcessingStats[]> {
        try {
            if (system) {
                const stats = await db.processingStats.findUnique({
                    where: { system }
                });
                return stats ? [stats] : [];
            }

            return await db.processingStats.findMany({
                orderBy: { system: 'asc' }
            });

        } catch (error) {
            logger.error('Failed to get processing stats:', error);
            throw error;
        }
    }

    /**
     * Search NAMASTE codes
     */
    async searchNAMASTECodes(
        query: string,
        system?: string,
        limit: number = 20
    ): Promise<NAMASTECode[]> {
        try {
            const whereClause: any = {
                OR: [
                    { display: { contains: query, mode: 'insensitive' } },
                    { code: { contains: query, mode: 'insensitive' } },
                    { definition: { contains: query, mode: 'insensitive' } }
                ]
            };

            if (system) {
                whereClause.system = system;
            }

            return await db.nAMASTECode.findMany({
                where: whereClause,
                take: limit,
                orderBy: { display: 'asc' }
            });

        } catch (error) {
            logger.error('Failed to search NAMASTE codes:', error);
            throw error;
        }
    }

    /**
     * Get NAMASTE code by system and code
     */
    async getNAMASTECode(system: string, code: string): Promise<NAMASTECode | null> {
        try {
            return await db.nAMASTECode.findUnique({
                where: {
                    system_code: { system, code }
                }
            });
        } catch (error) {
            logger.error(`Failed to get NAMASTE code ${system}:${code}:`, error);
            throw error;
        }
    }

    /**
     * Get all codes for a system
     */
    async getSystemCodes(system: string, skip: number = 0, take: number = 100): Promise<NAMASTECode[]> {
        try {
            return await db.nAMASTECode.findMany({
                where: { system },
                skip,
                take,
                orderBy: { code: 'asc' }
            });
        } catch (error) {
            logger.error(`Failed to get codes for system ${system}:`, error);
            throw error;
        }
    }

    /**
     * Get system statistics
     */
    async getSystemStats() {
        try {
            const stats = await db.nAMASTECode.groupBy({
                by: ['system'],
                _count: {
                    id: true
                }
            });

            return stats.reduce((acc, stat) => {
                acc[stat.system] = stat._count.id;
                return acc;
            }, {} as Record<string, number>);

        } catch (error) {
            logger.error('Failed to get system stats:', error);
            throw error;
        }
    }

    /**
     * Verify data integrity for a system
     */
    async verifySystemIntegrity(system: string): Promise<{
        totalRecords: number;
        uniqueCodes: number;
        duplicateCodes: number;
        missingDisplay: number;
        validRecords: number;
        issues: string[];
    }> {
        try {
            logger.info(`🔍 Verifying data integrity for system: ${system}`);

            const [
                totalRecords,
                uniqueCodes,
                missingDisplay,
                duplicateCodes
            ] = await Promise.all([
                // Total records
                db.nAMASTECode.count({ where: { system } }),
                
                // Unique codes count
                db.nAMASTECode.groupBy({
                    by: ['code'],
                    where: { system },
                    _count: { id: true }
                }).then(groups => groups.length),
                
                // Missing display names
                db.nAMASTECode.count({
                    where: { 
                        system,
                        display: ''
                    }
                }),
                
                // Duplicate codes
                db.nAMASTECode.groupBy({
                    by: ['code'],
                    where: { system },
                    _count: { id: true },
                    having: {
                        id: { _count: { gt: 1 } }
                    }
                }).then(groups => groups.length)
            ]);

            const validRecords = totalRecords - missingDisplay;
            const issues: string[] = [];

            if (duplicateCodes > 0) {
                issues.push(`${duplicateCodes} duplicate codes found`);
            }
            if (missingDisplay > 0) {
                issues.push(`${missingDisplay} records missing display names`);
            }
            if (totalRecords === 0) {
                issues.push('No records found for this system');
            }

            const integrity = {
                totalRecords,
                uniqueCodes,
                duplicateCodes,
                missingDisplay,
                validRecords,
                issues
            };

            logger.info(`📊 Integrity check for ${system}:`, integrity);
            return integrity;

        } catch (error) {
            logger.error(`Failed to verify integrity for ${system}:`, error);
            throw error;
        }
    }

    /**
     * Get detailed system statistics
     */
    async getDetailedSystemStats(): Promise<Record<string, any>> {
        try {
            const systems = ['ayurveda', 'siddha', 'unani'];
            const stats: Record<string, any> = {};

            for (const system of systems) {
                const [recordCount, integrity, processingStats] = await Promise.all([
                    db.nAMASTECode.count({ where: { system } }),
                    this.verifySystemIntegrity(system),
                    this.getProcessingStats(system)
                ]);

                stats[system] = {
                    recordCount,
                    integrity,
                    processingStats: processingStats[0] || null,
                    lastVerified: new Date().toISOString()
                };
            }

            return stats;

        } catch (error) {
            logger.error('Failed to get detailed system stats:', error);
            throw error;
        }
    }

    /**
     * Get codes by system with pagination
     */
    async getCodesBySystem(
        system: string,
        options: {
            page?: number;
            limit?: number;
            search?: string;
            sortBy?: 'code' | 'display' | 'createdAt';
            sortOrder?: 'asc' | 'desc';
        } = {}
    ): Promise<{
        codes: NAMASTECode[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }> {
        try {
            const {
                page = 1,
                limit = 50,
                search,
                sortBy = 'code',
                sortOrder = 'asc'
            } = options;

            const skip = (page - 1) * limit;

            // Build where clause
            const whereClause: any = { system };
            
            if (search && search.trim()) {
                whereClause.OR = [
                    { display: { contains: search.trim(), mode: 'insensitive' } },
                    { code: { contains: search.trim(), mode: 'insensitive' } },
                    { definition: { contains: search.trim(), mode: 'insensitive' } }
                ];
            }

            // Get codes and total count in parallel
            const [codes, total] = await Promise.all([
                db.nAMASTECode.findMany({
                    where: whereClause,
                    skip,
                    take: limit,
                    orderBy: { [sortBy]: sortOrder }
                }),
                db.nAMASTECode.count({ where: whereClause })
            ]);

            const totalPages = Math.ceil(total / limit);

            return {
                codes,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrevious: page > 1
                }
            };

        } catch (error) {
            logger.error(`Failed to get codes for system ${system}:`, error);
            throw error;
        }
    }

    /**
     * Get specific code by system and code
     */
    async getCodeBySystemAndCode(system: string, code: string): Promise<NAMASTECode | null> {
        try {
            return await db.nAMASTECode.findUnique({
                where: {
                    system_code: { system, code }
                }
            });
        } catch (error) {
            logger.error(`Failed to get code ${system}:${code}:`, error);
            throw error;
        }
    }

    /**
     * Get codes by multiple filters
     */
    async getFilteredCodes(filters: {
        systems?: string[];
        hasDefinition?: boolean;
        hasSynonyms?: boolean;
        codePrefix?: string;
        limit?: number;
    }): Promise<NAMASTECode[]> {
        try {
            const {
                systems,
                hasDefinition,
                hasSynonyms,
                codePrefix,
                limit = 100
            } = filters;

            const whereConditions: any[] = [];

            // System filter
            if (systems && systems.length > 0) {
                whereConditions.push({ system: { in: systems } });
            }

            // Definition filter
            if (hasDefinition !== undefined) {
                if (hasDefinition) {
                    whereConditions.push({
                        AND: [
                            { definition: { not: null } },
                            { definition: { not: '' } }
                        ]
                    });
                } else {
                    whereConditions.push({
                        OR: [
                            { definition: null },
                            { definition: '' }
                        ]
                    });
                }
            }

            // Synonyms filter
            if (hasSynonyms !== undefined) {
                if (hasSynonyms) {
                    whereConditions.push({
                        synonyms: { not: { equals: [] } }
                    });
                } else {
                    whereConditions.push({
                        synonyms: { equals: [] }
                    });
                }
            }

            // Code prefix filter
            if (codePrefix) {
                whereConditions.push({
                    code: { startsWith: codePrefix, mode: 'insensitive' }
                });
            }

            const whereClause = whereConditions.length > 0 ? { AND: whereConditions } : {};

            return await db.nAMASTECode.findMany({
                where: whereClause,
                take: limit,
                orderBy: [
                    { system: 'asc' },
                    { code: 'asc' }
                ]
            });

        } catch (error) {
            logger.error('Failed to get filtered codes:', error);
            throw error;
        }
    }
}

export const databaseService = new DatabaseService();
