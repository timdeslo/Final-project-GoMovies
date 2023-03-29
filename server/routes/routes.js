const router = require('express').Router()


//all database handler functions
const {
  getTopMovies,
  getPopularMovies,
  getTopShows,
  getPopularShows

} = require(`../handlers/DatabaseHandlers`)



//all GET for movies and shows
  router.get("/topMovies", getTopMovies)
  router.get("/popularMovies", getPopularMovies)
  router.get("/topShows", getTopShows)
  router.get("/popularShows", getPopularShows)
  module.exports = router;