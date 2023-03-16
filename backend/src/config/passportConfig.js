import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import userDb from "../models/userSchema";

export const loginPassport = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await userDb
          .findOne({ email: email })
          .populate(['sessions', 'vehiculos'])
          .populate({
            path: 'vehiculos',
            populate: { 
              path: 'configuraciones'
            }
          })

        bcrypt.compare(password, user.password, (err, result) => {
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

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    userDb.findOne({ _id: id }, (err, user) => {
      cb(err, user);
    });
  });
};
