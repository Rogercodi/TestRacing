import express, { Router } from "express";
import path from 'path'
require('dotenv').config({path: path.join(__dirname, 'config', '.env')});
import session from "express-session";
import passport from "passport";
import morgan from "morgan";
import { mongoConection } from './db';
import cors from "cors";
import cookieParser from "cookie-parser";
import { loginPassport } from "./config/passportConfig";
import indexRouter from "./routes/indexRoutes";
import userRoutes from "./routes/userRoutes";

//------------------------------------------------------- end of imports ----------------------------------------------------//

const app = express();
const PORT = process.env.PORT;
// ------------------------------------------------------ end of init options -----------------------------------------------//


mongoConection;
// ------------------------------------------------------ enf of db connection ----------------------------------------------//



// ------------------------------------------------------ end of settings ---------------------------------------------------//


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ['http://localhost:4000', 'http://testracing.ddns.net:80'],
    credentials: true,
   }));


app.use(session({
    secret: 'testracingdev',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser('testracingdev'));


app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
loginPassport(passport);



// Globar Variables


// Routes
app.use(indexRouter);
app.use(userRoutes);


// Static Files



// Server Init
app.listen(PORT, () => {
    console.log(`Server up, listening on port ${PORT}`)
})