"use strict";

const express = require("express");
const morgan = require("morgan");
const router = require("./routes/routes");
const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({extended: false}))
  .use("/", express.static(__dirname + "/"))
  .use(router)
  // .use(router)

  //Error message
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "Error",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
