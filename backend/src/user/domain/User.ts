
import { Types } from "mongoose";
import { Session } from "./Session";
import { Vehicle } from "./Vehicle";

export interface IUser {
    _id: string;
    nombre: string;
    email: string;
    password: string;
    sessions: Session[];
    vehiculos: Vehicle[];
}

export class User implements IUser {

    readonly _id: string;
    readonly nombre: string;
    readonly email: string;
    readonly password: string;
    readonly sessions: Session[];
    readonly vehiculos: Vehicle[];

    private constructor(
        _id: string,
        nombre: string,
        email: string,
        password: string,
        sessions: Session[],
        vehiculos: Vehicle[]
    ) {
        this._id = _id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.sessions = sessions;
        this.vehiculos = vehiculos;
    }

    static fromPrimitives(
        _id: string,
        nombre: string,
        email: string,
        password: string,
        sessions: Session[],
        vehiculos: Vehicle[]
    ) {
        return new User(
            _id,
            nombre,
            email,
            password,
            sessions,
            vehiculos
        )
    }

    toPrimitives() {
        return {
            _id: this._id,
            nombre: this.nombre,
            email: this.email,
            password: this.password,
            sessions: this.sessions.map(s => s.toPrimitives()),
            vehiculos: this.vehiculos.map(v =>v.toPrimitives())
        }
    }
}
