const model = require("../models/workout");
const {response} = require('express');
const workout = require("../models/workout");

async function getAllWorkouts (filterParams, req, res = response) {
    try {
        
        workouts = await model.find({});

        console.log(workouts);

        if ( filterParams.mode){
            return workouts.filter((workout) => workout.mode.toLocaleLowerCase().includes(filterParams.mode));
        }
        if (filterParams.limit){
            return workouts.slice(0,filterParams.limit);
        }
        return workouts;
    } catch (error) {
        throw {status: 500, message: error};
    }
};

const getOneWorkout = async (workoutId) => {
    try{
        workout = await model.findById(workoutId);
        console.log(workout);

        return workout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error}
    }
};

const createNewWorkout = async(req, res = response) => {

    try{
        const dbworkout = new model(req);
        await dbworkout.save();
        return res.json({
            ok: true,
        })
    } catch (error) {
        throw { status: 500, message: error?.message || error};
    }
}

const updateOneWorkout = async (workoutId, changes) => {
    try{
        const indexForUpdate = await model.findByIdAndUpdate(workoutId, changes);
        if(!indexForUpdate){
            throw {
                status: 400,
                message: `Cant find workout with the id '${workoutId}'`,
            };
        }
        return indexForUpdate;

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error}
    }
};

const deleteOneWorkout = async(workoutId) => {

    try{

        const dbworkout = await model.findByIdAndDelete(workoutId);

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error};
    }
    
};

module.exports = {
    getAllWorkouts,
    createNewWorkout,
    getOneWorkout,
    updateOneWorkout,
    deleteOneWorkout
};