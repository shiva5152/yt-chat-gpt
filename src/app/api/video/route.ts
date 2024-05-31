import errorResponse from "@/app/lib/errorResponse";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    console.log(id)

    try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&fields=items(id%2Csnippet(title))&key=AIzaSyAui2uVWThN0H7VpqtbsfWK2vv1GPwBd5o`
        const response = await fetch(url);
        const data = await response.json();

        return NextResponse.json({
            success: true,
            title: data.items[0].snippet.title,
        });

    } catch (err) {
        return errorResponse("Something went wrong while getting the response", 500);
    }
};