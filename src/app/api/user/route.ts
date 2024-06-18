import connectToDb from "@/utils/connectDb";
import Video from "@/models/video";
import User from "@/models/user";
import { NextResponse } from "next/server";
import errorResponse from "@/app/lib/errorResponse";
import { auth } from '@clerk/nextjs/server';
import mongoose from "mongoose";


export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const { email, userId } = body;

        if (!email) {
            return errorResponse("Email is required", 400);
        }
        await connectToDb();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return errorResponse("User already exists with this email", 409);
        }
        const newUser = await User.create({ email, userId, tokenLeft: 3000 });

        return NextResponse.json({
            message: "User is created",
            user: newUser,
        }, { status: 201 });

    } catch (err) {
        return errorResponse(err instanceof Error ? "Error in creating user" + err.message : "Something went wrong while creating user.");
    }
};

export const GET = async (request: Request) => {

    const { userId } = auth();
    // const userId = "user_2h7sW74Wz33zzDQtBBWC3D56XMw"
    console.log(userId);
    try {

        await connectToDb();

        const user = await User.findOne({ userId }).populate({
            model: Video,
            path: "videos",
            select: "title videoId",
        });

        return NextResponse.json({
            message: "User is created",
            user: user,
        }, { status: 200 });

    } catch (err) {
        console.log(err);
        return errorResponse(err instanceof Error ? err.message : "Something went wrong while creating user.");
    }
};

