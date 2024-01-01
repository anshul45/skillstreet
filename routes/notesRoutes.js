import express from "express";
import {
  addNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "../controller/notesController.js";

const notesRouter = express.Router();

notesRouter.get("/allnotes", getAllNotes);
notesRouter.get("/singlenote", getSingleNote);
notesRouter.post("/addnote", addNote);
notesRouter.put("/updatenote", updateNote);
notesRouter.delete("/deletenote", deleteNote);

export default notesRouter;
