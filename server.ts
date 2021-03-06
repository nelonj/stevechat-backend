import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

config(); //Read .env file lines as though they were env vars.

//Call this script with the environment variable LOCAL set if you want to connect to a local db (i.e. without SSL)
//Do not set the environment variable LOCAL if you want to connect to a heroku DB.

//For the ssl property of the DB connection config, use a value of...
// false - when connecting to a local DB
// { rejectUnauthorized: false } - when connecting to a heroku DB
const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

export const client = new Client(dbConfig);
export const app = express();
export const Express = express;
export const Cors = cors;

app.use(Express.json()); //add body parser to each following route handler
app.use(Cors()) //add CORS support to each following route handler
client.connect();

app.get("/", async (req, res) => {
    try{
        const dbres = await client.query('select * from messages')
        res.json((dbres.rows))
    }
    catch {
        console.log('OH NOOOOO')
        res.status(500).json({
          message: 'Cannot select all from messages table'
        })
      }}
)

app.post("/", async (req, res) => {
    try {
        const {messageText, userId} = req.body
        await client.query('INSERT INTO messages (messagetext, userid) VALUES ($1, $2)', [messageText, userId])
        res.status(201).json({
        message: 'Successful message insert'
        })
    } 
    catch {
        console.log('OH NOOOOO')
        res.status(500).json({
            message: 'Cannot select all from messages table'
        })
    }
})


//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});



