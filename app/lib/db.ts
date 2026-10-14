import { Pool } from "pg";

const port: number = Number(process.env.PG_PORT);

const connectionPool = new Pool({
   host: process.env.PG_HOST,
   user: process.env.PG_USERNAME,
   port: port,
   password: process.env.PG_PASSWORD,
   database: process.env.PG_DATABASE

});


const connection = await connectionPool.connect();

export default connection;