import { Request, Response, NextFunction } from "express";
import { SetupModel } from "../../models/setupSchema";
import { UserModel } from "../../models/userSchema";
import { IUserRepository, UserRepository } from "../repositories/user-mongodb-repository";

export class SetUpPutController {

    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async editSetUp(req: Request, res: Response, next: NextFunction) {

        try {
            await SetupModel.findByIdAndUpdate(req.body.setupId, req.body);
            const user = this.userRepository.getUserById((req?.user as any)._id);
            res.status(201).send({ message: "Setup succesfully updated", user });
        } catch (e) {
            console.log(e);
            next();
        }

    }
}
