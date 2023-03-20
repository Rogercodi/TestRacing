
import  {  NextFunction, Request, Response } from "express";
import { Session } from "../domain/Session";
import { IUserRepository, UserRepository } from "../repositories/user-mongodb-repository";
import { UpdateSessionService } from "../service/put-user-service";

export class SessionPutController {

    private repo: IUserRepository;
    private service: UpdateSessionService;

    constructor() {
        this.repo = new UserRepository();
        this.service = new UpdateSessionService(this.repo);
    }
    
    async EditSession(req: Request, res: Response, next: NextFunction) {

        try {
            const id = req.params.id;
            const { body } = req;

            const session =  Session.fromPrimitives(body.owner, body.vehiculo, body.circuito, body.tipo, body.fecha, body.mejorvuelta);
            const user = await this.service.run(id, (req.user as any)?._id, session);

            if (user) {
                return res.status(201).send({ message: "Successfully updated", user });
            } else {
                return res.status(404).send({ error: "User not found" });
            }

        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}



