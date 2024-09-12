import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to the bookstore!");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    // attempt to connect to database
    console.log(`App(express, backend) is connected to the database`);
    // attempt to listen to specified port (found in config.js)
    app.listen(PORT, () => {
      console.log(`App(express, backend) is listening on port: ${PORT}`);
    });
  })
  .catch(() => {
    console.log(error);
  });
