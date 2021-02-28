import request from 'supertest';
import {app} from "../app";
import createConnection from '../database';
import {getConnection} from "typeorm";

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app)
            .post("/surveys")
            .send({
                title: "Title Example",
                description: "Description Example"
            });
        expect(response.status).toBe(201);
        expect(Object.keys(response.body).length).toBe(4);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("title");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("created_at");

    });

    it("Should be able to get all surveys", async () => {

        const response = await request(app).get("/surveys");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("title");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("created_at");


    });


});