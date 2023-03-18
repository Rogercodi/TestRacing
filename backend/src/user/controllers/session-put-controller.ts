
import  {  NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/getuser";
import { UpdateSessionService } from "../service/put-user-service";

export class SessionPutController {
    constructor() { }
    async EditSession(req: Request, res: Response, next: NextFunction) {

        try {

            const id = req.params.id;
            const { body } = req;

            const repo = new UserRepository();
            const service = new UpdateSessionService(repo);
            const user = await service.run(id, (req.user as any)?._id, body);

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



