"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpControler = void 0;
const userSchema_1 = require("../../models/userSchema");
class SignUpControler {
    constructor() { }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, email, password, confirmPassword } = req.body;
                const userCheck = yield userSchema_1.User.findOne({ email: email });
                if (userCheck) {
                    return res.send("El usuario ya existe");
                }
                if (password !== confirmPassword) {
                    return res.send("La contrasena no coincide");
                }
                else {
                    const newUser = new userSchema_1.User({
                        nombre,
                        email,
                        password,
                    });
                    newUser.password = yield newUser.encryptPassword(password);
                    yield newUser.save();
                    return res
                        .status(201)
                        .send({ message: "Usuario registrado correctamente!" });
                }
            }
            catch (e) {
                console.log(e);
                next();
            }
        });
    }
}
exports.SignUpControler = SignUpControler;
