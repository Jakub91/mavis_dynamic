import express, {Express} from "express";
import dotenv from "dotenv";
import mainDatabaseMiddleware from "../middlewares/database.middleware";
import * as fs from "fs";
import path from "node:path";

dotenv.config();

const logDirectory = path.join(process.cwd(), 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const expressApplication: Express = express();
const port = process.env.NODE_PORT || 3000;

expressApplication.use(mainDatabaseMiddleware);

export const expressApplicationRun = () => {
    expressApplication.listen(port);
}

export default expressApplication;
