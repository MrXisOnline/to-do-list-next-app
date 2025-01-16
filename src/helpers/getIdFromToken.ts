import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export async function getUserID(request: NextRequest) {
    try {
        const token = request.cookies.get("authToken")?.value || ''
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET_INF!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error("error: " + error.message);
    }
}