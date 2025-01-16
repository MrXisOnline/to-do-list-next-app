import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const client  = await connect();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const {email, password} = data;
        console.log(data);
        let res = await client.query('select * from users')
        console.log(res.rows);
        
        const existingUser = await client.query("select * from users where email = $1", [email]);
        if (existingUser.rows.length > 0) {
            const user = existingUser.rows[0]
            const userId = user.id;
            if (!await bcryptjs.compare(password, user.password)) {
                return NextResponse.json({
                    message: 'Incorrect Email/Password',
                    done: true,
                    status: 403
                });
            }
            const tokenData = {
                id: user.id, 
                name: user.name, 
                email: user.email
            }
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_INF!, {expiresIn: "1d"})
            const response = NextResponse.json({
                message: 'User Authenticated',
                done: true,
                status: 200
            })
            response.cookies.set("authToken", token, {
                httpOnly: true,
            })

            return response;
        } else {
            return NextResponse.json({
                message: 'User doesnt exists',
                done: false,
                status: 400
            });
        }
        
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({
            message: 'Error Occurred', 
            done: false,
            status: 500
        })
    }
}