import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: 'logout success', 
            status: 200
        })
        response.cookies.set("authToken", "", {httpOnly: true, expires: new Date(0)});
        return response;
        
    } catch (error) {
        return NextResponse.json({
            message: 'server error', 
            status: 500
        })
    }
}