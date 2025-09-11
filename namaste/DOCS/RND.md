# 📋 **SIH Problem Statement Analysis: NAMASTE & ICD-11 TM2 EMR Integration**

## **Pain Points & Core Understanding** 🔎

### **What exact problem is being addressed?**
The problem centers on the **disconnected healthcare data ecosystem** in India's AYUSH sector (Ayurveda, Siddha, Unani). Currently, traditional medicine practitioners record diagnoses using varied terminologies without standardization, making it impossible to integrate with modern Electronic Medical Record (EMR) systems or conduct meaningful analytics.[1][2]

### **Why does this problem exist (root causes)?**
- **Legacy Paper-based Systems**: The AYUSH sector has been transitioning from paper-based records to digital systems[2][1]
- **Terminology Fragmentation**: Over 4,500 NAMASTE terms exist but lack proper mapping to international standards[2]
- **Interoperability Gap**: Traditional medicine codes cannot communicate with modern biomedical EMR systems[3]
- **Insurance Claims Challenges**: Without standardized coding, AYUSH treatments cannot be processed through global insurance frameworks[4]

### **Who are the primary stakeholders/users affected?**
- **Direct Users**: AYUSH practitioners, EMR vendors, medical record personnel, hospital administrators[2]
- **Indirect Beneficiaries**: Patients seeking traditional medicine, insurance companies, Ministry of AYUSH, WHO[5][4]
- **System Integrators**: Healthcare IT companies, API developers, EMR system vendors[6]

### **Current challenges or inefficiencies in solving it?**
- **Double Coding Complexity**: Practitioners need to record both traditional medicine diagnosis (NAMASTE) and biomedical equivalent (ICD-11)[5][2]
- **API Integration Barriers**: No standardized FHIR-compliant APIs exist for NAMASTE-to-ICD-11 translation[7]
- **Authentication Challenges**: ABHA OAuth 2.0 integration adds technical complexity[8][9]
- **Data Mapping Issues**: 529 TM2 categories and 196 pattern codes need accurate mapping to 4,500+ NAMASTE terms[3][5]

***

## **Feasibility of Execution** ⚙️

### **Can a working prototype be realistically built within hackathon timeline?**
**YES** – A functional prototype is definitely achievable within SIH timeline. The core components are well-defined:
- NAMASTE CSV data is publicly available[2]
- WHO ICD-11 API is operational[7]
- FHIR R4 specifications are mature[10]
- ABHA authentication endpoints are documented[11][8]

### **Technical requirements (APIs, datasets, hardware, integrations)?**
#### **Essential APIs & Datasets:**
- **NAMASTE CSV Export**: Contains 4,500+ standardized terms[2]
- **WHO ICD-11 API**: Access to TM2 module and Biomedicine categories[7]
- **ABHA Authentication API**: OAuth 2.0 integration for secure access[8][11]
- **FHIR R4 Libraries**: For CodeSystem, ValueSet, ConceptMap resources[12][13]

#### **Technical Stack Requirements:**
- **Backend**: Node.js/Java/Python for microservice development
- **FHIR Libraries**: HAPI FHIR or similar for resource handling[14]
- **Database**: PostgreSQL/MongoDB for terminology storage
- **Authentication**: OAuth 2.0 client libraries for ABHA integration[15]

### **Potential blockers (data availability, regulations, scaling issues)?**
#### **Low-Risk Blockers:**
- **NAMASTE Data Access**: Publicly available through official portals[16][2]
- **ICD-11 API**: Free access for development purposes[7]

#### **Medium-Risk Blockers:**
- **ABHA Token Management**: OAuth 2.0 implementation complexity[11][8]
- **Mapping Accuracy**: Manual verification of NAMASTE↔TM2 translations
- **FHIR Compliance**: Ensuring proper resource structure and validation[12]

### **MVP (minimum viable product) to impress evaluators?**
#### **Core MVP Features:**
1. **NAMASTE CSV Ingestion**: Load and parse terminology data
2. **Basic Auto-complete API**: Search NAMASTE terms with suggestions
3. **Simple Translation Service**: Convert NAMASTE codes to ICD-11 TM2
4. **FHIR Resource Generation**: Create CodeSystem and ConceptMap resources
5. **Demo Interface**: Web/CLI tool showing end-to-end workflow

#### **Stretch Goals for Impact:**
- Real-time WHO API synchronization
- ABHA authentication integration
- Problem List FHIR Bundle creation[17][18]

***

## **Impact & Relevance** 🌍

### **Who benefits from this solution?**
#### **Primary Beneficiaries:**
- **42.5 crore ABHA account holders** gain access to integrated traditional medicine records[9]
- **AYUSH practitioners** can document diagnoses in standardized, insurance-compatible formats[2]
- **EMR vendors** get ready-to-integrate terminology services for traditional medicine support[19]

#### **Secondary Impact:**
- **Insurance companies** can process AYUSH claims using global ICD-11 standards[4]
- **Healthcare researchers** gain access to structured traditional medicine data for analytics[2]
- **Policy makers** receive real-time morbidity data for evidence-based decisions[1][3]

### **Real-world impact potential?**
#### **Economic Impact:**
- **Insurance Coverage Expansion**: Traditional medicine treatments become claimable under global standards[4]
- **Healthcare Cost Reduction**: Integrated records reduce duplicate treatments and improve care coordination[12]
- **Market Growth**: Enables AYUSH sector integration with ₹74,000+ crore digital health market[9]

#### **Social Impact:**
- **Healthcare Equity**: Traditional medicine practitioners gain equal digital footing with modern medicine[5]
- **Global Recognition**: WHO ICD-11 TM2 integration elevates traditional medicine status worldwide[3][5]
- **Patient Safety**: Standardized terminology reduces misdiagnosis and treatment errors[12]

### **Scalability beyond hackathon?**
#### **State-level Scaling:**
- **Government Adoption**: Ministry of AYUSH can mandate integration across state hospitals[4]
- **EMR Compliance**: India's EHR Standards 2016 require FHIR R4 compliance, creating market demand[20]

#### **National & International Potential:**
- **ABDM Integration**: Direct compatibility with National Digital Health Mission[20][8]
- **Export Opportunity**: Solution applicable to countries with traditional medicine systems (Malaysia, Sri Lanka, Nepal)[4]

### **Why evaluators find this important?**
- **Government Priority**: Directly addresses Ministry of AYUSH strategic objectives[4]
- **Technical Rigor**: Involves complex FHIR interoperability and API integration challenges[7][12]
- **Real-world Application**: Solves actual problems faced by healthcare providers and patients[2]
- **Innovation Potential**: Creates new possibilities for traditional-modern medicine integration[5]

***

## **Scope of Innovation (Existing Solutions)** 💡

### **Existing products/solutions in this space?**
#### **Current Solutions:**
1. **NAMASTE Portal**: Government portal for terminology browsing but lacks API integration[16][2]
2. **Generic FHIR Terminology Servers**: Kodjin, Health Language Platform support standard terminologies but not NAMASTE[21][22]
3. **EMR Systems**: Existing Indian EMRs have basic FHIR support but no traditional medicine integration[6]

### **Limitations of existing solutions?**
#### **Major Gaps:**
- **No API Integration**: NAMASTE portal is browse-only, no programmatic access[2]
- **Missing TM2 Mapping**: No automated translation between NAMASTE and ICD-11 TM2[7]
- **ABHA Integration Absent**: Current solutions don't support ABHA OAuth authentication[8]
- **EMR Vendor Gap**: No ready-made FHIR-compliant NAMASTE integration for EMR systems[6]

### **Competitor analysis:**
| **Solution** | **Strengths** | **Limitations** | **Market Position** |
|--------------|---------------|-----------------|-------------------|
| **NAMASTE Portal**[2] | Government backing, 4,500+ terms | No API, manual only | Official but limited |
| **Kodjin FHIR Server**[21] | Enterprise-grade, multi-terminology | No NAMASTE support | International focus |
| **Health Language Platform**[22] | 150+ datasets, FHIR compliant | Proprietary, no traditional medicine | Commercial leader |

### **New/innovative approach opportunities?**
#### **Technical Innovation:**
- **Dual-Coding Automation**: First solution to automatically generate both NAMASTE and ICD-11 codes[5]
- **ABHA-Native Design**: Built specifically for India's digital health ecosystem[9][8]
- **Microservice Architecture**: Lightweight, scalable terminology service[23][24]
- **Real-time Synchronization**: Live updates from WHO ICD-11 API[7]

#### **Process Innovation:**
- **Zero-Training Integration**: EMR vendors can integrate without extensive AYUSH knowledge
- **Consent-driven Access**: ABHA authentication ensures patient data privacy[8][9]
- **Evidence-based Mapping**: AI-assisted terminology translation with manual verification

### **How solution can stand out technically?**
#### **Differentiating Technologies:**
- **FHIR R4 Native**: Full compliance with latest healthcare interoperability standards[10]
- **OAuth 2.0 Security**: Enterprise-grade authentication using ABHA tokens[11][8]
- **GraphQL APIs**: Modern query interface for flexible data access
- **Blockchain Audit Trail**: Immutable record of terminology mappings and updates
- **ML-powered Suggestions**: Machine learning for improved NAMASTE-to-TM2 mapping accuracy

***

## **Clarity of Problem Statement** 🧩

### **What exactly is being asked (clear deliverables)?**
#### **Primary Deliverables:**
1. **FHIR-compliant Microservice**: Lightweight terminology service with NAMASTE CodeSystem[21][12]
2. **API Endpoints**: Auto-complete, translation, and Bundle upload interfaces[7]
3. **Authentication Layer**: ABHA OAuth 2.0 integration for secure access[11][8]
4. **Demo Interface**: Web/CLI tool demonstrating end-to-end functionality

#### **Technical Specifications:**
- **FHIR R4 Resources**: CodeSystem, ConceptMap, ValueSet for NAMASTE and ICD-11[13][25]
- **Translation Operations**: Bidirectional NAMASTE↔TM2 code conversion[7]
- **Bundle Support**: FHIR Bundle creation with Problem List resources[18][17]
- **Audit Compliance**: Version tracking and consent metadata per EHR Standards 2016[20]

### **Where can teams misinterpret the PS?**
#### **Common Misinterpretation Risks:**
- **Scope Creep**: Building full EMR system instead of focused terminology service
- **Data Creation**: Thinking they need to create NAMASTE mappings rather than using existing data[2]
- **Authentication Complexity**: Over-engineering ABHA integration instead of using standard OAuth flows[11]
- **FHIR Confusion**: Implementing wrong FHIR version or resources (R4 specifically required)[10]

### **How should solution be framed for evaluator clarity?**
#### **Key Framing Points:**
- **Integration Focus**: "API bridge between traditional medicine and modern EMR systems"
- **Compliance Emphasis**: "FHIR R4 and India EHR Standards 2016 compliant solution"
- **Real-world Ready**: "Production-ready microservice for immediate EMR vendor adoption"
- **Government Alignment**: "Directly supports Ministry of AYUSH digital transformation goals"

***

## **Evaluator's Perspective** 🎯

### **How will evaluators judge this PS?**
#### **Evaluation Criteria Priority:**
1. **Technical Complexity (30%)**: FHIR implementation, API design, authentication integration
2. **Real-world Impact (25%)**: Actual utility for AYUSH practitioners and EMR vendors
3. **Innovation (20%)**: Novel approach to traditional-modern medicine integration
4. **Completeness (15%)**: Working demo with all specified components
5. **Scalability (10%)**: Architecture suitable for national deployment

### **Which criteria matter most?**
#### **High-Priority Factors:**
- **FHIR Compliance**: Proper implementation of CodeSystem, ConceptMap, and Bundle resources[13][12]
- **API Functionality**: Working auto-complete, translation, and upload endpoints[7]
- **Authentication Security**: Correct ABHA OAuth 2.0 implementation[8][11]
- **Data Accuracy**: Correct mapping between NAMASTE and ICD-11 TM2 codes[5][2]

#### **Medium-Priority Factors:**
- **User Interface**: Clean demo showing practitioner workflow
- **Performance**: Response times under 200ms for terminology lookups
- **Documentation**: Clear API documentation and integration guides

### **Red flags evaluators might notice?**
#### **Technical Red Flags:**
- **Fake Data**: Using simulated NAMASTE codes instead of official data[2]
- **Wrong FHIR Version**: Implementing DSTU2/STU3 instead of R4[10]
- **Security Gaps**: Missing OAuth implementation or insecure token handling[8]
- **Incomplete Mapping**: Showing only partial NAMASTE-to-TM2 translations

#### **Presentation Red Flags:**
- **Over-promising**: Claiming full EMR system when only terminology service is required
- **Buzzword Heavy**: Using AI/ML terms without actual implementation
- **Ignoring Standards**: Not mentioning FHIR, EHR Standards 2016, or ABHA compliance

***

## **Strategy for Team Fit & Execution** 👥

### **Required skill sets in team?**
#### **Essential Roles (4-5 person team):**
- **Backend Developer (FHIR specialist)**: FHIR R4, REST APIs, microservices architecture[21][12]
- **Healthcare Informatics Expert**: Understanding of medical terminologies, ICD-11, NAMASTE[7][2]
- **Security/Auth Specialist**: OAuth 2.0, ABHA integration, healthcare data security[11][8]
- **Frontend Developer**: React/Angular for demo interface, API integration
- **DevOps/Presenter**: Deployment, documentation, pitch presentation

#### **Ideal Team Composition:**
- **Technical Lead (25%)**: Overall architecture, FHIR implementation
- **Backend Developer (25%)**: API development, database design
- **Healthcare Domain Expert (20%)**: Terminology mapping, clinical workflow
- **Security Engineer (15%)**: Authentication, compliance, security
- **UI/Presentation (15%)**: Demo interface, pitch preparation

### **Step-by-step research and ideation approach:**
#### **Phase 1: Research & Planning (Day 1)**
1. **Data Analysis**: Download and analyze NAMASTE CSV structure[2]
2. **API Exploration**: Test WHO ICD-11 API endpoints and authentication[7]
3. **FHIR Study**: Review CodeSystem, ConceptMap, and Bundle specifications[13][12]
4. **ABHA Research**: Understand OAuth 2.0 flow and token requirements[8][11]

#### **Phase 2: Architecture Design (Day 1-2)**
1. **System Design**: Define microservice architecture and API contracts
2. **Data Modeling**: Design database schema for terminologies and mappings
3. **Security Planning**: Design ABHA authentication and audit trail
4. **Integration Strategy**: Plan FHIR resource generation and validation

#### **Phase 3: Development (Day 2-3)**
1. **Core Service**: Build terminology microservice with basic CRUD operations
2. **FHIR Implementation**: Create CodeSystem and ConceptMap resources
3. **Translation Logic**: Implement NAMASTE-to-TM2 mapping algorithms
4. **API Development**: Build auto-complete, translate, and upload endpoints

#### **Phase 4: Integration & Demo (Day 3)**
1. **ABHA Integration**: Implement OAuth 2.0 authentication flow
2. **Demo Interface**: Build web interface showing practitioner workflow
3. **Testing**: Validate FHIR compliance and API functionality
4. **Documentation**: Create API documentation and integration guides

#### **Phase 5: Presentation Prep (Day 3)**
1. **Use Case Demo**: Prepare realistic practitioner scenarios
2. **Technical Deep-dive**: Show FHIR resources and API responses
3. **Impact Presentation**: Quantify benefits for stakeholders
4. **Q&A Preparation**: Anticipate technical and business questions


This problem statement offers **excellent potential for innovation** while solving a **real, government-priority challenge**. The combination of healthcare informatics, API development, and authentication security provides **multiple learning opportunities** and **strong portfolio value**. The solution directly supports India's digital health transformation, making it **highly relevant for evaluators** and **scalable for real-world impact**.

**Recommendation**: This PS is **ideal for teams with healthcare IT interest** and **strong technical skills**. The learning curve is moderate, the impact potential is high, and the technical challenges are engaging without being overwhelming.

[1](https://www.wisdomlib.org/science/journal/world-journal-of-pharmaceutical-research/d/doc1377634.html)
[2](https://pmc.ncbi.nlm.nih.gov/articles/PMC10410508/)
[3](https://ayush.gov.in/resources/pdf/PressRelease/WHO_releases_update_in_ICD.docxR.pdf)
[4](https://www.pib.gov.in/PressReleasePage.aspx?PRID=1994921)
[5](https://www.awazthevoice.in/lifestyle-news/who-s-icd-series-officially-introduces-new-module-dedicated-to-traditional-medicine-34562.html)
[6](https://www.doctorsapp.in/blog/top-10-emrs-in-india)
[7](https://icd.who.int/docs/icd-api/APIDoc-Version2/)
[8](https://www.2basetechnologies.com/abha-indias-step-to-digitalizing-the-healthcare-ecosystem)
[9](https://sflc.in/abha-accounts-indias-interoperable-and-portable-health-data-management-system/)
[10](https://ecqi.healthit.gov/fhir/about)
[11](https://sandboxcms.abdm.gov.in/uploads/abha_api_92b70e4a_d5a84743ae.pdf)
[12](https://www.capminds.com/blog/how-to-utilize-fhirs-terminology-services-for-consistent-clinical-data-representation/)
[13](https://build.fhir.org/conceptmap.html)
[14](https://hapifhir.io/hapi-fhir/apidocs/hapi-fhir-structures-r4/org/hl7/fhir/r4/model/ConceptMap.html)
[15](https://www.aha.io/api/oauth2)
[16](https://health.vikaspedia.in/viewcontent/health/ayush/ayurveda-1/national-ayush-morbidity-codes-and-standards-portal?lgn=en)
[17](https://cloud.google.com/healthcare-api/docs/how-tos/fhir-bundles)
[18](https://hl7.org/fhir/R4/bundle.html)
[19](https://www.signifyresearch.net/insights/ehr-vendors-and-the-use-of-fhir-2/)
[20](https://www.dronapay.com/post/fhir-simplifying-electronic-health-records-ehr-in-india)
[21](https://kodjin.com/terminology-service/)
[22](https://www.wolterskluwer.com/en/solutions/health-language/fhir-terminology-server)
[23](https://emorphis.health/blogs/healthcare-apis-and-microservices/)
[24](https://healthtechmagazine.net/article/2024/09/what-is-microservice-architecture-perfcon)
[25](http://fhir.outburn.co.il/R4-spec/conceptmap.html)
[26](https://www.drishtiias.com/pdf/1751400009.pdf)
[27](https://ayushedu.bisag-n.gov.in/AYUSH_EDU/ayushterminology)
[28](https://www.ailoitte.com/insights/a-complete-guide-to-hl7-fhir/)
[29](https://www.drishtiias.com/daily-updates/daily-news-analysis/icd-11-tm-module-2-launch-global-integration-of-ayush-medicine)
[30](https://pmc.ncbi.nlm.nih.gov/articles/PMC8367140/)
[31](https://www.scribd.com/document/868389419/namaste-portal)
[32](https://www.fhir.org/guides/registry/)
[33](https://wjpr.net/public/abstract_show/15109)
[34](https://sansad.in/getFile/annex/267/AS189_5eYw7H.pdf)
[35](https://in.linkedin.com/in/pankaj-chaudhary-5243a1216)
[36](https://www.who.int/standards/classifications/frequently-asked-questions/traditional-medicine)
[37](https://portal.nabh.co/Announcement/Draft%20NABH%20Standards%20for%20HIS%20and%20EMR%20Systems%20-%2023rd%20July%202024.pdf)
[38](https://www.youtube.com/watch?v=qef4YtVqpB4)
[39](https://abdm.gov.in:8081/uploads/ABHA_Pathways_45fb0756cd.pdf)
[40](https://www.eka.care/services/fhir-in-emrs-revolutionizing-healthcare-data-exchange)
[41](https://info.eka.care/services/the-complete-guide-to-abha-app)
[42](https://www.who.int/standards/classifications/frequently-asked-questions/icd-11-implementation)
[43](https://icd.who.int)
[44](https://abdm.gov.in:8081/uploads/Pathways_letter_and_annexure_1_12d8c3f50f.pdf)
[45](https://www.who.int/standards/classifications/classification-of-diseases/icd-implementation)
[46](https://www.osplabs.com/insights/how-emr-to-fhir-integration-process-boosts-healthcare-interoperability/)
[47](https://helixbeat.com/how-to-utilize-fhirs-terminology-services-for-consistent-clinical-data-representation/)
[48](https://profiles.ihe.net/ITI/SVCM/ITI-100.html)
[49](https://formative.jmir.org/2025/1/e51270)
[50](https://build.fhir.org/terminology-service.html)
[51](https://fhir-drills.github.io/conceptmap.html)
[52](https://www.microteklearning.com/blog/hl7-fhir-challenges-and-solutions-for-hospitals/)
[53](https://medblocks.com/blog/terminologies-in-fhir)
[54](https://www.ramsoft.com/blog/emr-integration)
[55](https://build.fhir.org/codesystem.html)
[56](https://www.groovyweb.co/blog/emr-integration-in-healthcare/)
[57](https://www.nlm.nih.gov/vsac/support/usingvsac/vsacfhirapi.html)
[58](https://simplifier.net/guide/fhir-standards-wales-implementation-guide/Home/Design/NamingConventions?version=0.0.5-discovery)
[59](https://learning.postman.com/docs/sending-requests/authorization/oauth-20/)
[60](https://www.linkedin.com/pulse/microservice-architectures-open-platforms-health-care-pablo)
[61](https://developers.google.com/identity/protocols/oauth2/web-server)
[62](https://cds-hooks.org/hooks/problem-list-item-create/)
[63](https://www.health-samurai.io/articles/building-healthcare-microservices-a-fhir-native-approach)
[64](https://oauth.net/articles/authentication/)
[65](https://build.fhir.org/bundle-examples.html)
[66](https://www.redhat.com/en/topics/microservices/microservices-in-healthcare)
[67](https://auth0.com/intro-to-iam/what-is-oauth-2)
[68](https://build.fhir.org/resourcelist.html)
[69](https://microservices.io/patterns/microservices.html)
[70](https://sigosoft.com/blog/how-to-integrate-abha-in-a-telemedicine-app/)
[71](https://docs.aws.amazon.com/healthlake/latest/devguide/managing-fhir-resources-bundle.html)
[72](https://pmc.ncbi.nlm.nih.gov/articles/PMC11835905/)
[73](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow)