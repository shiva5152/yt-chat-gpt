import mongoose from "mongoose";
import { TUser } from "@/types/server/user";

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
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            }
        ]
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', user);

export default User;