import { pool } from '../../../../utilies/dbconnect';
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from 'url';

export async function GET(req : NextRequest) {
    try {

      const queryParams = new URLSearchParams(req.url.split('?')[1]); 
      const user_id = queryParams.get('user_id')
      const client = await pool.connect();

      const Query = await client.query('SELECT points FROM users WHERE user_id = $1', [user_id]);
      client.release();
      if (Query.length === 0) {
        return NextResponse.json({ error: 'User not found' });
      }

      const points = Query.rows[0].points;
      return NextResponse.json({ points });
    } catch (error) {
      console.error('Error fetching images and ratings:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
}
