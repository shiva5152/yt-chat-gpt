import connectToDb from "@/utils/connectDb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import errorResponse from "@/app/lib/errorResponse";


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
