import {Model} from "sequelize";
import MainDatabase from "../databases/main.database";
import PartnerModel from "./partner.model";
import UserModel from "./user.model";
import RoleModel from "./role.model";

class UserRoleModel extends Model {
}

UserRoleModel.init({}, {
    tableName: 'users__roles',
    modelName: 'users__roles',
    sequelize: MainDatabase.getInstance(),
    timestamps: false,
});

UserModel.belongsToMany(RoleModel, {through: UserRoleModel, foreignKey: 'user_id'});
RoleModel.belongsToMany(UserModel, {through: UserRoleModel, foreignKey: 'role_id'});

export default UserRoleModel;

