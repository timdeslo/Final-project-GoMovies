const request = require("request-promise");
require("dotenv").config();
// const { MOVIE_API } = process.env;
const movieAPI = process.env.MOVIE_API;

//GET ALL topmovies
const getTopMovies = async (req, res) => {
  page = req.query.page || 1;
  const options = {
    uri: `https://api.themoviedb.org/3/movie/top_rated?api_key=${movieAPI}&language=en-US&page=${page}`,
    headers: {
        Accept: "application/json",
    },
    
  };
  try {
    const response = await request(options)
    // console.log(response);
    const data = JSON.parse(response)
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      err,
    });
  }
};

// GET all most popular movies
const getPopularMovies = async (req, res) => {
  page = req.query.page || 1;
  const options = {
    uri: `https://api.themoviedb.org/3/movie/popular?api_key=${movieAPI}&language=en-US&page=${page}`,
    headers: {
        Accept: "application/json",
    },
    
  };
  try {
    const response = await request(options)
    // console.log(response);
    const data = JSON.parse(response)
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      err,
    });
  }
};

//GET top rated shows
const getTopShows = async (req, res) => {
  page = req.query.page || 1;
  const options = {
    uri: `https://api.themoviedb.org/3/tv/top_rated?api_key=${movieAPI}&language=en-US&page=${page}`,
    headers: {
        Accept: "application/json",
    },
    
  };
  try {
    const response = await request(options)
    // console.log(response);
    const data = JSON.parse(response)
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      err,
    });
  }
};

//GET popular shows
const getPopularShows = async (req, res) => {
  page = req.query.page || 1;
  const options = {
    uri: `https://api.themoviedb.org/3/tv/top_rated?api_key=${movieAPI}&language=en-US&page=${page}`,
    headers: {
        Accept: "application/json",
    },
    
  };
  try {
    const response = await request(options)
    // console.log(response);
    const data = JSON.parse(response)
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      err,
    });
  }
};

//Get movie by ID
const getMovieById = async (req, res) => {
  const {movieId} = req.params;
  const options = {
    uri: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${movieAPI}&language=en-US`,
    headers: {
        Accept: "application/json",
    },
    
  };
  try {
    const response = await request(options)
    // console.log(response);
    const data = JSON.parse(response)
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      err,
    });
  }
};

//GET show by ID
const getShowById = async (req, res) => {
  const {showId} = req.params;
  const options = {
    uri: `https://api.themoviedb.org/3/tv/${showId}?api_key=${movieAPI}&language=en-US`,
    headers: {
        Accept: "application/json",
    },
    
  };
  try {
    const response = await request(options)
    // console.log(response);
    const data = JSON.parse(response)
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      err,
    });
  }
};
module.exports = { getTopMovies, getPopularMovies, getTopShows, getPopularShows, getMovieById, getShowById };
