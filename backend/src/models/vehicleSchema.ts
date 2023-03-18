import mongoose, { Schema, Types } from "mongoose";

export interface IMongoDbVehiculo{
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  alias: string;
  marca:string;
  modelo:string;
  cilindrada:string;
  configuraciones: Types.ObjectId[];
}

const vehiculoSchema = new mongoose.Schema<IMongoDbVehiculo>({
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

export const VehicleModel =  mongoose.model<IMongoDbVehiculo>('Vehicle', vehiculoSchema);
