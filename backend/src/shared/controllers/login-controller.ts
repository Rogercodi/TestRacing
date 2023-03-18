import { Request, Response, NextFunction } from "express";
import passport from "passport";

export class LoginController {
    constructor() {

    }

    async logIn(req: Request, res: Response, next: NextFunction) {
        try {
            await passport.authenticate("local", async (err: any, user: Express.User) => {

                if (err) throw err;
                if (!user) {
                    res.send("El usuario no existe");
                } else {
                    req.logIn(user, err => {
                        if (err) throw err;
                        res.status(201).send({ message: "Bienvenido!", user, id: (req?.user as any)._id });
                    });
                }
            })(req, res, next);

        } catch (e) {
            console.log(e);
            next();
        }
    }
}
