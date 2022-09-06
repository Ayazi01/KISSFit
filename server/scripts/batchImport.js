const allExercises = require('../data/allExercises');
const connection = require('../database/connection');

// insert all exercises to database filtered by body weight equipment and added used attribute
const batchImport = async () => {
  try {
    const client = await connection.client();
    const db = await client.db();
    await db.collection('allExercises').deleteMany();
    let allEx = allExercises.filter((e)=>{
      e.used = false;
      return e.equipment == 'body weight';
    })
    await db.collection('allExercises').insertMany(allEx);
    console.log("working");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

//batchImport();
