import mongoose, { Schema } from "mongoose";

const setupSchema = new mongoose.Schema(
  [{
    vehiculo: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    referencia: {
      type: String,
    },

    neumaticos: 
      {
        delantero: {
          marcaF: String,
          modeloF: String,
          medidasF: String,
          presionFrioF: String,
          presionCalienteF: String,
        },
        trasero: {
          marcaR: String,
          modeloR: String,
          medidasR: String,
          presionFrioR: String,
          presionCalienteR: String,
        },
      },
    
    suspension: 
      {
        delantera: {
          precargaF: String,
          aceiteF: String,
          durezaMuelleF: String,
        },
        trasera: {
          precargaR: String,
          aceiteR: String,
          durezaMuelleR: String,
        },
      },
    

    desarrollo: {
      pino: String,
      plato: String,
    },
  }],

  { timestamps: false }
);

export default mongoose.model("Setup", setupSchema);
