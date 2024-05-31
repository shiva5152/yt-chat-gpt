import { NextResponse } from 'next/server';

const errorResponse = (message = "Something went wrong,Internal server Error", status = 500) => {
    return NextResponse.json({
        success: false,
        message: message
    }, { status: status });
}

export default errorResponse;