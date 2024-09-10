import { NextApiRequest } from "next";
import fs from "fs/promises";
import path from "path";
import { pool } from '../../../../utilies/dbconnect';
import { NextRequest, NextResponse } from 'next/server';


export const middleware = {
    bodyParser: false,
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const user_id = formData.get('user_id');
    const text_data = formData.getAll('text_data');
    const files = formData.getAll('file');

    if (!user_id || !text_data || !files) {
      return NextResponse.json({ error: 'User ID, text data, and at least one file are required.' });
    }

   
    const imagesDir = path.join(process.cwd(), "/public/images");
    await fs.mkdir(imagesDir, { recursive: true });

    const imagePaths: string[] = [];
     
    
    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          const file = value as File;
          const arrayBuffer = await file.arrayBuffer();
          const fileName = file.name;
          const filePath = path.join(imagesDir, fileName);
          await fs.writeFile(filePath, Buffer.from(arrayBuffer));
          imagePaths.push(filePath);
        }
      }
      const textData: string[] = [];
      for (const [key, value] of formData.entries()) {
        if (key.startsWith('text_data')) {
            textData.push(value as string);
       }
      }


   
    const client = await pool.connect();
    const query = 'INSERT INTO images (user_id, text_data, image_data) VALUES ($1, $2, $3)';

   
    for (let i = 0; i < imagePaths.length; i++) {
      const values = [user_id, textData[i], imagePaths[i]]; 
      await client.query(query, values);
    }
    await client.query('UPDATE users SET points = points + 1 WHERE user_id = $1', [user_id]); 
    client.release();

    return NextResponse.json({ success: true, text_data: textData, message: 'Images uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading images:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}
