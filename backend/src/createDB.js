require("dotenv").config();
const { Client } = require("pg");

(async () => {
  const c = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: "postgres",
  });
  await c.connect();
  await c.query("CREATE DATABASE reviewdb");
  console.log("reviewdb created");
  await c.end();
})().catch((e) => console.error("Error:", e.message));
