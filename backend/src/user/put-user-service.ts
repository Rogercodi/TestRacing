import { UserRepository } from "./getuser";

export class UpdateSessionService {
    constructor( private userRepository: UserRepository) {  }

    async run(sessionId: string, userId: string, body: any) {

        console.log(sessionId, body);
        // const session = await Session.findByIdAndUpdate(id, body);
        // await session.save();
        return this.userRepository.getUserById(userId);
    }
}