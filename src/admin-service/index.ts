import express from "express";
import path from "path";
import {LoginController} from "./controllers/login.controller";
import session from "express-session";
import sassMiddleware from 'sass-middleware';

const adminApp = express();

adminApp.use(session({secret: 'secret', resave: true, saveUninitialized: true}));

adminApp.use(sassMiddleware({
    src: path.join(__dirname, 'assets', 'styles'),
    dest: path.join(__dirname, 'public', 'css'),
    debug: true,
    prefix: '/css',
    outputStyle: 'compressed',
}));

adminApp.set('view engine', 'ejs');
adminApp.set('views', path.join(__dirname, 'views'));
adminApp.use(express.urlencoded({extended: true}));

adminApp.use('/login', new LoginController().router);
adminApp.use('/static', express.static(path.join(__dirname, 'public')));

export default adminApp;
