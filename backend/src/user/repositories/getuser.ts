import { Document, Types } from "mongoose";
import { IUser, User } from "../../models/userSchema";

export interface IUserRepository{
    getUserById(userId: string): Promise<(Document<unknown, any, IUser> & IUser & Required<{
        _id: Types.ObjectId;
    }>) | null>
}

export class UserRepository implements IUserRepository{
    async getUserById(userId: string) {
        return User.findOne({ _id: userId })
            .populate([
                "sessions",
                "vehiculos",
            ])
            .populate({
                path: 'vehiculos',
                populate: {
                    path: 'configuraciones'
                }
            });
    }
}
