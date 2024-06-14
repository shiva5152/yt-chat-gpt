import mongoose from "mongoose";

export type TUser = {
    _id: mongoose.Schema.Types.ObjectId,
    email: string,
    userId: string,
    tokenLeft: number,
    videos: mongoose.Schema.Types.ObjectId[]
} & mongoose.Document;