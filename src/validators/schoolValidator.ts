import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Validator for adding a new school
const addSchoolSchema = z.object({
    name: z.string().min(1, { message: "School name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    latitude: z.number()
        .or(z.string().transform(val => parseFloat(val)))
        .refine(val => !isNaN(val) && val >= -90 && val <= 90, {
            message: "Latitude must be a number between -90 and 90"
        }),
    longitude: z.number()
        .or(z.string().transform(val => parseFloat(val)))
        .refine(val => !isNaN(val) && val >= -180 && val <= 180, {
            message: "Longitude must be a number between -180 and 180"
        })
});

// Validator for listing schools with proximity
const listSchoolsSchema = z.object({
    latitude: z.number()
        .or(z.string().transform(val => parseFloat(val)))
        .refine(val => !isNaN(val) && val >= -90 && val <= 90, {
            message: "Latitude must be a number between -90 and 90"
        }),
    longitude: z.number()
        .or(z.string().transform(val => parseFloat(val)))
        .refine(val => !isNaN(val) && val >= -180 && val <= 180, {
            message: "Longitude must be a number between -180 and 180"
        })
});

// Validator middleware for add school
export const validateAddSchool = (req: Request, res: Response, next: NextFunction): void | Response => {
    try {
        addSchoolSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.errors
            });
        }
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: (error as Error).message
        });
    }
};

// Validator middleware for list schools
export const validateListSchools = (req: Request, res: Response, next: NextFunction): void | Response => {
    try {
        listSchoolsSchema.parse(req.query);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.errors
            });
        }
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: (error as Error).message
        });
    }
};