import { db } from '../database/client.js';
import type { NAMASTECode } from '@prisma/client';
import logger from '../utils/logger.js';

/**
 * Search Service for NAMASTE terminology
 */
export class SearchService {

    /**
     * Search NAMASTE codes across all systems or specific system
     */
    async searchCodes(
        query: string,
        system?: 'ayurveda' | 'siddha' | 'unani',
        limit: number = 20,
        offset: number = 0
    ): Promise<{
        results: NAMASTECode[];
        total: number;
        hasMore: boolean;
    }> {
        try {
            logger.info(`🔍 Searching for "${query}" in system: ${system || 'all'}`);

            if (!query || query.trim().length < 2) {
                return { results: [], total: 0, hasMore: false };
            }

            const searchTerm = query.trim();
            
            const whereClause: any = {
                OR: [
                    { display: { contains: searchTerm, mode: 'insensitive' } },
                    { code: { contains: searchTerm, mode: 'insensitive' } },
                    { definition: { contains: searchTerm, mode: 'insensitive' } },
                    { synonyms: { has: searchTerm } }
                ]
            };

            if (system) {
                whereClause.system = system;
            }

            const [results, total] = await Promise.all([
                db.nAMASTECode.findMany({
                    where: whereClause,
                    take: limit,
                    skip: offset,
                    orderBy: [
                        { display: 'asc' },
                        { code: 'asc' }
                    ]
                }),
                db.nAMASTECode.count({ where: whereClause })
            ]);

            const hasMore = offset + limit < total;

            logger.info(`📊 Search results: ${results.length} of ${total} total matches`);

            return {
                results,
                total,
                hasMore
            };

        } catch (error) {
            logger.error(`Search failed for query "${query}":`, error);
            throw error;
        }
    }

    /**
     * Autocomplete suggestions based on display names
     */
    async autocomplete(
        prefix: string,
        system?: 'ayurveda' | 'siddha' | 'unani',
        limit: number = 10
    ): Promise<string[]> {
        try {
            if (!prefix || prefix.trim().length < 1) {
                return [];
            }

            const searchPrefix = prefix.trim();
            logger.info(`💡 Autocomplete for "${searchPrefix}" in system: ${system || 'all'}`);

            const whereClause: any = {
                display: {
                    startsWith: searchPrefix,
                    mode: 'insensitive'
                }
            };

            if (system) {
                whereClause.system = system;
            }

            const results = await db.nAMASTECode.findMany({
                where: whereClause,
                select: {
                    display: true
                },
                take: limit,
                orderBy: { display: 'asc' },
                distinct: ['display']
            });

            const suggestions = results.map(r => r.display);
            logger.info(`📝 Generated ${suggestions.length} autocomplete suggestions`);

            return suggestions;

        } catch (error) {
            logger.error(`Autocomplete failed for prefix "${prefix}":`, error);
            throw error;
        }
    }

    /**
     * Advanced search with multiple filters
     */
    async advancedSearch(filters: {
        query?: string;
        system?: 'ayurveda' | 'siddha' | 'unani';
        hasDefinition?: boolean;
        hasSynonyms?: boolean;
        codePrefix?: string;
        limit?: number;
        offset?: number;
    }): Promise<{
        results: NAMASTECode[];
        total: number;
        hasMore: boolean;
        facets: {
            systemCounts: Record<string, number>;
        };
    }> {
        try {
            const {
                query,
                system,
                hasDefinition,
                hasSynonyms,
                codePrefix,
                limit = 20,
                offset = 0
            } = filters;

            logger.info('🔎 Advanced search with filters:', filters);

            const whereConditions: any[] = [];

            if (query && query.trim()) {
                whereConditions.push({
                    OR: [
                        { display: { contains: query.trim(), mode: 'insensitive' } },
                        { code: { contains: query.trim(), mode: 'insensitive' } },
                        { definition: { contains: query.trim(), mode: 'insensitive' } }
                    ]
                });
            }

            if (system) {
                whereConditions.push({ system });
            }
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

            if (hasSynonyms !== undefined) {
                if (hasSynonyms) {
                    whereConditions.push({
                        NOT: { synonyms: { equals: [] } }
                    });
                } else {
                    whereConditions.push({
                        synonyms: { equals: [] }
                    });
                }
            }

            if (codePrefix) {
                whereConditions.push({
                    code: { startsWith: codePrefix, mode: 'insensitive' }
                });
            }

            const whereClause = whereConditions.length > 0 ? { AND: whereConditions } : {};

            const [results, total, systemCounts] = await Promise.all([
                db.nAMASTECode.findMany({
                    where: whereClause,
                    take: limit,
                    skip: offset,
                    orderBy: [
                        { system: 'asc' },
                        { display: 'asc' }
                    ]
                }),
                db.nAMASTECode.count({ where: whereClause }),
                db.nAMASTECode.groupBy({
                    by: ['system'],
                    where: whereClause,
                    _count: { id: true }
                })
            ]);

            const facets = {
                systemCounts: systemCounts.reduce((acc, item) => {
                    acc[item.system] = item._count.id;
                    return acc;
                }, {} as Record<string, number>)
            };

            const hasMore = offset + limit < total;

            logger.info(`🎯 Advanced search results: ${results.length} of ${total} matches`);

            return {
                results,
                total,
                hasMore,
                facets
            };

        } catch (error) {
            logger.error('Advanced search failed:', error);
            throw error;
        }
    }

    /**
     * Get random sample of codes for discovery
     */
    async getRandomSample(
        count: number = 10,
        system?: 'ayurveda' | 'siddha' | 'unani'
    ): Promise<NAMASTECode[]> {
        try {
            const whereClause = system ? { system } : {};

            const totalRecords = await db.nAMASTECode.count({ where: whereClause });
            
            if (totalRecords === 0) return [];

            const randomOffset = Math.floor(Math.random() * Math.max(0, totalRecords - count));
            
            const results = await db.nAMASTECode.findMany({
                where: whereClause,
                take: count,
                skip: randomOffset,
                orderBy: { id: 'asc' }
            });

            logger.info(`🎲 Generated ${results.length} random samples from ${system || 'all systems'}`);
            return results;

        } catch (error) {
            logger.error('Failed to get random sample:', error);
            throw error;
        }
    }
}

export const searchService = new SearchService();
