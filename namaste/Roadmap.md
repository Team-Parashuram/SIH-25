
# � NAMASTE - AYUSH Digital Health Integration Roadmap

## 📋 Project Overview
NAMASTE is a FHIR R4-compliant terminology microservice that integrates India's AYUSH medical systems with global healthcare standards through WHO ICD-11 APIs, enabling dual-coding workflows for traditional and biomedical diagnoses.

## ✅ Current Implementation Status

### Completed Features
- ✅ Basic WHO API Integration
  - Token generation (`POST /api/v1/who/token`)
  - Entity lookup (`GET /api/v1/who/entity/:entityId`)

## 🔴 Critical Missing Components

### 1. NAMASTE Data Processing & FHIR Integration

**Missing Components:**
- NAMASTE CSV/Excel file parser for content files
- FHIR R4 CodeSystem generation for NAMASTE codes
- FHIR ConceptMap creation for NAMASTE ↔ ICD-11 mappings
- Database schema for storing terminology data

**Required API Endpoints:**
```
POST /api/v1/namaste/upload        # Upload NAMASTE CSV/Excel files
GET  /api/v1/fhir/CodeSystem/...   # FHIR CodeSystems for NAMASTE
GET  /api/v1/fhir/ConceptMap/...   # FHIR ConceptMaps for mappings
```

### 2. Search & Autocomplete System

**Missing Components:**
- Terminology search across NAMASTE and WHO systems
- Autocomplete functionality for clinical diagnosis entry
- Fuzzy matching algorithms

**Required API Endpoints:**
```
GET /api/v1/terminology/search         # Multi-system search
GET /api/v1/terminology/autocomplete   # Autocomplete suggestions
GET /api/v1/terminology/lookup/:code   # Code validation
```

### 3. FHIR Compliance & Clinical Integration

**Missing Components:**
- FHIR Bundle processing for clinical encounters
- Condition/ProblemList resource creation with dual coding
- FHIR server metadata and conformance endpoints

**Required API Endpoints:**
```
POST /api/v1/fhir/Bundle              # FHIR Bundle upload
GET  /api/v1/fhir/Condition           # Problem List entries
POST /api/v1/fhir/Condition           # Create problem list entry
GET  /api/v1/fhir/metadata            # FHIR server capabilities
```

### 4. Authentication & Security (ABHA Integration)

**Missing Components:**
- OAuth 2.0 implementation with ABHA tokens
- Audit trail system for compliance
- User session management
- ISO 22600 access control

**Required API Endpoints:**
```
POST /api/v1/auth/abha/login          # ABHA OAuth integration
POST /api/v1/auth/validate            # Token validation
GET  /api/v1/audit                    # Audit trail access
POST /api/v1/auth/refresh             # Token refresh
```

### 5. Data Ingestion & Synchronization

**Missing Components:**
- NAMASTE data file processing (Excel/CSV files)
- WHO terminology synchronization service
- Background job processing for large datasets
- Version tracking for terminology updates

**Required API Endpoints:**
```
POST /api/v1/data/namaste/sync        # Process NAMASTE files
POST /api/v1/data/who/sync            # Sync WHO updates
GET  /api/v1/data/sync/status         # Sync status monitoring
```

### 6. Translation & Mapping Services

**Missing Components:**
- NAMASTE → ICD-11 TM2 code translation
- Biomedicine ↔ Traditional Medicine dual coding
- Mapping validation and quality assurance

**Required API Endpoints:**
```
POST /api/v1/translate/namaste-to-icd11    # Translation service
POST /api/v1/translate/icd11-to-namaste    # Reverse translation
POST /api/v1/mapping/validate              # Mapping validation
```

## 🗄️ Database Schema Requirements

### Terminology Tables
```sql
-- NAMASTE code tables
namaste_ayurveda_codes
namaste_siddha_codes  
namaste_unani_codes

-- WHO ICD-11 tables
icd11_tm2_codes
icd11_biomedicine_codes
```

### Mapping Tables
```sql
-- FHIR resources
concept_mappings
fhir_code_systems
fhir_concept_maps
```

### Clinical Tables
```sql
-- Clinical data
fhir_bundles
conditions_problem_list
patient_encounters
```

### Security & Audit Tables
```sql
-- Security & compliance
audit_logs
user_sessions
abha_tokens
```


## 📁 Required File Structure Additions

```
src/
├── parsers/           # NAMASTE file parsers
│   ├── csv-parser.ts
│   ├── excel-parser.ts
│   └── data-validator.ts
├── fhir/             # FHIR resource generators
│   ├── codesystem-generator.ts
│   ├── conceptmap-generator.ts
│   └── bundle-processor.ts
├── mappers/          # Translation services
│   ├── namaste-icd11-mapper.ts
│   ├── translation-service.ts
│   └── mapping-validator.ts
├── auth/             # ABHA OAuth integration
│   ├── abha-oauth.ts
│   ├── token-validator.ts
│   └── session-manager.ts
├── database/         # Database models & migrations
│   ├── models/
│   ├── migrations/
│   └── seeds/
├── jobs/             # Background processing
│   ├── sync-jobs.ts
│   └── queue-manager.ts
└── validators/       # Data validation
    ├── fhir-validator.ts
    └── terminology-validator.ts
```
