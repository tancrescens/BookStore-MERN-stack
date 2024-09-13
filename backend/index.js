import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to the bookstore!");
});

app.use("/books", booksRoute);

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
