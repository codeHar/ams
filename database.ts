import mysql from "mysql2/promise";
import { CREATE_USER_TABLE } from "./queries/user.queries";
import { CREATE_ARTIST_TABLE } from "./queries/artist.queries";
import { CREATE_MUSIC_TABLE } from "./queries/music.queries";

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
});

if (db) {
  const handleTableCreation = async () => {
    try {
      //creating user table
      await db.query(CREATE_USER_TABLE);

      //creating artist table
      await db.query(CREATE_ARTIST_TABLE);

      //creating artist table
      await db.query(CREATE_MUSIC_TABLE);
    } catch (err) {
      console.log("Problem while creating table: ", err);
    }
  };

  handleTableCreation();
}

export default db;
