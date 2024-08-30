import {Model} from "sequelize";
import MainDatabase from "../databases/main.database";
import PartnerModel from "./partner.model";
import UserModel from "./user.model";

class PartnerUserModel extends Model {
}

PartnerUserModel.init({}, {
    tableName: 'partners__users',
    modelName: 'partner__users',
    sequelize: MainDatabase.getInstance(),
    timestamps: false,
});

PartnerModel.belongsToMany(UserModel, {through: PartnerUserModel, foreignKey: 'partner_id'});
UserModel.belongsToMany(PartnerModel, {through: PartnerUserModel, foreignKey: 'user_id'});

export default PartnerUserModel;

