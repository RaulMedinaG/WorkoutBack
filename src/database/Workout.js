const utils = require("./utils");
const model = require("../models/workout");
const {response} = require('express');

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

const getOneWorkout = (workoutId) => {
    try{
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if(!workout){
            throw {
                status: 400,
                message: `Cant find workout with the id '${workoutId}'`
            }
        }
        return workout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error}
    }
};

const createNewWorkout = async(req, res = response) => {

    console.log(req.body);

    const { name, mode, equipment = [], exercises = [], trainerTips = [] } = req.body;

    try{
        const dbworkout = new model(req.body);
        await dbworkout.save();
        return res.json({
            ok: true,
        })
    } catch (error) {
        throw { status: 500, message: error?.message || error};
    }
}

const updateOneWorkout = (workoutId, changes) => {
    try{
        const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
        if(isAlreadyAdded){
            throw {
                status: 400,
                message: `Workout with the name '${changes.name}' already exists`,
            };
        }
        const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId);
        if(indexForUpdate === -1){
            throw {
                status: 400,
                message: `Cant find workout with the id '${workoutId}'`,
            };
        };
        const updatedWorkout = {
            ...DB.workouts[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC"}),
        };
        DB.workouts[indexForUpdate] = updatedWorkout;
        utils.saveToDatabase(DB);
        return updatedWorkout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error}
    }
};

const deleteOneWorkout = (workoutId) => {
    try{
        const indexForDeletion = DB.workouts.findIndex((workout)=>workout.id===workoutId);
        if(indexForDeletion === -1){
            throw {
                status: 400,
                message: `Cant find workout with the id '${workoutId}'`,
            };
        }
        DB.workouts.splice(indexForDeletion, 1);
        utils.saveToDatabase(DB);
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