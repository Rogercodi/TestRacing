import { Request, Response, NextFunction } from "express";
import { Setup } from "../../models/setupSchema";
import { User } from "../../models/userSchema";
import { Vehicle } from "../../models/vehicleSchema";

export class SetUpPostController {
    constructor() { }
    async addSetUp(req: Request, res: Response, next: NextFunction) {
        try {

            const setUp = new Setup(req.body);
            await setUp.save();
            let vehicle = await Vehicle.findById(req.body.vehiculo);
            vehicle?.configuraciones.push(setUp._id);
            await vehicle?.save();

            const user = await User.findOne({ _id: (req?.user as any)._id })
                .populate(["sessions", "vehiculos"])
                .populate({
                    path: "vehiculos",
                    populate: {
                        path: "configuraciones",
                    },
                });

            return res.status(201).send({ message: "Setup succesfully added", user });

        } catch (e) {
            console.log(e);
            next();
        }
    }
}
