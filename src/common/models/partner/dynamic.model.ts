import {DataTypes, Model} from "sequelize";
import {PartnerDatabase} from "../../databases/partner.database";

class FlowyModel extends Model {
}

export class DynamicModel extends Model {

    static initModel(partnerDatabase: PartnerDatabase) {
        DynamicModel.init({
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
            columns: {
                type: DataTypes.JSON(),
                allowNull: false,
            }
        }, {
            sequelize: partnerDatabase.sequelize,
            modelName: 'dynamic',
            tableName: 'dynamics',
            timestamps: true,
            deletedAt: false,
            hooks: {
                afterCreate: async (dynamicModel) => {
                    FlowyModel.init(dynamicModel.getDataValue('columns'), {
                        sequelize: partnerDatabase.sequelize,
                        modelName: dynamicModel.getDataValue('code'),
                        tableName: dynamicModel.getDataValue('code'),
                        timestamps: true,
                        deletedAt: false,
                    });
                    await FlowyModel.sync({force: true});
                }
            }
        });
    }

    static async syncModel(partnerDatabase: PartnerDatabase) {
        DynamicModel.initModel(partnerDatabase);
        await DynamicModel.sync({force: true});
    }
}
