import { MongoClient } from "mongodb";
import mysql from "mysql2/promise";

import { mongoURI } from "./secrets.js";
import { mysqlConnect } from "./secrets.js";

const db1 = await mysql.createConnection(mysqlConnect);

const query = "SELECT * FROM movies";

const [movieList] = await db1.execute(query);
const mongoConnection = new MongoClient(mongoURI);
await mongoConnection.connect();

const mongoCollection = mongoConnection.db("c11-practice");
await mongoCollection.collection("movies").insertMany(movieList);
mongoConnection.close();

db1.end();

