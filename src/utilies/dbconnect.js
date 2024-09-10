import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "test",
    password: "abhi0601",
    port: 5432,
});

pool.connect((err)=>{
    if(err){
        console.error("connection error",err.stack)
    }else{
        console.log("connection done")
    }
})

export { pool };
