import errorResponse from "@/app/lib/errorResponse";
import { addTranscriptToPinecone } from "@/app/lib/langchainHelper";
import User from "@/models/user";
import Video from "@/models/video";
import Chat from "@/models/chat";
import { TUser } from "@/types/server/user";
import { TVideo } from "@/types/server/video";
import connectToDb from "@/utils/connectDb";
import { auth } from '@clerk/nextjs/server';
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {

    try {
        const body = await request.json()
        const { videoId } = body;
        const { userId } = auth();

        if (!userId) {
            return errorResponse("Unauthorized", 401);
        }
        if (!videoId) {
            return errorResponse("videoId is required", 400);
        }
        await connectToDb();

        const video = await Video.findOne({ videoId });
        const user = await User.findOne({ userId });

        if (video) {

            const response = await handleExistingVideo(video, user);
            if (response) return response;
        } else {
            const response = await handleNewVideo(videoId, user);
            if (response) return response;
        }

        return NextResponse.json({
            success: true,
            message: "Video's Transcript added successfully"
        }, { status: 200 });

    } catch (err) {
        console.log(err);
        return errorResponse(err instanceof Error ? err.message : "Something went wrong while Inserting the transcript.")
    }
};

const handleExistingVideo = async (video: TVideo, user: TUser) => {

    try {
        if (video.users.includes(user._id)) {
            return errorResponse("Video already exists", 400);
        }
        video.users.push(user._id);
        await video.save();

        user.videos.push(video._id);
        await user.save();
    } catch (error) {
        return errorResponse(error instanceof Error ? error.message : "Something went wrong");
    }
}

const handleNewVideo = async (videoId: string, user: TUser) => {
    const res = await addTranscriptToPinecone(videoId, errorResponse);
    if (res) return res;

    const title = await getVideoTitle(videoId);
    if (!title) {
        return errorResponse("Failed to fetch video title");
    }
    try {
        const newVideo = await Video.create({ videoId, title });

        newVideo.users.push(user._id);
        await newVideo.save();

        user.videos.push(newVideo._id);
        await user.save();
        // initialize chat for the video
        await Chat.create({ videoId, userId: user.userId, conversations: [] });

    } catch (error) {
        return errorResponse(error instanceof Error ? error.message : "Something went wrong")
    }
}

const getVideoTitle = async (videoId: string) => {

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&fields=items(id%2Csnippet(title))&key=${process.env.GOOGLE_YT_API_KEY}`
    const response = await fetch(url);
    const data = await response.json();
    const title: string = data.items[0].snippet.title
    return title;
}
