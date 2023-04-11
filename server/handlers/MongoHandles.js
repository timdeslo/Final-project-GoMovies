//DB
const {MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env;
const bcrypt = require("bcrypt");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//to generate random id's
const {v4: uuidv4} = require("uuid");

//to create a new user
const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userInfo = req.body;
  const failure = {
    status: 400,
    error: [],
  };
  let failed = false;

  try {
    await client.connect();
    const db = client.db("db-name");
    const users = await db.collection("users").findOne({email: userInfo.email});
    //validate if the user already exist
    if (users !== null) {
      failed = true;
      failure.error.push("this email is already taken");
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      failed = true;
      failure.error.push("passwords must match");
    }
    if (userInfo.password.length < 8) {
      failed = true;
      failure.error.push("Password must be at least 8 characters long");
    }
    if (failed) {
      throw new Error(failure.error);
    } else {
      const hashedPassword = await bcrypt.hash(userInfo.password, 10);
      const user = {
        _id: uuidv4(),
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        password: hashedPassword,
        userType: 1,
        watchlist: [],
        rating: [],
      };
      await db.collection("users").insertOne(user);
      client.close();
      return res
        .status(200)
        .json({status: 200, message: "user has been added", data: user});
    }
  } catch (error) {
    client.close();
    return res.status(404).json({status: 404, error: error.message});
  }
};

// to let the user sign in if an account is found
const signin = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.params.email;
  const userPassword = req.params.password;
  console.log(req.params);
  try {
    await client.connect();
    const db = client.db("db-name");
    const user = await db.collection("users").findOne({email: userEmail});
    if (user === null) {
      throw new Error("No account Found");
    }
    const match = await bcrypt.compare(userPassword, user.password);
    if (!match) {
      throw new Error("Wrong Password");
    }
    client.close();
    return res
      .status(200)
      .json({status: 200, message: "Welcome Back", data: user});
  } catch (error) {
    client.close();
    return res.status(404).json({status: 404, error: error.message});
  }
};

//add item to watchlist
const addToWatchlist = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const watchlist = {
    userId: req.body.userId,
    actualItem: req.body.actualItem,
  };
  console.log(req.body);
  try {
    await client.connect();
    const db = client.db("db-name");
    await db
      .collection("users")
      .updateOne(
        {_id: watchlist.userId},
        {$push: {watchlist: watchlist.actualItem}}
      );
    return res.status(200).json({status: 200, message: "added to watchlist"});
  } catch (error) {
    return res.status(404).json({status: 404, error: error.message});
  } finally {
    client.close();
  }
};

// remove from watchlist
const removeFromWatchlist = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.body.userId;
  const watchlistId = Number(req.params.id);

  try {
    await client.connect();
    const db = client.db("db-name");
    const reservation = await db
      .collection("users")
      .findOne({_id: userId, watchlist: {$elemMatch: {id: watchlistId}}});

    if (!reservation) {
      return res
        .status(404)
        .json({status: 404, message: "Watchlist Item not found"});
    }
    //deletes from watchlist here
    const deleted = await db
      .collection("users")
      .updateOne(
        {_id: userId, watchlist: {$elemMatch: {id: watchlistId}}},
        {$pull: {watchlist: {id: watchlistId}}}
      );
    if (deleted.modifiedCount > 0) {
      const updatePage = await db.collection("users").findOne({_id: userId});
      return res.status(200).json({
        status: 200,
        message: "item successfully deleted",
        data: updatePage,
      });
    }
  } catch (error) {
    return res.status(404).json({status: 404, error: error.message});
  } finally {
    client.close();
  }
};

// get all items from watchlist
const viewWatchlistNratings = async (req, res) => {
  const userId = req.params.userId;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("db-name");
    const result = await db.collection("users").findOne({_id: userId});
    res.status(200).json({status: 200, data: result});
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({status: 404, message: "Data not found."});
  } finally {
    client.close();
  }
};

//add a rating to movie or show
const addRating = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const rated = {
    userId: req.body.userId,
    item: req.body.item,
    comment: req.body.comment,
    gNb: req.body.gNb,
  };
  console.log(req.body);
  try {
    await client.connect();
    const db = client.db("db-name");
    await db
      .collection("users")
      .updateOne(
        {_id: rated.userId},
        {
          $push: {
            rating: {
              comment: rated.comment,
              movieOrShow: rated.item,
              goodOrBad: rated.gNb,
            },
          },
        }
      );
    return res.status(200).json({status: 200, message: "added to rating"});
  } catch (error) {
    return res.status(404).json({status: 404, error: error.message});
  } finally {
    client.close();
  }
};

module.exports = {
  createUser,
  signin,
  addToWatchlist,
  removeFromWatchlist,
  viewWatchlistNratings,
  addRating,
};
