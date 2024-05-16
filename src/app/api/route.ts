import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { YoutubeTranscript } from 'youtube-transcript';

export const POST = async (request: NextRequest) => {
    const body = await request.json()
    const { url } = body;
    try {
        const transcriptResponse = await YoutubeTranscript.fetchTranscript(
            url
        );
        if (!transcriptResponse) {
            return NextResponse.json({
                success: false,
                message: "Failed to fetch transcript!",
            });
        }
        let transcript = "";
        transcriptResponse.forEach((line) => {
            transcript += line.text;
        });
        return NextResponse.json({
            success: true,
            transcript: transcript,
        });
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};
