## Slide 1: Impacts and Benefits

- Impacts
  - Efficiency: Automates dual coding (NAMASTE ↔ ICD-11 TM2) and standardizes terminology via FHIR R4 resources, removing fragmented, manual workflows.
  - Data-Driven Decisions: Produces structured, interoperable data enabling real-time AYUSH morbidity analytics and evidence-based policy.
  - Scalability: Microservice design supports 4,500+ NAMASTE terms, 529 TM2 categories, 196 pattern codes across Ayurveda, Siddha, and Unani; integrates with FHIR-compliant EMRs.
- Economic Benefits
  - Insurance Coverage: ICD-11-compliant outputs enable claim processing for AYUSH treatments.
  - Cost Reduction: Integrated records reduce duplicate treatments and improve care coordination.
  - Market Alignment: Positions AYUSH within India’s ₹74,000+ crore digital health market and ABDM ecosystem.
- Social Benefits
  - Healthcare Equity: Brings traditional medicine into standards-based digital health, benefiting practitioners and patients.
  - Patient Continuity: 42.5 crore ABHA account holders gain portability between traditional and modern care.
  - Global Recognition: WHO ICD-11 TM2 integration elevates traditional medicine within international systems.
- Environmental Benefits
  - Paperless Records: Supports transition from paper-based to digital documentation; reduces waste via interoperable data and fewer duplicates.
- Tech stacks used (text only)
  - FHIR R4; WHO ICD-11 API; ABHA OAuth 2.0; Backend (Node.js/Java/Python); FHIR libraries (e.g., HAPI FHIR); Database (PostgreSQL/MongoDB)


## Slide 2: Technical Approach

- Stepwise Workflow
  - Login & Access: ABHA OAuth 2.0-based secure access; consent-driven; role-based practitioner/EMR/vendor access.
  - Data Handling: Ingest official NAMASTE CSV; validate, store, and index; maintain versioning and audit trail.
  - Translation & Mapping: Real-time NAMASTE → ICD-11 TM2 and biomedicine lookup with evidence-based mapping and manual verification loop.
  - FHIR Resource Generation: Create CodeSystem, ValueSet, and ConceptMap; generate Condition and Problem List Bundles for EMR consumption.
  - Collaboration & Governance: Integration-first APIs for EMR vendors; consent metadata and audit compliance per India EHR Standards 2016.
  - Export & Integration: REST APIs for auto-complete, translation, and FHIR export; optional real-time WHO ICD-11 synchronization.
- Tech Stack Highlights
  - Backend: Node.js/Java/Python microservice; REST APIs
  - FHIR: R4 (CodeSystem, ConceptMap, ValueSet, Bundle)
  - Libraries: HAPI FHIR (or equivalent)
  - Data: PostgreSQL/MongoDB for terms and mappings
  - Auth: OAuth 2.0 (ABHA) with secure token management


## Slide 3: Technical Feasibility, Dependencies, Viability

- Technical Feasibility
  - Mature Standards & APIs: NAMASTE data available; WHO ICD-11 API operational; FHIR R4 specifications well-documented.
  - Prototype Within SIH Timeline: MVP includes ingestion, auto-complete, translation, and FHIR resource generation with demo UI.
  - Performance Target: Sub-200ms terminology lookup/translation; proper validation and error handling.
- Dependencies
  - Integrations: WHO ICD-11 (TM2 and biomedicine); ABHA OAuth endpoints; official NAMASTE datasets.
  - Data Quality & Mapping: Evidence-based NAMASTE↔TM2 mapping with manual verification; version tracking and audit.
  - Privacy & Regulation: Consent-driven access; India EHR Standards 2016 alignment; secure OAuth 2.0 flows.
- Viability
  - Competitive Edge: First FHIR-native bridge automating dual coding between NAMASTE and ICD-11 TM2; ABHA-native design; real-time sync capability.
  - Market Demand: EMR vendors need FHIR-compliant terminology services; direct fit with ABDM/National Digital Health Mission.
  - Scale Path: State-level mandates; national ABDM integration; applicability to other countries with traditional medicine systems.


## Slide 4: Proposed Solution

- Core Features
  - Data Sources & Entry: Official NAMASTE CSV ingestion; validation against registry; ABHA-authenticated practitioner workflow.
  - Organization & Access: Fast search/auto-complete by system (Ayurveda/Siddha/Unani); synonyms and related-concept navigation.
  - Analysis & Visualization: Mapping quality indicators and exportable summaries for analytics/policy use (demo-ready).
  - Outputs: FHIR CodeSystem/ValueSet/ConceptMap; Condition and Problem List Bundles; EMR-ready JSON; ICD-11-compliant codes for claims.
- Innovative Features
  - Dual-Coding Automation: One diagnosis → NAMASTE + ICD-11 TM2 + biomedicine codes; preserves traditional context while enabling insurance and global analytics.
  - ABHA-Native Security: OAuth 2.0 integration; consent metadata; auditable operations.
  - Real-Time Synchronization: Optional WHO ICD-11 sync for up-to-date classifications.
  - Stretch (Optional): ML-assisted suggestions for ambiguous mappings with human-in-the-loop verification.
- Problem Statement Mapping
  - Existing Problem: Fragmented AYUSH terminology (4,500+ terms), no EMR interoperability, manual double coding, rejected insurance claims, limited analytics.
  - Proposed Solution: FHIR R4-compliant terminology microservice bridging NAMASTE to ICD-11 TM2 with ABHA-secured access and EMR-ready outputs.
  - Outcome: Standardized interoperable records; ICD-11-based claim compatibility; real-time morbidity analytics; scalable for state/national rollout and global research.
