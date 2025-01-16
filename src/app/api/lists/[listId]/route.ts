import { NextRequest, NextResponse } from 'next/server';
import {client} from '@/dbConfig/dbConfig';
import { getUserID } from '@/helpers/getIdFromToken';

export async function GET(req: NextRequest, { params }: { params: { listId: string } }) {
    try {
        const { listId } = await params;
        console.log(listId);
        const userID = await getUserID(req);
        const list = await client.query('SELECT * FROM tasks WHERE listID = $1 AND userID = $2', [listId, userID]);
        return NextResponse.json({ 
            data: list.rows, 
            message: 'List fetched successfully',
            status: 200});
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching list', 
            status: 500});     
    }
}

export async function POST(req: NextRequest, { params }: { params: { listId: string } }) {
    try {
        const { listId } = await params;
        const Reqbody = await req.json();
        const {name} = Reqbody;
        const userID = await getUserID(req);
        await client.query('INSERT INTO tasks(listID, userID, name) VALUES($1, $2, $3)', [listId, userID, name]);
        return NextResponse.json({
            message: 'task created successfully', 
            status: 200
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'server error', 
            status: 500
        })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { listId: string } }) {
    try {
        const { listId } = await params;
        const taskID = request.nextUrl.searchParams.get('id');
        const userID = await getUserID(request);
        await client.query('DELETE FROM tasks WHERE id = $1 AND listID = $2 AND userID = $3', [taskID, listId, userID]);
        return NextResponse.json({
            message: 'task deleted successfully',
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            message: 'server error', 
            status: 500
        })
    }
}