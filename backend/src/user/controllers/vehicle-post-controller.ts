import { Request, Response, NextFunction } from "express";
import { IUserRepository, UserRepository } from "../repositories/user-mongodb-repository";


export class VehiclePostController {

    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }
    
    async newVehicle(req: Request, res: Response, next: NextFunction) {

        try {
            let id = (req?.user as any)._id;
            const user = await this.userRepository.newVehicle(id, req.body);
            return res.status(201).send({ message: "New vehicle stored!", user });

        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}
