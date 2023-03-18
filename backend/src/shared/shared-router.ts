import express from "express";
import auth from "../router/auth/auth";
import { LoginController } from "./controllers/login-controller";
import { LogoutController } from "./controllers/logout-controller";
import { SignUpControler } from "./controllers/signup-controller";

const sharedRouter = express.Router();

sharedRouter.get('/', (req, res) =>  res.send({ message: 'testing' }));
sharedRouter.get('/usertest', auth.pass, (req, res) => {
    let user = req.user
    res.send({ message: 'Authorized', user });
});

const logOutController = new LogoutController();
sharedRouter.get("/logout", logOutController.logOut.bind(LogoutController));

const signUpController = new SignUpControler();
sharedRouter.post("/signup", signUpController.signUp.bind(signUpController));

const loginControler = new LoginController();
sharedRouter.post("/login", loginControler.logIn.bind(loginControler));

export default sharedRouter;

