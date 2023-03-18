import { Request, Response, NextFunction } from "express";
import { SetupModel } from "../../models/setupSchema";
import { UserModel } from "../../models/userSchema";
import { IUserRepository, UserRepository } from "../repositories/user-mongodb-repository";

export class SetUpDeleteController {

    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
        console.log(this.userRepository);
    }
    async deleteSetUp(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(this.userRepository);
            let ref = req.params.referencia;

            await SetupModel.findOneAndDelete({ referencia: ref });
            const user = await this.userRepository.getUserById((req?.user as any)._id);
            res.status(201).send({ message: 'setup removed!', user })

        } catch (e) {
            console.log(e);
            next();
        }
    }
}
