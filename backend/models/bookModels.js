import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      requited: true,
    },
    publishYear: {
      type: Number,
      requited: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("books", bookSchema);
