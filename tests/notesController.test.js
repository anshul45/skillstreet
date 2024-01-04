import request from "supertest";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import notesRouter from "../routes/notesRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use("/api/v1/", notesRouter);

dotenv.config();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTRmNTEwMThkMzA1NDc0NTllYzA3NiIsImlhdCI6MTcwNDM0NDQ4Nn0.upNkyALEj5HH4egxJXCgmDyWy9SBleVvpwPTaRmNrAI";
// /* Connecting to the database for test. */
beforeEach(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
}, 10000);

/* closing connection after  test. */
afterEach(async () => {
  await mongoose.connection.close();
}, 10000);

/* Testing the API endpoints. */
describe("post /addnote", () => {
  it("should add notes", async () => {
    jest.setTimeout(10000);
    const res = await request(app)
      .post("/api/v1/addnote")
      .set("authorization", "bearer " + token)
      .send({
        title: "third note",
        content: "third content",
      });
    if (res.status === 201) {
      expect(res.status).toBe(201);
      expect(res._body.message).toBe("Note added successfully");
    } else {
      expect(res.status).toBe(400);
      expect(res._body.message).toBe("Both title and content are required.");
    }
  });
});

describe("GET /allnotes", () => {
  it("should return all notes", async () => {
    jest.setTimeout(10000);
    const res = await request(app)
      .get("/api/v1/allnotes")
      .set("authorization", "bearer " + token);
    if (res.status === 200) {
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(404);
      expect(res._body.message).toBe("No notes found for this user");
    }
  });
});

describe("GET /singlenotes", () => {
  it("should return single notes by id", async () => {
    jest.setTimeout(10000);
    const res = await request(app)
      .get("/api/v1/singlenote?id=6596eef97f563bb5f603c6e5")
      .set("authorization", "bearer " + token);
    if (res.status === 200) {
      expect(res.status).toBe(200);
    } else if (res.status === 400) {
      expect(res.status).toBe(400);
      expect(res._body.message).toBe("id not provided.");
    } else {
      expect(res.status).toBe(404);
      expect(res._body.message).toBe(
        "Sorry, no data found for this id associated with this user. Please check for another one."
      );
    }
  });
});

describe("put /updateNote", () => {
  it("should update notes by id", async () => {
    jest.setTimeout(10000);
    const res = await request(app)
      .put("/api/v1/updatenote?id=6596eef97f563bb5f603c6e5")
      .set("authorization", "bearer " + token)
      .send({
        title: "updated title",
        content: "updated content",
      });

    if (res.status === 200) {
      expect(res.status).toBe(200);
    } else if (res.status === 401) {
      expect(res.status).toBe(401);
      expect(res._body.message).toBe("Not authorized to update this note.");
    } else if (res.status === 400) {
      expect(res.status).toBe(400);
      expect(res._body.message).toBe("id not provided.");
    } else {
      expect(res.status).toBe(404);
      expect(res._body.message).toBe(
        "Sorry, no data found for this id associated with this user. Please check for another one."
      );
    }
  });
});

describe("delete /deletenote", () => {
  it("should update notes by id", async () => {
    jest.setTimeout(10000);
    const res = await request(app)
      .delete("/api/v1/deletenote?id=6596eef97f563bb5f603c6e5")
      .set("authorization", "bearer " + token);

    if (res.status === 200) {
      expect(res.status).toBe(200);
      expect(res._body.message).toBe("Note deleted successfully");
    } else if (res.status === 400) {
      expect(res.status).toBe(400);
      expect(res._body.message).toBe("id not provided.");
    } else {
      expect(res.status).toBe(401);
      expect(res._body.message).toBe("Not authorized to delete this note.");
    }
  });
});
