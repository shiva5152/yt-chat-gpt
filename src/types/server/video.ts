import mongoose from "mongoose";

export type TVideo = {
    title: string,
    videoId: string,
    users: mongoose.Schema.Types.ObjectId[]

}