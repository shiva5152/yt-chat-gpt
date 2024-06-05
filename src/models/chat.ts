import mongoose from "mongoose";
import { TChat } from "@/types/server/chat";

const chat = new mongoose.Schema<TChat>(
    {
        userId: {
            type: String,
            required: true,
        },
        videoId: {
            type: Number,
            required: true,
        },
        conversations: [
            {
                query: String,
                gptReply: String,
            }
        ]
    },
    { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model('Chat', chat);

export default Chat;