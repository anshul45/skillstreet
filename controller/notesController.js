import Note from "../models/noteSchema.js";
export const addNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({
      title,
      content,
    });
    await newNote.save();
    res.status(201).send("Note added successfully");
  } catch (error) {
    res.status(500).send("Error adding note: " + error.message);
  }
};
export const getAllNotes = async (req, res) => {
  try {
    const response = await Note.find();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Error adding note: " + error.message);
  }
};
export const getSingleNote = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await Note.findById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Error adding note: " + error.message);
  }
};
export const updateNote = async (req, res) => {
  try {
    const { id } = req.query;
    const { title, content } = req.body;
    const updated_at = new Date();
    const response = await Note.findByIdAndUpdate(
      id,
      { title, content, updated_at },
      { new: true }
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Error adding note: " + error.message);
  }
};
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.query;
    await Note.findByIdAndDelete(id);
    res.status(200).send("Note deleted sucessfully");
  } catch (error) {
    res.status(500).send("Error adding note: " + error.message);
  }
};
