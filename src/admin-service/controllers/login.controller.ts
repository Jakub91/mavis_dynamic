import express from "express";
import {LoginService} from "../services/login.service";

export class LoginController {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getLoginPage);
        this.router.post('/', this.getLoginPage);
    }

    private getLoginPage = async (req: express.Request, res: express.Response) => {
        let options: { title: string, error: string | null } = {title: 'Prihlásenie', error: null};

        if (req.method === 'POST') {
            const {email, password} = req.body;
            let token: string | null = null;
            if (email && password) {
                token = await LoginService.loginUser(email, password);
                req.session!.token = token;
            }

            if (token) {
                return res.redirect('/dashboard');
            }
            options['error'] = 'Nesprávne prihlasovacie';
        }
        return res.render('login', options);
    }
}
