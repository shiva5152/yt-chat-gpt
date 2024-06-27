import errorResponse from "@/app/lib/errorResponse";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Video from "@/models/video";

type Params = {
    [key: string]: {
        videoId: string
    };
};

export const GET = async (request: NextRequest, { params }: Params) => {

    const videoId = params.videoId;
    try {
        const video = await Video.findOne({ videoId }).select("title");

        return NextResponse.json({
            success: true,
            title: video.title,
        });

    } catch (err) {
        return errorResponse("Something went wrong while getting the response", 500);
    }
};