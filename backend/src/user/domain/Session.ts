
export interface ISession {
    owner: string;
    vehiculo: string;
    circuito: string;
    tipo: string;
    fecha: Date;
    mejorvuelta: string
}
export class Session implements ISession {
    readonly owner: string;
    readonly vehiculo: string;
    readonly circuito: string;
    readonly tipo: string;
    readonly fecha: Date;
    readonly mejorvuelta: string

    private constructor(
        owner: string,
        vehiculo: string,
        circuito: string,
        tipo: string,
        fecha: Date,
        mejorvuelta: string,
    ) {
        this.owner = owner;
        this.vehiculo = vehiculo;
        this.circuito = circuito;
        this.tipo = tipo;
        this.fecha = fecha;
        this.mejorvuelta = mejorvuelta;
    }

    public static fromPrimitives(
        owner: string,
        vehiculo: string,
        circuito: string,
        tipo: string,
        fecha: string,
        mejorvuelta: string) {

        if(!owner){
            throw new Error("Owner is mandatory in Session model");
        }

        return new Session(
            owner,
            vehiculo,
            circuito,
            tipo,
            new Date(fecha),
            mejorvuelta
        )
    }

    public toPrimitives() {
        return {
            owner: this.owner,
            vehiculo: this.vehiculo,
            circuito: this.circuito,
            tipo: this.tipo,
            fecha: this.fecha.toISOString(),
            mejorvuelta: this.mejorvuelta,
        }
    }

}
