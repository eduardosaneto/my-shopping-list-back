import express from "express";
import cors from "cors";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/items", async (req, res) => {
    try {
    const list = await connection.query(`
        SELECT * FROM myList`);

    res.send(list.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


export default app;
