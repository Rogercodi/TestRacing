import { Request, Response, NextFunction } from "express";
import { IUserRepository, UserRepository } from "../repositories/user-mongodb-repository";

export class VehicleDeleteController {
    
    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async deleteVehicle(req: Request, res: Response, next: NextFunction) {
        try {

            const vehicleID = req.params.id;
            const user = await this.userRepository.deleteVehicle((req?.user as any)._id , vehicleID);
            return res.status(200).send({ message: "Vehicle deleted", user });

        } catch (e) {
            console.log(e);
            next();
        }
    }
}
