import { Request, Response, NextFunction } from "express";
import { Setup } from "../../models/setupSchema";
import { User } from "../../models/userSchema";

export class SetUpPutController {
    constructor() { };
    async editSetUp(req: Request, res: Response, next: NextFunction) {

        try {
            await Setup.findByIdAndUpdate(req.body.setupId, req.body);
            const user = await User.findOne({ _id: (req?.user as any)._id })
                .populate(["sessions", "vehiculos"])
                .populate({
                    path: "vehiculos",
                    populate: {
                        path: "configuraciones",
                    },
                });
            res.status(201).send({ message: "Setup succesfully updated", user });
        } catch (e) {
            console.log(e);
            next();
        }

    }
}
