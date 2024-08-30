import {DataTypes, Model} from "sequelize";
import MainDatabase from "../databases/main.database";
import {databaseName, PartnerCollectionDatabase, PartnerDatabase} from "../databases/partner.database";
import {DynamicModel} from "./partner/dynamic.model";

class PartnerModel extends Model {
}

PartnerModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: MainDatabase.getInstance(),
    modelName: 'partner',
    tableName: 'partners',
    timestamps: true,
    deletedAt: false,
    hooks: {
        afterCreate: async (partner: PartnerModel) => {
            try {
                const partnerID = partner.getDataValue('id');
                const mainDatabase = MainDatabase.getInstance();
                await mainDatabase.query(`CREATE DATABASE ${databaseName}_${partnerID};`);

                const partnerDatabase: PartnerDatabase = PartnerCollectionDatabase.getInstance(partnerID);
                await DynamicModel.syncModel(partnerDatabase);
            } catch (error) {
                await partner.destroy();
                throw error;
            }
        }
    }
});

export default PartnerModel;