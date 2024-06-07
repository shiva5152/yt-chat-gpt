type Conversation = {
    query: string;
    gptReply: string;
}

export type TChat = {
    userId: string;
    videoId: number;
    conversations: Conversation[];
}