const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    movieName: { type: String, trim: true, unique: true },
    rating: { type: Number, trim: true },
    cast: { type: Array, required: true },
    genre: { type: String, required: true },
    releaseDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
