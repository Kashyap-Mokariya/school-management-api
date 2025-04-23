import express, {Express, Request, Response, NextFunction} from "express";
import cors from "cors";
import {schoolRoutes} from "./routes/schoolRoutes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", schoolRoutes);

app.get("/", (_req: Request, res: Response) => {
	res.json({message: "Welcome to School Management API"});
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "Internal Server Error",
		error: err.message,
	});
});

export default app;
