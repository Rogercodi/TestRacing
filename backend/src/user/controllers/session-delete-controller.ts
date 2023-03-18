import { Request, Response, NextFunction } from "express";
import { Session } from "../../models/sessionSchema";
import { User } from "../../models/userSchema";

export class SessionDeleteController{
    constructor(){}

    async deleteSession(req: Request, res: Response, next: NextFunction){
        try{
            const sessionID = req.params.id;
            const user = await User.findOne({ _id: (req?.user as any)._id }).populate([
              "sessions",
              "vehiculos",
            ]);
            if(!user){
                return res.status(404).send({err:"User not found"});
            }
          
            user.sessions = user.sessions.filter((item) => {
              let b = item.toString();
              return item._id.toString() !== sessionID;
            });
            await user.save();
            await Session.findOneAndDelete({ _id: sessionID });
            return res.send({ message: "post recieved", user });
            
        }catch(e){
            console.log(e);
            next();
        }
    }
}
