import mongoose from "mongoose";
import { TUser } from "@/types/server/user";
import Video from "./video";

const user = new mongoose.Schema<TUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        tokenLeft: {
            type: Number,
            required: true,
        },
        videos: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Video",
            }
        ]
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<TUser>('User', user);

export default User;