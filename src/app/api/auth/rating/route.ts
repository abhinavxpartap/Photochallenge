import { pool } from '../../../../utilies/dbconnect';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { user_id,image_id,rating } = body;

        const client = await pool.connect();
        await client.query('INSERT INTO ratings (user_id,image_id,rating) VALUES ($1, $2, $3)', [user_id, image_id, rating]);
        await client.query('UPDATE users SET points = points + 1 WHERE user_id = $1', [user_id]); 
        
        client.release();
        
        return NextResponse.json({ success: true, message: 'Rating submitted successfully and user awarded 1 point.' },{ status: 200 });
    } catch (error) {
        console.error('Error submitting rating:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
