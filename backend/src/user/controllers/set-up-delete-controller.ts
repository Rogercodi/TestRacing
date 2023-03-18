import { Request, Response, NextFunction } from "express";
import { Setup } from "../../models/setupSchema";
import { User } from "../../models/userSchema";

export class SetUpDeleteController {
    constructor() { }
    async deleteSetUp(req: Request, res: Response, next: NextFunction) {
        try {

            let ref = req.params.referencia;
            console.log(ref);
            await Setup.findOneAndDelete({ referencia: ref });
            const user = await User.findOne({ _id: (req?.user as any)._id })
                .populate(["sessions", "vehiculos"])
                .populate({
                    path: "vehiculos",
                    populate: {
                        path: "configuraciones",
                    },
                });
            res.status(201).send({ message: 'setup removed!', user })

        } catch (e) {
            console.log(e);
            next();
        }
    }
}
