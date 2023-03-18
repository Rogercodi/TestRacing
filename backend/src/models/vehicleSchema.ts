import mongoose, { Schema, Types } from "mongoose";

export interface IVehiculo{
  owner: Types.ObjectId;
  alias: string;
  marca:string;
  modelo:string;
  cilindrada:string;
  configuraciones: Types.ObjectId[];
}

const vehiculoSchema = new mongoose.Schema<IVehiculo>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  alias: {
    type: String,
  },

  marca: {
    type: String,
    
  },
  modelo: {
    type: String,
    
  },
  cilindrada: {
    type: String,
  },
  configuraciones: [
    {
      type: Schema.Types.ObjectId,
      ref: "Setup",
    },
  ],
});

export const Vehicle =  mongoose.model<IVehiculo>('Vehicle', vehiculoSchema);
