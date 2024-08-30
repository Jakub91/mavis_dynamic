import MainDatabase from "../databases/main.database";
import {Sequelize} from "sequelize";
import {NextFunction, Request, Response} from "express";

const mainDatabaseMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const mainDatabase: Sequelize = MainDatabase.getInstance();
    await mainDatabase.authenticate();

    req.mainDatabase = mainDatabase;
    next();
}

export default mainDatabaseMiddleware;