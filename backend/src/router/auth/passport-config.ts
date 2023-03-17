import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import {User} from "../../models/userSchema";

export const loginPassport = function (passport: any) {
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                const user = await User
                    .findOne({ email: email })
                    .populate(['sessions', 'vehiculos'])
                    .populate({
                        path: 'vehiculos',
                        populate: {
                            path: 'configuraciones'
                        }
                    }) || undefined

                bcrypt.compare(password, user?.password || "", (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            }
        )
    );

    passport.serializeUser((user: {id:string}, cb:Function) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id: string, cb:Function) => {
        User.findOne({ _id: id }, (err: any, user: any) => {
            cb(err, user);
        });
    });
};
