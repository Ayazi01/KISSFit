
const getAllExercisesByBodyPart = async (bodyPart, workoutTime)=> {
    const res = await fetch(process.env.REACT_APP_ALL_EXERCISES_PATH + bodyPart + '/' + workoutTime);
    const data = await res.json();
    return data;
};

const getMysteryExercises = async ()=> {
    const res = await fetch(process.env.REACT_APP_MYSTERY_EXERCISES_PATH);
    const data = await res.json();
    return data;
};

const markExerciseAsUsed = async (exerciseId)=> {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({exerciseId})
    };
    const res = await fetch(process.env.REACT_APP_USE_EXERCISE_PATH, requestOptions);
    const data = await res.json();
    return data;
};

module.exports = { getAllExercisesByBodyPart, getMysteryExercises, markExerciseAsUsed };