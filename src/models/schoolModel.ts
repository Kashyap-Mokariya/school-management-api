import db from "../config/db";
import {calculateDistance} from "../utils/distanceCalculator";
import {School, SchoolWithDistance} from "../types/school";
import {RowDataPacket, ResultSetHeader} from "mysql2";

export const addSchool = async (schoolData: School): Promise<School> => {
	try {
		const {name, address, latitude, longitude} = schoolData;

		const [result] = await db.query<ResultSetHeader>(
			"INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
			[name, address, latitude, longitude]
		);

		if (result.affectedRows === 0) {
			throw new Error("Failed to add school");
		}

		return {
			id: result.insertId,
			name,
			address,
			latitude,
			longitude,
		};
	} catch (error) {
		throw error;
	}
};

export const getAllSchoolsByProximity = async (
	userLatitude: number | string,
	userLongitude: number | string
): Promise<SchoolWithDistance[]> => {
	try {
		const userLat =
			typeof userLatitude === "string"
				? parseFloat(userLatitude)
				: userLatitude;
		const userLon =
			typeof userLongitude === "string"
				? parseFloat(userLongitude)
				: userLongitude;

		const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM schools");

		const schools = rows as unknown as School[];

		const schoolsWithDistance: SchoolWithDistance[] = schools.map(
			(school) => {
				const distance = calculateDistance(
					userLat,
					userLon,
					school.latitude,
					school.longitude
				);

				return {
					...school,
					distance: parseFloat(distance.toFixed(2)),
				};
			}
		);

		return schoolsWithDistance.sort((a, b) => a.distance - b.distance);
	} catch (error) {
		throw error;
	}
};
