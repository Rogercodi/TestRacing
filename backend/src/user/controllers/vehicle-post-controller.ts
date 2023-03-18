import { Request, Response, NextFunction } from "express";
import { User } from "../../models/userSchema";
import { Vehicle } from "../../models/vehicleSchema";

export class VehiclePostController {
    constructor() { }
    async newVehicle(req: Request, res: Response, next: NextFunction) {

        try{
            let id = (req?.user as any)._id;
            let newVehicle = new Vehicle(req.body);
            await newVehicle.save();
            let user = await User.findOne({ _id: id });
            user?.vehiculos.push(newVehicle._id);
            await user?.save();
            user = await User.findOne({ _id: id }).populate(["sessions", "vehiculos"]);
            return res.status(201).send({ message: "New vehicle stored!", user });

        }catch(e){
            console.log(e);
            next(e);
        }
    }
}
