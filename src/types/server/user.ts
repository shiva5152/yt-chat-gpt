import mongoose from "mongoose";

export type TUser = {
    email: string,
    userId: string,
    tokenLeft: number,
    videos: mongoose.Schema.Types.ObjectId[]
}