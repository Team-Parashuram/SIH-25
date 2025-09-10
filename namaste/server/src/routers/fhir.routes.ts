import express from 'express';
import { fhirController } from '../controllers/fhir.controller.js';

const router = express.Router();

// FHIR CodeSystem endpoints
router.get('/CodeSystem/namaste-:system', fhirController.getCodeSystem.bind(fhirController));
router.get('/CodeSystem', fhirController.getAllCodeSystems.bind(fhirController));

// FHIR ConceptMap endpoints
router.get('/ConceptMap/namaste-:system-to-icd11', fhirController.getConceptMap.bind(fhirController));
router.get('/ConceptMap', fhirController.getAllConceptMaps.bind(fhirController));

// FHIR Condition (dual-coded) endpoints
router.post('/Condition', fhirController.createCondition.bind(fhirController));
router.get('/Condition/:id', fhirController.getCondition.bind(fhirController));

// FHIR Bundle endpoints
router.post('/Bundle', fhirController.processBundle.bind(fhirController));
router.get('/Bundle/:id', fhirController.getBundle.bind(fhirController));

// FHIR server metadata
router.get('/metadata', fhirController.getCapabilityStatement.bind(fhirController));

// Translation service endpoints
router.post('/translate', fhirController.translateCode.bind(fhirController));
router.post('/dual-code', fhirController.generateDualCoding.bind(fhirController));

export { router };
