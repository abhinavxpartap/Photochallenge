import { pool } from '../../../../utilies/dbconnect';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      const { username, password, first_name, last_name, mobile_number } = body;

      // Check if username already exists
      const client = await pool.connect();
      const existingUser = await client.query('SELECT * FROM users WHERE username = $1', [username]);
      client.release();

      if (existingUser.rows.length > 0) {
         return NextResponse.json({ users: null, message: "Username already exists" }, { status: 409 });
      }

      // Insert new user into the database
      const insertQuery = 'INSERT INTO users (username, password, first_name, last_name, mobile_number) VALUES ($1, $2, $3, $4, $5)';
      const values = [username, password, first_name, last_name, mobile_number];

      const clientInsert = await pool.connect();
      await clientInsert.query(insertQuery, values);
      clientInsert.release();

      return NextResponse.json({ message: "User created successfully" }, { status: 201 });
   } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
   }
}
