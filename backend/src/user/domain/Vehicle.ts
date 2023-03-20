import { SetUp } from "./SetUp";

export interface IVehicle {
    owner: string;
    alias: string;
    marca: string;
    modelo: string;
    cilindrada: string;
    configuraciones: SetUp[];
}

export class Vehicle implements IVehicle {
    readonly owner: string;
    readonly alias: string;
    readonly marca: string;
    readonly modelo: string;
    readonly cilindrada: string;
    readonly configuraciones: SetUp[];

    private constructor(
        owner: string,
        alias: string,
        marca: string,
        modelo: string,
        cilindrada: string,
        configuraciones: SetUp[]
    ) {
        this.owner = owner;
        this.alias = alias;
        this.marca = marca;
        this.modelo = modelo;
        this.cilindrada = cilindrada;
        this.configuraciones = configuraciones;
    }

    public static fromPrimitives(
        owner: string,
        alias: string,
        marca: string,
        modelo: string,
        cilindrada: string,
        configuraciones: SetUp[]) {
        return new Vehicle(
            owner,
            alias,
            marca,
            modelo,
            cilindrada,
            configuraciones,
        );
    }

    public toPrimitives() {
        return {
            owner: this.owner,
            alias: this.alias,
            marca: this.marca,
            modelo: this.modelo,
            cilindrada: this.cilindrada,
            configuraciones: this.configuraciones.map(configuracion => configuracion.toPrimitives()),
        }
    }
}
