import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../../common/models/user.model";

export class LoginService {
    static async loginUser(email: string, password: string): Promise<string|null> {
        const user: UserModel | null = await UserModel.scope('withPassword').findOne({where: {email: email}});

        if (user === null) return null;

        const passwordMatch = await bcrypt.compare(password, user.getDataValue('password'));
        if (!passwordMatch) {
            return null;
        }

        const secretKey = process.env.JWT_SECRET_KEY || '';
        const expiresIn = process.env.JWT_EXPIRES_IN || '14h';

        const token = jwt.sign({user: {id: user.getDataValue('id')}}, secretKey, {
            expiresIn: expiresIn,
        });

        user.setDataValue('token', token);
        await user.save();

        return token;
    }
}
