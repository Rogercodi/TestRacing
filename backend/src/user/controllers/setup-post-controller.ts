import { Request, Response, NextFunction } from "express";
import { IUserRepository, UserRepository } from "../repositories/user-mongodb-repository";

export class SetUpPostController {

    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async addSetUp(req: Request, res: Response, next: NextFunction) {

        try {
            const user = await this.userRepository.newSetUp((req?.user as any)._id, req.body.vehiculo, req.body);
            return res.status(201).send({ message: "Setup succesfully added", user });

        } catch (e) {
            console.log(e);
            next();
        }
    }
}
