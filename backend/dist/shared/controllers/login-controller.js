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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const passport_1 = __importDefault(require("passport"));
class LoginController {
    constructor() {
    }
    logIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield passport_1.default.authenticate("local", (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    if (!user) {
                        res.send("El usuario no existe");
                    }
                    else {
                        req.logIn(user, err => {
                            if (err)
                                throw err;
                            res.status(201).send({ message: "Bienvenido!", user, id: (req === null || req === void 0 ? void 0 : req.user)._id });
                        });
                    }
                }))(req, res, next);
            }
            catch (e) {
                console.log(e);
                next();
            }
        });
    }
}
exports.LoginController = LoginController;
