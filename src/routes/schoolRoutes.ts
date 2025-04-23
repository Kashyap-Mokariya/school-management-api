import express, {Router} from "express";
import {addSchool, listSchools} from "../controllers/schoolController";
import {
	validateAddSchool,
	validateListSchools,
} from "../validators/schoolValidator";

const router: Router = express.Router();

router.post("/addSchool", validateAddSchool, addSchool);
router.get("/listSchools", validateListSchools, listSchools);

export {router as schoolRoutes};
