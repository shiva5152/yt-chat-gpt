import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import errorResponse from '@/app/lib/errorResponse';
import Chat from '@/models/chat';
import { auth } from '@clerk/nextjs/server';

export const GET = async (request: NextRequest) => {

    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get("videoId");
    const { userId } = auth();

    try {

        const chatLog = await Chat.findOne({ userId, videoId });

        return NextResponse.json({
            success: true,
            chatLog: chatLog.conversations
        }, { status: 200 });


    } catch (err) {
        return errorResponse("Something went wrong while getting the response", 500);
    }
};



