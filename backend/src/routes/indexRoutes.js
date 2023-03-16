const Router = require("express").Router();
import User from "../models/userSchema";
import bcrypt from "bcryptjs";
import passport from "passport";
import auth from "../config/auth";
import cors from "cors";

Router.get('/', (req, res) => {
  
  res.send({message: 'testing' })
  
});

Router.get('/usertest', auth.pass, (req, res) => {
  let user = req.user
  res.send({message: 'Authorized', user })
  
});

Router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if(err){return next(err)};
    res.send('Sesion cerrada, hasta la proxima!')
  })
});

Router.post("/signup", async (req, res) => {
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
});


Router.get("/logout", (req, res) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send("Sesion cerrada, hasta pronto!");
  });
});

Router.post("/login", async (req, res, next) => {
    await passport.authenticate("local", async (err, user) => {
      
      if (err) throw err;
      if (!user) {
        res.send("El usuario no existe");
      } else {
        req.logIn(user, err => {
         
          if (err) throw err;
          res.status(201).send({ message: "Bienvenido!", user, id: req.user._id });
        });
      }
    })(req, res, next)
  });




export default Router;
