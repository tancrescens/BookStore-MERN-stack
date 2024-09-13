import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

// ROUTE: Create a new Book in MongoDB
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: `Send all required fields: title, author, publishYear`,
      });
    }
    //create new book
    const newBook = {
      title: request.body.title,
      author: request.body.title,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// ROUTE: Read and get ALL books
router.get("/", async (request, response) => {
  try {
    // .find({}) gets all books from database
    const bookList = await Book.find({});
    return response.status(200).json({
      count: bookList.length,
      data: bookList,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
// ROUTE: Read and get SELECTED book
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const selectedBooks = await Book.findById(id);

    return response.status(200).json({
      count: selectedBooks.length,
      data: selectedBooks,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//ROUTE: Update selected book's detail
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: `Send all required fields: title, author, publishYear`,
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({ message: `Book not found` });
    }
    return response.status(200).send({ message: `Updated ${id} successfully` });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// ROUTE: Delete selected book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: `Book not found` });
    }
    return response.status(200).send({ message: `Deleted ${id} successfully` });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

export default router;
