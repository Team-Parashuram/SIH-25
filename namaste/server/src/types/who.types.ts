export interface WHOTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

export interface WHOEntityResponse {
    "@context": string;
    "@id": string;
    parent?: string[];
    child?: string[];
    browserUrl?: string;
    title: {
        "@language": string;
        "@value": string;
    };
    synonym?: Array<{
        label: {
        "@language": string;
        "@value": string;
        };
    }>;
    definition?: {
        "@language": string;
        "@value": string;
    };
    inclusion?: Array<{
        label: {
        "@language": string;
        "@value": string;
        };
    }>;
    exclusion?: Array<{
        label: {
        "@language": string;
        "@value": string;
        };
    }>;
}

export interface Apiresponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    timestamp?: string;
}

export interface HealthResponse {
    status: 'healthy' | 'unhealthy';
    timestamp: string;
    version: string;
    environment: string;
    database?: string;
}

export interface ApiInfoResponse {
    name: string;
    version: string;
    endpoints: {
        health: string;
        whoToken: string;
        whoEntity: string;
        namasteUpload?: string;
        namasteStats?: string;
        namasteSystems?: string;
        fhirCodeSystems?: string;
        fhirConceptMaps?: string;
        fhirConditions?: string;
        fhirBundles?: string;
        fhirMetadata?: string;
        fhirTranslate?: string;
    };
}
