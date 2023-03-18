import { Document, ObjectId, Types } from "mongoose";
import { MongoDbUser, UserModel } from "../../models/userSchema";
import { User } from "../domain/User";
import { IMongoDbSessionSchema, SessionModel } from "../../models/sessionSchema";
import { Session } from "../domain/Session";
import { IMongoDbVehiculo, VehicleModel } from "../../models/vehicleSchema";
import { Vehicle } from "../domain/Vehicle";
import { IMongoDbSetUp, SetupModel } from "../../models/setupSchema";
import { SetUp } from "../domain/SetUp";

export interface IUserRepository {
    getUserById(userId: string): Promise<User>;
    deleteUserSession(userId: string, sessionId: string): Promise<User>;
    newSession(userId: string, session: any): Promise<User>;
    newSetUp(userId: string, vehicleId: string, setUp: any): Promise<User>;
    deleteVehicle(userId: string, vehicleId: string): Promise<User>;
    newVehicle(userId: string, vehicle: any): Promise<User>
}

export class UserRepository implements IUserRepository {

    async newVehicle(userId: string, vehicle: any) {

        let newVehicle = new VehicleModel(vehicle);
        await newVehicle.save();
        let user = await UserModel.findOne({ _id: userId });
        user?.vehiculos.push(newVehicle._id);
        await user?.save();

        return this.getUserById(userId);

    }

    async deleteVehicle(userId: string, vehicleId: string) {
        const user = await this.getMongouserById(userId);
        if (!user) {
            return Promise.reject("user not found");
        }

        user.vehiculos = user.vehiculos.filter((item) => {
            return item._id.toString() !== vehicleId;
        });
        await user.save();
        await VehicleModel.findOneAndDelete({ _id: vehicleId });
        return this.getUserById(userId);
    }


    async newSetUp(userId: string, vehicleId: string, setUp: any) {

        const newSetUp = new SetupModel(setUp);
        await newSetUp.save();
        let vehicle = await VehicleModel.findById(vehicleId);
        vehicle?.configuraciones.push(setUp._id);
        await vehicle?.save();

        return this.getUserById(userId);
    }

    async deleteUserSession(userId: string, sessionId: string): Promise<User> {

        const user = await this.getMongouserById(userId);
        if (!user) {
            return Promise.reject("user not found");
        }

        user.sessions = user.sessions.filter((item) => {
            return item._id.toString() !== sessionId;
        });

        await user.save();
        await SessionModel.findOneAndDelete({ _id: sessionId });

        return this.toUser(user);
    }

    async newSession(userId: string, session: any) {

        const newSession = new SessionModel(session);
        await newSession.save();
        const userToUpdate = await UserModel.findOne({ _id: userId });
        userToUpdate?.sessions.push(newSession._id);
        await userToUpdate?.save();
        return this.getUserById(userId);
    }

    async getUserById(userId: string) {

        const user = await this.getMongouserById(userId);
        if (user) {
            return this.toUser(user);
        }
        return Promise.reject("User not found");
    }

    private async getMongouserById(userId: string) {
        return UserModel.findOne({ _id: userId })
            .populate<{ sessions: IMongoDbSessionSchema[] }>(["sessions"])
            .populate<{ vehiculos: (Omit<IMongoDbVehiculo, "configuraciones"> & { configuraciones: IMongoDbSetUp[] })[] }>(["vehiculos"])
            .populate({
                path: 'vehiculos',
                populate: {
                    path: 'configuraciones'
                }
            });
    }

    private toUser(
        user:
            Omit<
                Omit<Document<unknown, any, MongoDbUser> & MongoDbUser & Required<{ _id: Types.ObjectId; }>,
                    "sessions">
                & { sessions: IMongoDbSessionSchema[]; }
                , "vehiculos"
            > & {
                vehiculos: (Omit<IMongoDbVehiculo, "configuraciones"> & { configuraciones: IMongoDbSetUp[] })[];
            }) {

        const parsed = User.fromPrimitives(
            user?._id.toString(),
            user?.nombre,
            user?.email,
            user?.password,
            user?.sessions.map(s => Session.fromPrimitives(
                s.owner.toString(),
                s.vehiculo,
                s.circuito,
                s.tipo,
                s.fecha.toISOString(),
                s.mejorvuelta
            )),
            user?.vehiculos.map(v => Vehicle.fromPrimitives(
                v.owner.toString(),
                v.alias,
                v.marca,
                v.modelo,
                v.cilindrada,
                v.configuraciones.map(su => SetUp.fromPrimitives(
                    su.vehiculo.toString(),
                    su.referencia,
                    su.neumaticos,
                    su.suspension,
                    su.desarrollo,
                ))
            ))
        );
        return parsed;
    }
}
