import Note from "../models/noteSchema.js";

// Function to add a new note
export const addNote = async (req, res) => {
  // Extracting title and content from the request body
  const { title, content } = req.body;

  try {
    // Checking if both title and content are provided
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Both title and content are required." });
    }

    // Validating title length (between 4 and 20 characters)
    if (title.length < 4 || title.length > 20) {
      return res
        .status(400)
        .json({ message: "Title should be between 4 and 20 characters." });
    }

    // Validating content length (between 8 and 100 characters)
    if (content.length < 8 || content.length > 100) {
      return res
        .status(400)
        .json({ message: "Content should be between 8 and 100 characters." });
    }

    const user = req.user.id;
    const newNote = new Note({
      title,
      content,
      user,
    });

    // Saving the new note to the database
    await newNote.save();
    return res.status(201).json({ message: "Note added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding note: " + error.message });
  }
};

// Function to get all notes
export const getAllNotes = async (req, res) => {
  try {
    // Fetching all notes from the database
    const response = await Note.find();

    if (response.length === 0) {
      return res.status(404).json({
        message: "Sorry, no data found",
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving notes: " + error.message });
  }
};

// Function to get a single note by ID
export const getSingleNote = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "id not provided." });
    }

    // Fetching a single note by ID from the database
    const response = await Note.findById(id);

    if (!response) {
      return res.status(404).json({
        message:
          "Sorry, no data found for this id. Please check for another one.",
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving note: " + error.message });
  }
};

// Function to update a note by ID
export const updateNote = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "id not provided." });
    }
    const notes = await Note.findById(id);
    const user = req.user.id;

    if (!notes || notes.user !== user) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this note." });
    }

    const { title, content } = req.body;
    // Checking if both title and content are provided
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Both title and content are required." });
    }

    // Validating title length (between 4 and 20 characters)
    if (title.length < 4 || title.length > 20) {
      return res
        .status(400)
        .json({ message: "Title should be between 4 and 100 characters." });
    }

    // Validating content length (between 8 and 100 characters)
    if (content.length < 8 || content.length > 100) {
      return res
        .status(400)
        .json({ message: "Content should be between 8 and 100 characters." });
    }

    const updated_at = new Date();
    const response = await Note.findByIdAndUpdate(
      id,
      { title, content, updated_at },
      { new: true }
    );
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating note: " + error.message });
  }
};

// Function to delete a note by ID
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "id not provided." });
    }
    const notes = await Note.findById(id);
    const user = req.user.id;

    if (!notes || notes.user !== user) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this note." });
    }

    // Deleting the note from the database
    await Note.findByIdAndDelete(id);
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting note: " + error.message });
  }
};
