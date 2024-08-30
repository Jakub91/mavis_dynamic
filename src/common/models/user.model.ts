import {DataTypes, Model} from "sequelize";
import MainDatabase from "../databases/main.database";

class UserModel extends Model {
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    owner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize: MainDatabase.getInstance(),
    modelName: 'user',
    tableName: 'users',
    timestamps: true,
    deletedAt: false,
    defaultScope: {
        attributes: {
            exclude: ['password', 'token']
        },
        order: [['id', 'DESC']]
    },
    scopes: {
        withPassword: {
            attributes: {
                include: ['password']
            }
        }
    }
});

export default UserModel;