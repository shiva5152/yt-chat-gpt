import mongoose from 'mongoose';
type Conversation = {
    query: string;
    gptReply: string;
}

export type TChat = {
    userId: string;
    videoId: string;
    conversations: Conversation[];
} & mongoose.Document;