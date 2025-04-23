import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { schoolRoutes } from './routes/schoolRoutes';

// Initialize Express app
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', schoolRoutes);

// Root route
app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Welcome to School Management API' });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message
    });
});

export default app;