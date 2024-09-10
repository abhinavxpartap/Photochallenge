import { pool } from '../../../../utilies/dbconnect';
import { NextRequest, NextResponse } from "next/server"; 
import { URLSearchParams } from 'url';

export async function GET(req : NextRequest) {
    try {

      const queryParams = new URLSearchParams(req.url.split('?')[1]); 
      const user_id = queryParams.get('user_id')
      const client = await pool.connect();

      const imagesQuery = await client.query('SELECT * FROM images WHERE user_id = $1', [user_id]);
      const images = imagesQuery.rows;

      if (!images || images.length === 0) {
        client.release();
        return  NextResponse.json({ error: 'No images found for the user' });
      }

      
      let totalRating = 0;
      let totalImages = 0;

      for (const image of images) {
        const ratingQuery = await client.query('SELECT rating FROM ratings WHERE image_id = $1', [image.image_id]);
        const rating = ratingQuery.rows[0];

        if (rating) {
          totalRating += rating.rating;
          totalImages++;
        }
      }

      client.release();

      if (totalImages === 0) {
         return NextResponse.json({ error:"0"});
      }

      // Calculate the average rating
      const averageRating = (totalRating / totalImages).toFixed(1);

      return NextResponse.json({ averageRating });
    } catch (error) {
      console.error('Error fetching images and ratings:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
}
