const express = require("express");
const movie = require("../model/MovieModel.js");

const router = express.Router();
var { authorizedUser } = require("../middleware/Authorization.js");

////// authorizedUser ////// To Authenticate the user with JWT token

//  Post the movie
router.post("/postdetails", async (req, res) => {
  console.log(req.body);
  try {
    const newMovie = new movie(req.body);
    const savedJob = await newMovie.save();

    res.status(200).send(savedJob);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

//  Get all movie

router.get("/getallmovies", async (req, res) => {
  try {
    const allPost = await movie.find();
    res.status(200).send(allPost);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

//  Delete movie by id
router.delete("/deletemovie/:id", authorizedUser, async (req, res) => {
  try {
    await movie.findByIdAndDelete(req.params.id);

    res.status(200).json("movie has been deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

//  Edit movie by id
router.put("/editmovie/:id", authorizedUser, async (req, res) => {
  try {
    const updateMovie = await movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updateMovie);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
