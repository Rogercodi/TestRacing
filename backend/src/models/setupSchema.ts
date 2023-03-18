import mongoose, { Schema, Types } from "mongoose";

export interface ISetUp {
  vehiculo: Types.ObjectId;
  referencia: string;
  neumaticos: {
    delantero: {
      marcaF: string,
      modeloF: string,
      medidasF: string,
      presionFrioF: string,
      presionCalienteF: string,
    },
    trasero: {
      marcaR: string,
      modeloR: string,
      medidasR: string,
      presionFrioR: string,
      presionCalienteR: string,
    },
  },
  suspension:
  {
    delantera: {
      precargaF: string,
      aceiteF: string,
      durezaMuelleF: string,
    },
    trasera: {
      precargaR: string,
      aceiteR: string,
      durezaMuelleR: string,
    },
  },
  desarrollo: {
    pino: string,
    plato: string,
  },
}

const setupSchema = new mongoose.Schema<ISetUp>(
  {
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
  },

  { timestamps: false }
);

export const Setup =  mongoose.model<ISetUp>("Setup", setupSchema);
