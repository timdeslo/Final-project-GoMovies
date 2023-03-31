const router = require("express").Router();

//all database handler functions
const {
  getTopMovies,
  getPopularMovies,
  getTopShows,
  getPopularShows,
  getMovieById,
  getShowById,
} = require(`../handlers/DatabaseHandlers`);

const {
  createUser,
  signin,
  addToWatchlist,
  removeFromWatchlist,
  viewWatchlist,
} = require(`../handlers/MongoHandles`);

//all GET for movies and shows
router.get("/topMovies", getTopMovies);
router.get("/popularMovies", getPopularMovies);
router.get("/topShows", getTopShows);
router.get("/popularShows", getPopularShows);
router.get("/movie/:movieId", getMovieById);
router.get("/show/:showId", getShowById);

//user side
router.post("/createUser", createUser);
router.get("/signIn/:email/:password", signin);

//watchlist
router.get("/watchlist/:userId", viewWatchlist);
router.post("/addToWatchlist", addToWatchlist);
router.delete("/removeItemWatchlist/:id", removeFromWatchlist);

module.exports = router;
