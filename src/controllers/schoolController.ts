import {Request, Response} from "express";
import * as SchoolModel from "../models/schoolModel";
import {
	AddSchoolRequest,
	ListSchoolsRequest,
	ApiResponse,
	School,
	SchoolWithDistance,
} from "../types/school";

export const addSchool = async (req: Request, res: Response): Promise<void> => {
	try {
		const {name, address, latitude, longitude} = req.body as AddSchoolRequest;

		const schoolData: School = {
			name,
			address,
			latitude:
				typeof latitude === "string" ? parseFloat(latitude) : latitude,
			longitude:
				typeof longitude === "string"
					? parseFloat(longitude)
					: longitude,
		};

		const newSchool = await SchoolModel.addSchool(schoolData);

		const response: ApiResponse<School> = {
			success: true,
			message: "School added successfully",
			data: newSchool,
		};

		res.status(201).json(response);
	} catch (error) {
		console.error("Error in addSchool controller:", error);

		const response: ApiResponse<null> = {
			success: false,
			message: "Failed to add school",
			error: error instanceof Error ? error.message : "Unknown error",
		};

		res.status(500).json(response);
	}
};

export const listSchools = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const {latitude, longitude} =
			req.query as unknown as ListSchoolsRequest;

		const schools = await SchoolModel.getAllSchoolsByProximity(
			latitude,
			longitude
		);

		const response: ApiResponse<SchoolWithDistance[]> = {
			success: true,
			message: "Schools retrieved successfully",
			count: schools.length,
			data: schools,
		};

		res.status(200).json(response);
	} catch (error) {
		console.error("Error in listSchools controller:", error);

		const response: ApiResponse<null> = {
			success: false,
			message: "Failed to retrieve schools",
			error: error instanceof Error ? error.message : "Unknown error",
		};

		res.status(500).json(response);
	}
};
