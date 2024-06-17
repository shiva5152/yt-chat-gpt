import mongoose from "mongoose";
import { TVideo } from "@/types/server/video";
import User from "./user";

const video = new mongoose.Schema<TVideo>(
    {
        title: {
            type: String,
            required: true,
        },
        videoId: {
            type: String,
            required: true,
        },
        users: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            }
        ]
    },
    { timestamps: true }
);

const Video = mongoose.models.Video || mongoose.model<TVideo>('Video', video);

export default Video;