import db from '../config/db';
import { calculateDistance } from '../utils/distanceCalculator';
import { ISchool, ISchoolWithDistance } from '../types/school';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

/**
 * Add a new school to the database
 * @param {ISchool} schoolData - School data including name, address, latitude, longitude
 * @returns {Promise<ISchool>} - Newly created school data
 */
export const addSchool = async (schoolData: ISchool): Promise<ISchool> => {
    try {
        const { name, address, latitude, longitude } = schoolData;

        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );

        if (result.affectedRows === 0) {
            throw new Error('Failed to add school');
        }

        return {
            id: result.insertId,
            name,
            address,
            latitude,
            longitude
        };
    } catch (error) {
        throw error;
    }
};

/**
 * Get all schools sorted by proximity to a given location
 * @param {number|string} userLatitude - User's latitude
 * @param {number|string} userLongitude - User's longitude
 * @returns {Promise<ISchoolWithDistance[]>} - List of schools sorted by distance
 */
export const getAllSchoolsByProximity = async (
    userLatitude: number | string,
    userLongitude: number | string
): Promise<ISchoolWithDistance[]> => {
    try {
        // Convert string parameters to numbers if they're not already
        const userLat = typeof userLatitude === 'string' ? parseFloat(userLatitude) : userLatitude;
        const userLon = typeof userLongitude === 'string' ? parseFloat(userLongitude) : userLongitude;

        // Fetch all schools from the database
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM schools');

        // Type guard to ensure we have valid school rows
        const schools = rows as unknown as ISchool[];

        // Calculate distance for each school and add it to the object
        const schoolsWithDistance: ISchoolWithDistance[] = schools.map(school => {
            const distance = calculateDistance(
                userLat,
                userLon,
                school.latitude,
                school.longitude
            );

            return {
                ...school,
                distance: parseFloat(distance.toFixed(2)) // Round to 2 decimal places
            };
        });

        // Sort schools by distance (closest first)
        return schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    } catch (error) {
        throw error;
    }
};