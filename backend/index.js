import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to the bookstore!");
});

// ROUTE: Create a new Book in MongoDB
app.post("/newBook", async (request, response) => {
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
app.get("/getBooks", async (request, response) => {
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
app.get("/getBooks/:id", async (request, response) => {
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
app.put("/getBooks/:id", async (request, response) => {
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
app.delete("/getBooks/:id", async (request, response) => {
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

// Attempt to connect DB + port
mongoose
  // .connect(mongoDBURL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   dbName: "books-collection",
  // })
  .connect(mongoDBURL)
  .then(() => {
    // attempt to connect to database
    console.log(`App(express, backend) is connected to the database`);
    // attempt to listen to specified port (found in config.js)
    try {
      app.listen(PORT, () => {
        console.log(`App(express, backend) is listening on port: ${PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch(() => {
    console.log(error);
  });
