import { TUser } from "@/types/server/user";
import User from "@/models/user";
import connectToDb from "@/utils/connectDb";

export const createUser = async (data: any) => {
    try {
        console.log(data, "into user");
        await connectToDb();
        const user = await User.create(data);
        return { user }
    } catch (error) {
        return { error }
    }
}