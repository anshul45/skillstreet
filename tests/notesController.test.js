import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/* Connecting to the database for test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

/* closing connection after  test. */
afterEach(async () => {
  await mongoose.connection.close();
});

/* Testing the API endpoints. */
describe("GET /allnotes", () => {
  it("should return all products", async () => {
    const res = await request(app).get("/allnotes");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
