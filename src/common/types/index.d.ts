import {Sequelize} from "sequelize";
import UserModel from "../models/user.model";

declare module 'express-serve-static-core' {
    interface Request {
        mainDatabase: Sequelize;
        partnerDatabase: Sequelize;
        user: UserModel|null;
        session: Express.Session;
    }
}
