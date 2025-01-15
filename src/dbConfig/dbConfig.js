import { Client } from "pg"

const client = new Client(process.env.SQL_DATABASE_URL);

export async function connect() {
  try {
    await client.connect();
    console.log('Successfully Logged into database');
    try {
      const resp = await client.query("SELECT to_regclass('public.users') IS NOT NULL AS exists")
      if (!resp.rows[0].exists) {
        await client.query(`
          CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL
          )
        `);
        console.log('Table "users" created');
      }
      return client;
    } catch (error) {
      console.log('error checking table');
      console.log(error)
    }
  } catch (err) {
    console.error("error connecting to database:", err);
    process.exit();
  }
}