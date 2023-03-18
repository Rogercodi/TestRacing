import { Request, Response, NextFunction } from "express";
import { User } from "../../models/userSchema";
import { Vehicle } from "../../models/vehicleSchema";

export class VehiclePutController {
    constructor() { }

    async EditVehicle(req: Request, res: Response, next: NextFunction) {
        try {

            const id = req.params.id;
            const { body } = req;
            const vehicle = await Vehicle.findByIdAndUpdate(id, body);
            await vehicle?.save();
            let user = await User.findOne({ _id: (req?.user as any)._id })
                .populate([
                    "sessions",
                    "vehiculos",
                ]).populate({
                    path: 'vehiculos',
                    populate: {
                        path: 'configuraciones'
                    }
                });;
            return res.status(201).send({ message: "Vehicle successfully updated", user });
        } catch (e) {
            console.log(e);
            next();
        }
    }
}
