"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../router/auth/auth"));
const login_controller_1 = require("./controllers/login-controller");
const logout_controller_1 = require("./controllers/logout-controller");
const signup_controller_1 = require("./controllers/signup-controller");
const sharedRouter = express_1.default.Router();
sharedRouter.get('/', (req, res) => res.send({ message: 'testing' }));
sharedRouter.get('/usertest', auth_1.default.pass, (req, res) => {
    let user = req.user;
    res.send({ message: 'Authorized', user });
});
const logOutController = new logout_controller_1.LogoutController();
sharedRouter.get("/logout", logOutController.logOut.bind(logout_controller_1.LogoutController));
const signUpController = new signup_controller_1.SignUpControler();
sharedRouter.post("/signup", signUpController.signUp.bind(signUpController));
const loginControler = new login_controller_1.LoginController();
sharedRouter.post("/login", loginControler.logIn.bind(loginControler));
exports.default = sharedRouter;
