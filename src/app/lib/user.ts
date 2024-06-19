import User from "@/models/user";
import connectToDb from "@/utils/connectDb";

export const createUser = async (data: any) => {
    try {
        await connectToDb();
        const user = await User.create(data);
        return { user }
    } catch (error) {
        return { error }
    }
}