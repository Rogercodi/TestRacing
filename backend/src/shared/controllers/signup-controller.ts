import { Request, Response, NextFunction } from "express";
import { User } from "../../models/userSchema";

export class SignUpControler {
    constructor() { }

    async signUp(req: Request, res: Response, next: NextFunction) {

        try {
            const { nombre, email, password, confirmPassword } = req.body;

            const userCheck = await User.findOne({ email: email });

            if (userCheck) {
                return res.send("El usuario ya existe");
            }
            if (password !== confirmPassword) {
                return res.send("La contrasena no coincide");
            } else {
                const newUser = new User({
                    nombre,
                    email,
                    password,
                });
                newUser.password = await newUser.encryptPassword(password);
                await newUser.save();
                return res
                    .status(201)
                    .send({ message: "Usuario registrado correctamente!" });
            }

        } catch (e) {
            console.log(e);
            next();
        }
    }
}
