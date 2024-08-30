import {Express} from "express";
import expressApplication, {expressApplicationRun} from "./common/express";
import adminApp from "./admin-service";

const app: Express = expressApplication;

app.use('/admin', adminApp);

expressApplicationRun();

