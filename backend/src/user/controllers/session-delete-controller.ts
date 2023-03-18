import { Request, Response, NextFunction } from "express";
import { SessionModel } from "../../models/sessionSchema";
import { UserModel } from "../../models/userSchema";
import { IUserRepository, UserRepository } from "../repositories/user-mongodb-repository";

export class SessionDeleteController {

    private userRepository: IUserRepository;
   
    constructor() { 
        this.userRepository = new UserRepository();
    }

    async deleteSession(req: Request, res: Response, next: NextFunction) {

        try {
            const sessionID = req.params.id;
            const user = await this.userRepository.deleteUserSession((req?.user as any)._id, sessionID);
            return res.send({ message: "Session deleted", user });

        } catch (e) {
            console.log(e);
            next();
        }
    }
}
