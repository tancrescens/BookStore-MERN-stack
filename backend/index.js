import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allows ALL Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELTE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELTE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

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
  .connect(process.env.mongoDBURL)
  .then(() => {
    // attempt to connect to database
    console.log(`App(express, backend) is connected to the database`);
    // attempt to listen to specified port (found in config.js)
    try {
      app.listen(process.env.PORT, () => {
        console.log(
          `App(express, backend) is listening on port: ${process.env.PORT}`
        );
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.log(error);
  });
