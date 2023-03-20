import { Request, Response, NextFunction } from "express";
import { VehicleModel } from "../../models/vehicleSchema";
import { IUserRepository, UserRepository } from "../repositories/user-mongodb-repository";

export class VehiclePutController {
    
    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async EditVehicle(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const { body } = req;
            const vehicle = await VehicleModel.findByIdAndUpdate(id, body);
            await vehicle?.save();
            let user = await this.userRepository.getUserById((req?.user as any)._id );
            return res.status(201).send({ message: "Vehicle successfully updated", user });
        } catch (e) {
            console.log(e);
            next();
        }
    }
}
