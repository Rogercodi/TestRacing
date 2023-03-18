import { Request, Response, NextFunction } from "express";
import { User } from "../../models/userSchema";
import { Vehicle } from "../../models/vehicleSchema";

export class VehicleDeleteController {
    constructor() { }

    async deleteVehicle(req: Request, res: Response, next: NextFunction) {
        try {

            const vehicleID = req.params.id;
            const user = await User.findOne({ _id: (req?.user as any)._id })
                .populate([
                    "sessions",
                    "vehiculos",
                ]).populate({
                    path: 'vehiculos',
                    populate: {
                        path: 'configuraciones'
                    }
                });;
            if (!user) {
                return res.status(404).send({ error: "User not found" });
            }
            user.vehiculos = user.vehiculos.filter((item) => {
                return item._id.toString() !== vehicleID;
            });
            await user.save();
            await Vehicle.findOneAndDelete({ _id: vehicleID });
            return res.status(200).send({ message: "post recieved", user });

        } catch (e) {
            console.log(e);
            next();
        }
    }
}
