import {Sequelize} from "sequelize";
import PartnerModel from "../models/partner.model";
import UserModel from "../models/user.model";
import PartnerUserModel from "../models/partner-user.model";
import RoleModel from "../models/role.model";
import UserRoleModel from "../models/user-role.model";

const databaseName: string = process.env.DB_NAME || 'flowy_dynamic';
const databaseUser: string = process.env.DB_USER || 'postgres';
const databasePassword: string = process.env.DB_PASS || 'postgres';
const databaseHost: string = process.env.DB_HOST || 'localhost';
const databasePort: number = Number(process.env.DB_PORT) || 5432;

class MainDatabase {

    private static instance: Sequelize;

    static getInstance(): Sequelize {
        if (!MainDatabase.instance) {
            MainDatabase.instance = new Sequelize(databaseName, databaseUser, databasePassword,
                {host: databaseHost, port: databasePort, dialect: 'postgres'}
            );
        }
        return MainDatabase.instance;
    }
}

export default MainDatabase;