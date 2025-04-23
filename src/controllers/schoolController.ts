import { Request, Response } from 'express';
import * as SchoolModel from '../models/schoolModel';
import { IAddSchoolRequest, IListSchoolsRequest, IApiResponse, ISchool, ISchoolWithDistance } from '../types/school';

/**
 * Add a new school
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const addSchool = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, address, latitude, longitude } = req.body as IAddSchoolRequest;

        // Convert latitude and longitude to numbers
        const schoolData: ISchool = {
            name,
            address,
            latitude: typeof latitude === 'string' ? parseFloat(latitude) : latitude,
            longitude: typeof longitude === 'string' ? parseFloat(longitude) : longitude
        };

        const newSchool = await SchoolModel.addSchool(schoolData);

        const response: IApiResponse<ISchool> = {
            success: true,
            message: 'School added successfully',
            data: newSchool
        };

        res.status(201).json(response);
    } catch (error) {
        console.error('Error in addSchool controller:', error);

        const response: IApiResponse<null> = {
            success: false,
            message: 'Failed to add school',
            error: error instanceof Error ? error.message : 'Unknown error'
        };

        res.status(500).json(response);
    }
};

/**
 * List all schools sorted by proximity to user location
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const listSchools = async (req: Request, res: Response): Promise<void> => {
    try {
        const { latitude, longitude } = req.query as unknown as IListSchoolsRequest;

        const schools = await SchoolModel.getAllSchoolsByProximity(latitude, longitude);

        const response: IApiResponse<ISchoolWithDistance[]> = {
            success: true,
            message: 'Schools retrieved successfully',
            count: schools.length,
            data: schools
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error in listSchools controller:', error);

        const response: IApiResponse<null> = {
            success: false,
            message: 'Failed to retrieve schools',
            error: error instanceof Error ? error.message : 'Unknown error'
        };

        res.status(500).json(response);
    }
};