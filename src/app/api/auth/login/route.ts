import { pool } from '../../../../utilies/dbconnect';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, password } = body;

        
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        client.release();

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        
        if (password !== user.password) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
        }

        
        return NextResponse.json({ user: { user_id: user.user_id ,username: user.username, first_name: user.first_name, last_name: user.last_name }, message: 'Login successful' }, { status: 200 });
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
