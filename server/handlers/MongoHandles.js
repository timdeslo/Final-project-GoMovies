//DB
const {MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env;

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
      const user = {
        _id: uuidv4(),
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        password: userInfo.password,
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
    if (user.password !== userPassword) {
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
    watchlistArr: req.body.watchlistArr,
    actualItem: req.body.actualItem,
  };
  try {
    await client.connect();
    const db = client.db("db-name");
    await db
      .collection("users")
      .updateOne(
        {_id: watchlist.userId},
        {$set: {watchlist: watchlist.watchlistArr}}
      );
    return res.status(200).json({status: 200, message: "added to watchlist"});
  } catch (error) {
    return response.status(404).json({status: 404, error: error.message});
  } finally {
    client.close();
  }
};

module.exports = {createUser, signin, addToWatchlist};
