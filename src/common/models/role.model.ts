import {DataTypes, Model} from "sequelize";
import MainDatabase from "../databases/main.database";

class RoleModel extends Model {
}

RoleModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
}, {
    sequelize: MainDatabase.getInstance(),
    modelName: 'role',
    tableName: 'roles',
    timestamps: false,
});

export default RoleModel;