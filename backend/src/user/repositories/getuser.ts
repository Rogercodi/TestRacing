import { User } from "../../models/userSchema";

export class UserRepository {
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
            });;
    }
}
