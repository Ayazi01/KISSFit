"use strict";

const express = require("express");
const path = require('path');
const morgan = require("morgan");
const { getAllExercisesByBodyPart, getMysteryExercises, markExerciseAsUsed } = require("./handlers/exercisesHandler")
const PORT = 9000;
const app = express()
app.use(function (req, res, next) {
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
  app.use(morgan("tiny"))
  app.use(express.static("./server/assets"))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use("/", express.static(__dirname + "/"))

// REST endpoints
app.get("/exercises/:bodyPart/:workoutTime", getAllExercisesByBodyPart)
app.get("/exercises/mystery", getMysteryExercises)
app.put("/useExercise", markExerciseAsUsed)
// app.get("/*", (req,res)=>res.json({ status: 404, message: "Wrong way José !!" }))

if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV)
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
app.listen(PORT,()=> console.log(`Listening on port ${PORT}`));



