
import express, { Application, json, NextFunction, Request, Response, Router, urlencoded } from "express";
import { UserRepository } from "./getuser";
import { UpdateSessionService } from "./put-user-service";

const router = express.Router();

class SessionPutController {
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
            next(e)
        }
    }
}
const controller = new SessionPutController();

router.put("/editsession/:id", controller.EditSession.bind(controller));
export default router;


