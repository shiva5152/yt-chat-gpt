import mongoose from "mongoose";

export type TVideo = {
    _id: mongoose.Schema.Types.ObjectId,
    title: string,
    videoId: string,
    users: mongoose.Schema.Types.ObjectId[]

} & mongoose.Document;