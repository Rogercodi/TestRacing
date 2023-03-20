import { SessionModel } from "../../models/sessionSchema";
import { Session } from "../domain/Session";
import { IUserRepository } from "../repositories/user-mongodb-repository";

export class UpdateSessionService {
    constructor( private userRepository: IUserRepository) {  }

    async run(sessionId: string, userId: string, session: Session) {
        const mongoSession = await SessionModel.findByIdAndUpdate(sessionId, session);
        if(!session){
            return Promise.reject("Session not found");
        }
        await mongoSession?.save();
        return this.userRepository.getUserById(userId);
    }
}
