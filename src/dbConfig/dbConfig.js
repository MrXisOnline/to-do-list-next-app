import { Client } from "pg";

const client = new Client(process.env.SQL_DATABASE_URL);

async function initialize() {
  try {
    await client.connect();
    console.log('Successfully Logged into database');
    const resp = await client.query("SELECT to_regclass('public.users') IS NOT NULL AS exists");
    if (!resp.rows[0].exists) {
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(128) NOT NULL,
          password VARCHAR(128) NOT NULL,
          email VARCHAR(128) UNIQUE NOT NULL
        );
      `);
      await client.query(`
        CREATE TABLE lists (
          id SERIAL PRIMARY KEY, 
          userID INTEGER REFERENCES users(id),
          name VARCHAR(128) NOT NULL
        );
      `);
      await client.query(`
        CREATE TABLE tasks (
          id SERIAL PRIMARY KEY, 
          listID INTEGER REFERENCES lists(id),
          userID INTEGER REFERENCES users(id),
          name VARCHAR(128) NOT NULL
        );
      `);
      console.log('Tables "users", "lists", and "tasks" created');
    }
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit();
  }
}

initialize();

export { client };
