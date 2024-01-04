import express from "express";
import {
  addNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "../controller/notesController.js";
import tokenMiddleware from "../middleware/tokenMiddleware.js";

const notesRouter = express.Router();

notesRouter.get("/allnotes", tokenMiddleware, getAllNotes);
notesRouter.get("/singlenote", tokenMiddleware, getSingleNote);
notesRouter.post("/addnote", tokenMiddleware, addNote);
notesRouter.put("/updatenote", tokenMiddleware, updateNote);
notesRouter.delete("/deletenote", tokenMiddleware, deleteNote);

export default notesRouter;
