import { NextResponse } from 'next/server';

export type ErrorResponse = (message?: string, status?: number) => NextResponse<{ success: boolean; message: string; }>;

const errorResponse = (message = "Something went wrong,Internal server Error", status = 500) => {
    return NextResponse.json({
        success: false,
        message: message
    }, { status: status });
}

export default errorResponse;