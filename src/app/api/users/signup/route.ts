import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

const client  = await connect();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const {name, email, password} = data;
        console.log(data);
        let res = await client.query('select * from users')
        console.log(res.rows);
        
        const existingUser = await client.query("select * from users where email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return NextResponse.json({
                message: 'User with this email already exists',
                done: true,
                status: 400
            });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        await client.query("insert into users(name, email, password) values($1, $2, $3)", [name, email, hashedPassword]);
        res = await client.query('select * from users')
        console.log(res.rows);
        return NextResponse.json({
            message: 'User Created', 
            done: true,
            status: 200
        })
        
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({
            message: 'Error Occurred', 
            done: false,
            status: 500
        })
    }
}