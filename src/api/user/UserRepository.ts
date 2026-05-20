import type { User } from "../../entities/chat/domainTypes";
import { apiFetch } from "../apiFetcher";

class UserRepository {

    async loadMe(): Promise<User|null>{
        const response = await apiFetch<User>("https://localhost:7110/api/users/me")
        if(response.status !== 200) {
            throw Error("User not found")
        }
        return response.data;
    }
}


export const userRepository = new UserRepository();