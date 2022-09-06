"use strict";
const express = require("express");
const morgan = require("morgan");
const { getAllExercisesByBodyPart, getMysteryExercises, markExerciseAsUsed } = require("./handlers/exercisesHandler")
const PORT = 9000;
express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

// REST endpoints
  .get("/exercises/:bodyPart/:workoutTime", getAllExercisesByBodyPart)
  .get("/exercises/mystery", getMysteryExercises)
  .put("/useExercise", markExerciseAsUsed)
  .get("/*", (req,res)=>res.json({ status: 404, message: "Wrong way José !!" }))

  .listen(PORT,()=> console.log(`Listening on port ${PORT}`));



