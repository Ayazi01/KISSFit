const connection = require('../database/connection');

//get X random exercises by a specific body part
const getAllExercisesByBodyPart = async (req, res) => {
  try {
    const {bodyPart, workoutTime} = req.params;
    const client = await connection.client();
    const db = await client.db();
    const data = await db.collection('allExercises').find({bodyPart}).toArray();
    res.status(200).json({ status: 200, data: { all: data, random: generateRandomExercises(data, workoutTime) }});
  } catch (err) {
    res.status(400).json({ status: 400, message: 'Couldn\'t find items' });
  }
};

//get 5 random workouts of 5 exercises by random body parts
const getMysteryExercises = async (req, res) => {
  try {
    const {MYSTERY_WORKOUTS, MYSTERY_EXERCISES} = process.env;
    const client = await connection.client();
    const db = await client.db();
    const data = await db.collection('allExercises').find().toArray();
    let mystery = [];
    for(let i = 0; i < MYSTERY_WORKOUTS; i++){
      mystery.push(generateRandomExercises(data, MYSTERY_EXERCISES));
    }
    res.status(200).json({ status: 200, data: { mystery }});
  } catch (err) {
    res.status(400).json({ status: 400, message: 'Couldn\'t find items' });
  }
};

//mark exercise as used by exercise id
const markExerciseAsUsed = async (req, res) => {
  try {
    const {exerciseId} = req.body;
    const client = await connection.client();
    const db = await client.db();
    const updatedItem = await db.collection('allExercises').updateOne({id: exerciseId}, {$set:{used:true}});
    if (updatedItem.modifiedCount > 0) {
      res.status(200).json({ status: 200, data: "marked"});
    }else{
      if(updatedItem.matchedCount > 0){
        res.status(200).json({ status: 200, data: "already-marked"});
      }else {
        throw "";
      }
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: 'Couldn\'t find items' });
  }
};

//generate X random number of exercises (private function)
const generateRandomExercises = (exercises, number)=> {
  const res = [];
  let breakNum = number > exercises.length ? exercises.length : number;
  while(res.length < breakNum && number < exercises.length) {
    const random = Math.floor(Math.random() * exercises.length);
    if(res.indexOf(exercises[random]) === -1) {
        res.push(exercises[random]);
    };
  };
  if(res.length == 0)return exercises;
  return res;
};

module.exports = { getAllExercisesByBodyPart, getMysteryExercises, markExerciseAsUsed };