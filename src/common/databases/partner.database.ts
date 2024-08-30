import {Sequelize} from "sequelize";
import {DynamicModel} from "../models/partner/dynamic.model";

export const databaseName: string = 'flowy_dynamic';
const databaseUser: string = process.env.DB_USER || 'postgres';
const databasePassword: string = process.env.DB_PASS || 'postgres';
const databaseHost: string = process.env.DB_HOST || 'localhost';
const databasePort: number = Number(process.env.DB_PORT) || 5432;

export class PartnerCollectionDatabase {

    private readonly _partnerDatabases: PartnerDatabase[];
    private static instance: PartnerCollectionDatabase;

    constructor() {
        this._partnerDatabases = [];
    }

    static getInstance(partnerID: number): PartnerDatabase {
        if (!PartnerCollectionDatabase.instance) {
            PartnerCollectionDatabase.instance = new PartnerCollectionDatabase();
        }

        let partnerDatabase = PartnerCollectionDatabase.instance._partnerDatabases.find(partnerDatabase => partnerDatabase.partnerID === partnerID);
        if (!partnerDatabase) {
            partnerDatabase = new PartnerDatabase(partnerID);
            PartnerCollectionDatabase.instance._partnerDatabases.push(partnerDatabase);
        }

        return partnerDatabase;
    }

}

export class PartnerDatabase {

    private readonly _partnerID: number;
    private readonly _sequelize: Sequelize;

    get partnerID(): number {
        return this._partnerID;
    }

    get sequelize(): Sequelize {
        return this._sequelize;
    }

    constructor(partnerID: number) {
        this._partnerID = partnerID;
        this._sequelize = new Sequelize(databaseName + '_' + partnerID, databaseUser, databasePassword,
            {
                host: databaseHost,
                port: databasePort,
                dialect: 'postgres'
            }
        );

        DynamicModel.initModel(this);
    }
}