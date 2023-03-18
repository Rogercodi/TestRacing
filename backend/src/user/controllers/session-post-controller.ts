import { Request, Response, NextFunction } from "express";
import { SessionModel } from "../../models/sessionSchema";
import { UserModel } from "../../models/userSchema";
import { IUserRepository, UserRepository } from "../repositories/user-mongodb-repository";

export class SessionPostController {

    private userRepository: IUserRepository;

    constructor() { 
        this.userRepository = new UserRepository();
    }

    async newSession(req: Request, res: Response, next: NextFunction) {
        try {
            const id = (req?.user as any)._id;
            const user = await this.userRepository.newSession(id, req.body);
            return res.send({ message: "New session stored!", user });

        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}
