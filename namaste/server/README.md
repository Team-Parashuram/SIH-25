# NAMASTE + ICD-11 Terminology Integration

## Overview
The **National AYUSH Morbidity & Standardized Terminologies Electronic (NAMASTE)** system is India’s standardized coding framework for **traditional medicine diagnoses** under the AYUSH umbrella (Ayurveda, Siddha, Unani, and Homeopathy).  
It enables digitization of AYUSH clinical data and ensures **interoperability** with global standards like **WHO’s ICD-11**.

The goal is to:
- Assign **unique codes** to traditional medicine disorders.
- Map them to **ICD-11 Traditional Medicine Module 2 (TM2)** and **ICD-11 Biomedicine** codes.
- Support **dual/double-coding**: one AYUSH code + one ICD-11 code for the same diagnosis.
- Integrate into **FHIR-compliant EMRs** for analytics, insurance claims, and international reporting.

---

## What are NAMASTE Codes?
- **Definition**: A NAMASTE code is a unique identifier for a traditional medicine disorder.
- **Purpose**: Works like ICD codes but for AYUSH systems.
- **Example (simplified illustration; actual codes are in NAMASTE CSV):**
  - Ayurveda: `A001 → "Jvara (Fever)"`
  - Siddha: `S001 → "Kaaithu Noi (Respiratory disease)"`
  - Unani: `U001 → "Bukhar (Fever)"`

🔗 Official resources:
- [NAMASTE AYUSH Terminology Portal](https://ayushedu.bisag-n.gov.in/AYUSH_EDU/ayushterminology)

---

## WHO Standardised Terminologies
The **World Health Organization (WHO)** provides international standards for traditional medicine integration:

- **WHO Standardised International Terminologies for Ayurveda**  
  A global reference vocabulary harmonizing Ayurvedic concepts.

- **ICD-11 (International Classification of Diseases, 11th Revision)**  
  - **TM2 (Traditional Medicine Module 2)**: 529 disorder categories + 196 pattern codes specific to traditional medicine.  
  - **ICD-11 Biomedicine**: Standard biomedical codes (e.g., "Fever").  
  - **Dual coding** ensures AYUSH data can be aligned with biomedical data for research, insurance, and global interoperability.

🔗 WHO references:
- [ICD-11 API Documentation](https://icd.who.int/docs/icd-api/APIDoc-Version2/)  
- [ICD-11 Browser](https://icd.who.int/browse11/l-m/en)

---

## Why Dual Coding Matters
- **Clinicians**: Record both AYUSH diagnosis and its biomedical equivalent.  
- **Insurance**: Claims can be filed under ICD-11 globally recognized codes.  
- **Analytics**: Ministry of Ayush can track morbidity trends in both traditional and biomedical terms.  
- **Interoperability**: EMRs can communicate with national and international systems.

**Example:**  
- Patient presents with **Jvara (Ayurveda)**.  
- Stored as:  
  - NAMASTE: `A001` → "Jvara"  
  - ICD-11 TM2: `TM2-1A00` → "Jvara (TM2)"  
  - ICD-11 Biomedicine: `RA01` → "Fever"

---

## FHIR R4 Integration

### Key FHIR Resources
- **CodeSystem**: Holds all NAMASTE codes.  
- **ValueSet**: Curated sets of codes for clinical use.  
- **ConceptMap**: Links NAMASTE codes ↔ ICD-11 TM2 ↔ ICD-11 Biomedicine.  
- **Condition / ProblemList**: Stores patient diagnoses with multiple `coding` entries.  
- **Bundle**: Container for encounter data uploads.

### Example: Dual-coded `Condition` (FHIR R4 JSON snippet)

```json
{
  "resourceType": "Condition",
  "id": "cond-example-001",
  "clinicalStatus": { "coding": [{ "system": "http://terminology.hl7.org/CodeSystem/condition-clinical", "code": "active" }] },
  "subject": { "reference": "Patient/123" },
  "code": {
    "coding": [
      {
        "system": "https://namaste.ayush.gov.in/CodeSystem/NAMASTE",
        "code": "A001",
        "display": "Jvara (Ayurveda)"
      },
      {
        "system": "https://id.who.int/icd/release/11/mms",
        "code": "TM2-1A00",
        "display": "Jvara (TM2)"
      },
      {
        "system": "https://id.who.int/icd/release/11/mms",
        "code": "RA01",
        "display": "Fever (Biomedicine)"
      }
    ],
    "text": "Jvara — dual-coded NAMASTE + ICD-11"
  }
}
````

---

## Microservice Design

A lightweight **terminology micro-service** should provide:

1. **Terminology ingestion**

   * Import NAMASTE CSV → Generate FHIR `CodeSystem` + `ConceptMap`.
   * Sync TM2 & Biomedicine via WHO ICD API.

2. **Endpoints**

   * `GET /autocomplete?q=` → Return NAMASTE + ICD-11 matches.
   * `POST /translate` → Translate NAMASTE ↔ TM2/ICD-11.
   * `POST /fhir/Bundle` → Upload patient encounters with dual-coded diagnoses.
   * `GET /mappings/version` → Return version metadata + changelog.

3. **Security**

   * OAuth 2.0 secured using **ABHA tokens**.
   * Consent metadata & access control per **ISO 22600**.
   * Audit trails for versioning, provenance, and consent.

---

## Compliance with India’s 2016 EHR Standards

* **FHIR R4** for EMR interoperability.
* **SNOMED CT** and **LOINC** semantics where relevant.
* **ISO 22600** access control for consent-driven data sharing.
* **ABHA-linked OAuth2.0 authentication** for secure access.
* **Audit-ready metadata** for accountability and version tracking.

---

## Next Steps

1. **Prototype micro-service**: Parse NAMASTE CSV → Create CodeSystem + ConceptMap.
2. **WHO ICD API integration**: Sync TM2 + Biomedicine codes.
3. **Autocomplete widget**: Clinician UI for selecting dual codes.
4. **FHIR Bundle ingest**: Store encounters with dual-coded `Condition` resources.
5. **Security + audit**: Add OAuth2 (ABHA), consent metadata, and logs.
6. **Demo**: CLI or simple web app showing dual-coded ProblemList entries.

---

## References & Resources

* [NAMASTE AYUSH Terminology Portal](https://ayushedu.bisag-n.gov.in/AYUSH_EDU/ayushterminology)
* [WHO ICD-11 Browser](https://icd.who.int/browse11/l-m/en)
* [WHO ICD API Documentation](https://icd.who.int/docs/icd-api/APIDoc-Version2/)
* [FHIR R4 Specification](https://hl7.org/fhir/R4/)
* [India EHR Standards 2016 PDF](https://main.mohfw.gov.in/sites/default/files/17739294021483341357.pdf)
