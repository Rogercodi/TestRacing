import mongoose from "mongoose";
import path from "path";
require('dotenv').config({path: path.join(__dirname, 'config', '.env')});

export const mongoConection = mongoose
  .connect('mongodb+srv://mpguti:vsc@cluster0.zxkijns.mongodb.net/?retryWrites=true&w=majority')
  .then((data) => console.log("Database connection established"))
  .catch((err) => {if (err) throw err});