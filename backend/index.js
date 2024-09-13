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

// CREATE a new Book in MongoDB
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
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Attempt to connect DB + port
mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "books-collection",
  })
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
