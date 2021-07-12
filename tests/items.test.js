import { afterAll, expect } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app.js";
import connection from "../src/database.js";

beforeEach( async () => {
    await connection.query("DELETE FROM myList");
});

afterAll( () => {
    connection.end();
})

describe("GET /items", () => {
    it("return status 200", async () => {
        const result = await supertest(app).get("/items");
        expect(result.status).toEqual(200);
    });
    it("returns the inserted items", async () => {
        await connection.query("INSERT INTO myList (text) VALUES ('teste1'), ('teste2')");
        const result = await supertest(app).get("/items");
        expect(result.body.length).toEqual(2);
    })
});

describe("POST /items", () => {

});