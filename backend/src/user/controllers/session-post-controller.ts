import { Request, Response, NextFunction } from "express";
import { Session } from "../../models/sessionSchema";
import { User } from "../../models/userSchema";

export class SessionPostController{
    constructor(){}
    async newSession(req: Request, res: Response, next: NextFunction){
        try{
            const id = (req?.user as any)._id;
            const newSession = new Session(req.body);
            let user = await User.findOne({_id: id});
            user?.sessions.push(newSession._id);
            await user?.save();
            user = await User.findOne({ _id: id }).populate(["sessions", "vehiculos"]);
            return res.send({ message: "New session stored!", user });

        }catch(e){
            console.log(e);
            next(e);
        }
    }
}
