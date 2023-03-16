import mongoose, { Schema } from "mongoose";

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

export default mongoose.model("Session", sessionSchema);
