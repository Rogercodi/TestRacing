import { SessionModel } from "../../models/sessionSchema";
import { IUserRepository } from "../repositories/user-mongodb-repository";

export class UpdateSessionService {
    constructor( private userRepository: IUserRepository) {  }

    async run(sessionId: string, userId: string, body: any) {
        const session = await SessionModel.findByIdAndUpdate(sessionId, body);
        if(!session){
            return Promise.reject("Session not found");
        }
        await session?.save();
        return this.userRepository.getUserById(userId);
    }
}
