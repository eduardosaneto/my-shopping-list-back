import express from "express";
import cors from "cors";
import { insertSchema } from "./schemas/insertSchema.js";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/items", async (req, res) => {
    try {
    const list = await connection.query(`
        SELECT * FROM myList`);

    res.send(list.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post("/items", async (req, res) => {
    try {
    const validation = insertSchema.validate(req.body);
    const { text } = req.body;

    if (validation.error) {
        return res.sendStatus(400);
    }

    await connection.query(`
        INSERT INTO myList (text) VALUES ($1);
    `,[text]);

    res.sendStatus(201);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default app;
