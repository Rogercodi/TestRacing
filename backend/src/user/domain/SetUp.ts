

export interface Neumaticos {
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
    }
}

export interface Suspension {
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
}

export interface Desarollo {
    pino: string,
    plato: string,
}

export interface ISetUp {
    vehiculo: string;
    referencia: string;
    neumaticos: Neumaticos,
    suspension: Suspension,
    desarrollo: Desarollo,
}
export class SetUp implements ISetUp {
    readonly vehiculo: string;
    readonly referencia: string;
    readonly neumaticos: Neumaticos;
    readonly suspension: Suspension;
    readonly desarrollo: Desarollo;

    constructor(
        vehiculo: string,
        referencia: string,
        neumaticos: Neumaticos,
        suspension: Suspension,
        desarrollo: Desarollo,
    ) {
        this.vehiculo = vehiculo;
        this.referencia = referencia;
        this.neumaticos = neumaticos;
        this.suspension = suspension;
        this.desarrollo = desarrollo;
    }

    public static fromPrimitives(
        vehiculo: string,
        referencia: string,
        neumaticos: Neumaticos,
        suspension: Suspension,
        desarrollo: Desarollo,
    ) {
        return new SetUp(
            vehiculo,
            referencia,
            neumaticos,
            suspension,
            desarrollo,
        )
    }

    public toPrimitives() {
        return {
            vehiculo: this.vehiculo,
            referencia: this.referencia,
            neumaticos: this.neumaticos,
            suspension: this.suspension,
            desarrollo: this.desarrollo,
        }
    }

}
