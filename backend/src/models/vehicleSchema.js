import mongoose, { Schema } from "mongoose";

const vehiculoSchema = new mongoose.Schema({
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

export default mongoose.model('Vehicle', vehiculoSchema);