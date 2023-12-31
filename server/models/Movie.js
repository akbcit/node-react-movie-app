const mongoose = require("mongoose");

// Create a new schema for uploaded documents
const MovieSchema = mongoose.Schema(
  {
    tmdbID: Number,
    title: String,
    description: String,
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    /* 1536 numbers in array since we will use OpenAI ada embeddings */
    embedding: [Number],
  },
  {
    collection: "movies",
  }
);

// Create a model from the schema
const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
