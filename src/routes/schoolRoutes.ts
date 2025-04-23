import express, { Router } from 'express';
import { addSchool, listSchools } from '../controllers/schoolController';
import { validateAddSchool, validateListSchools } from '../validators/schoolValidator';

const router: Router = express.Router();

// Add School endpoint
router.post('/addSchool', validateAddSchool, addSchool);

// List Schools endpoint
router.get('/listSchools', validateListSchools, listSchools);

export { router as schoolRoutes };