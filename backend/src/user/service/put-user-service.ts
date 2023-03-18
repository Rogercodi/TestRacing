import { Session } from "../../models/sessionSchema";
import { UserRepository } from "../repositories/getuser";

export class UpdateSessionService {
    constructor( private userRepository: UserRepository) {  }

    async run(sessionId: string, userId: string, body: any) {
        const session = await Session.findByIdAndUpdate(sessionId, body);
        if(!session){
            return Promise.reject("Session not found");
        }
        await session?.save();
        return this.userRepository.getUserById(userId);
    }
}
