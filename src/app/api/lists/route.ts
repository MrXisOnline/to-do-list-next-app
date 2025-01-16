import { NextRequest, NextResponse } from "next/server";
import { getUserID } from "@/helpers/getIdFromToken";
import { client } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        const userID = await getUserID(request);
        const lists = await client.query('SELECT * FROM lists WHERE userID = $1', [userID])
        console.log(lists.rows)
        return NextResponse.json({
            data: lists.rows, 
            message: 'request completed', 
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "couldn't handle request", 
            status: 500
        })
    }

}

export async function POST(request: NextRequest) {
    try {
        const {name} = await request.json();
        const userID = await getUserID(request);
        await client.query('INSERT INTO lists(userID, name) VALUES($1, $2)', [userID, name]);
        return NextResponse.json({
            message: 'list created successfully', 
            status: 200
        });

    } catch (error) {
        return NextResponse.json({
            message: 'server error', 
            status: 500
        })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const listID = request.nextUrl.searchParams.get('id');
        const userID = await getUserID(request);
        await client.query('DELETE FROM tasks WHERE listID = $1 AND userID = $2', [listID, userID])
        await client.query('DELETE FROM lists WHERE id = $1 AND userID = $2', [listID, userID]);
        return NextResponse.json({
            message: 'list deleted successfully',
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            message: 'server error', 
            status: 500
        })
    }
}