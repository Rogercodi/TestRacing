import mongoose, { model, Schema, Types } from "mongoose";

export interface ISessionSchema {
  owner: Types.ObjectId;
  vehiculo: string;
  circuito:string;
  tipo: string;
  fecha: Date;
  mejorvuelta: string
}

const sessionSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  vehiculo: {
    type: String,
  },
  circuito: {
    type: String,
  },
  tipo: { 
    type: String 
    },
  fecha: Date,
  mejorvuelta: {
    type: String,
  },
});

export const Session = model<ISessionSchema>("Session", sessionSchema);
