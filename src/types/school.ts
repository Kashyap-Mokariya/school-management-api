export interface School {
	id?: number;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface SchoolWithDistance extends School {
	distance: number;
}

export interface AddSchoolRequest {
	name: string;
	address: string;
	latitude: number | string;
	longitude: number | string;
}

export interface ListSchoolsRequest {
	latitude: number | string;
	longitude: number | string;
}

export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
	count?: number;
	error?: string;
	errors?: any;
}
