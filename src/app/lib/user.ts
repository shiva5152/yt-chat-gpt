import { TUser } from "@/types/server/user";
import User from "@/models/user";

export const createUser = async (data: any) => {
    try {
        const user = await User.create({ data })
        return { user }
    } catch (error) {
        return { error }
    }
}