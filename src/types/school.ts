export interface ISchool {
    id?: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface ISchoolWithDistance extends ISchool {
    distance: number;
}

export interface IAddSchoolRequest {
    name: string;
    address: string;
    latitude: number | string;
    longitude: number | string;
}

export interface IListSchoolsRequest {
    latitude: number | string;
    longitude: number | string;
}

export interface IApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    count?: number;
    error?: string;
    errors?: any;
}