import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import UserModel from "../models/user.model";
import {UnauthorizedError} from "../errors/unauthorized.error";
import PartnerUserModel from "../models/partner-user.model";
import {PartnerCollectionDatabase, PartnerDatabase} from "../databases/partner.database";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (!token) throw new UnauthorizedError();

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as JwtPayload;
        req.user = await UserModel.findOne({where: {id: payload.user?.id}});
    } catch (e) {
        throw new UnauthorizedError();
    }

    if(req.user == null) throw new UnauthorizedError();

    let partnerUserModel = await PartnerUserModel.findOne({where: {user_id: req.user.get('id')}});
    if(partnerUserModel == null) throw new UnauthorizedError();

    let partnerID = partnerUserModel.get('partner_id') as number;
    req.partnerDatabase = PartnerCollectionDatabase.getInstance(partnerID).sequelize;

    next();
}

export default authMiddleware;