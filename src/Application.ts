import { Database } from './database/Database';
import express from 'express';
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

export class Application 
{
	private title: string;
	private description: string;
	private version: string;
	private port: number;
	private router: express.Router;
	public app!: express.Express;
	public database!: Database;
	constructor(title: string, description: string, version: string, port: number, router: express.Router)
	{
		this.title = title;
		this.description = description;
		this.version = version;
		this.port = port;
		this.router = router;
	}
	start()
	{
		this.startCrashHandler();
		this.startDatabase();
		this.startServer();
		this.startSwagger();
	}
	private startCrashHandler(): void
	{
		process.on('unhandledRejection', (reason) =>
		{
			console.log(reason);
		});
		process.on('uncaughtException', (error) =>
		{
			console.log(error);
		});
	}
	private startDatabase(): void
	{
		this.database = new Database();
		this.database.init().then(() => this.database.sync(false));
	}
	private startServer(): void
	{
		this.app = express();
		this.app.use((req, res, next) =>
		{
			let excludes: string[] = [];
			if (excludes.includes(req.path))
				next();
			else
				express.json({ limit: '100kb' })(req, res, next);
		});
		// Express
		this.app.use(express.static('static'));
		// Cors
		this.app.use(cors({ exposedHeaders: '*', }));
		// api routes
		this.app.use('/', this.router);
		// start server
		const port = this.port;
		this.app.listen(port, async () =>
		{
			console.log(`Server listening on port ${port}`);
		});
	}
	private startSwagger(): void
	{
		const joptions = {
			definition: {
				openapi: "3.0.1",
				info: {
					title: this.title,
					description: this.description,
					version: this.version,
					license: {
						name: "MIT",
						url: "https://spdx.org/licenses/MIT.html",
					},
					contact: {
						name: "Amir Abolhasani",
						email: "accounts@namirasoft.com",
					},
				}
			},
			apis: ['./src/route/*.ts'],
		};
		const swaggerSpec = swaggerJSDoc(joptions);
		var options = {
			explorer: true
		};
		this.app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));
	}
};