
import { pool } from '../../../../utilies/dbconnect';
import { NextRequest, NextResponse } from 'next/server';

// Define the POST request handler
export async function POST(req: NextRequest) {
  try {
    
    const body = await req.json();
    const { quiz_description, opening_time, closing_time } = body

    // if (!quizName || !startTime || !endTime) {
    //   return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    // }

    const client = await pool.connect();
    try {
        const existingQuizQuery = `
            SELECT * FROM weekly_quiz
            WHERE opening_time < $1 AND closing_time > $2
        `;
        const existingQuizResult = await client.query(existingQuizQuery, [closing_time, opening_time]);
        if (existingQuizResult.rows.length > 0) {
            return NextResponse.json({ error: 'Another quiz already exists within the specified time range' }, { status: 400 });
        }
      

      const query = `
        INSERT INTO weekly_quiz (quiz_description, opening_time, closing_time)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const result = await client.query(query, [quiz_description, opening_time, closing_time]);
      return NextResponse.json({ quiz: result.rows[0] }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error posting quiz data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
