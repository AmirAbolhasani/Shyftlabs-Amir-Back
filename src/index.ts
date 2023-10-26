// Imports
import dotenv from 'dotenv';
import { Application } from "./Application";
import router from './route/route';
let pkg = require('../package.json');

// Load environment varibales 
dotenv.config();

// Start Application
let app = new Application(pkg.title, pkg.description, pkg.version,
    parseInt(process.env.SERVER_PORT ?? "4000"), router);
app.start();