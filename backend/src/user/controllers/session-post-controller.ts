import { Request, Response, NextFunction } from "express";
import { Session } from "../domain/Session";
import { IUserRepository, UserRepository } from "../repositories/user-mongodb-repository";

export class SessionPostController {

    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async newSession(req: Request, res: Response, next: NextFunction) {
        try {
            const id = (req?.user as any)._id;
            const body = req.body;
            const session = Session.fromPrimitives(body.owner, body.vehiculo, body.circuito, body.tipo, body.fecha, body.mejorvuelta);
            const user = await this.userRepository.newSession(id, session);
            return res.send({ message: "New session stored!", user: user.toPrimitives() });

        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}
