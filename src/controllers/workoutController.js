const { response } = require("express");
const workoutService = require("../services/WorkoutService");

const getAllWorkouts = (req,res) => {
    const { mode } = req.query;
    const { limit } = req.query;
    try{
        const allWorkouts = workoutService.getAllWorkouts({ mode, limit }).then(response => {
            res.send({ status: "OK", data: response});
        });
        
    } catch (error) {
        res
           .status(error?.status || 500)
           .send({status: "FAILED", data: {error: error?.message || error} });
    }
};

const getOneWorkout = (req,res) => {
    const {
        params: { workoutId },
    } = req;
    if(!workoutId){
        res
        .status(400)
        .send({
            status: "FAILED",
            data: { error: "Parameter ':workoutId' can not be empty" },
        });
    }
    try {
        const workout = workoutService.getOneWorkout(workoutId);
        res.send({status: "OK", data: workout });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewWorkout = (req,res) => {
    const {body} = req;

    if(
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                    "One of the following keys is missing"
            },
        });
        return;
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips,
    }

    try{
        workoutService.createNewWorkout(newWorkout).then(response => {
            console.log(response);
        }).catch(error=>console.log(error));
        res.status(201).send({status: "OK", data: newWorkout});
    } catch (error) {
        res
           .status(error?.status || 500)
           .send({status: "FAILED", data: {error: error?.message || error } })
    }
};

const updateOneWorkout = (req,res) => {
    const {
        body,
        params:{ workoutId },
    } = req;
    if(!workoutId){
        res
           .status(400)
           .send({
            status: "FAILED",
            data: {error : "Parameter ':workoutId' can not be empty"},
           });
    }
    try {
        const updatedWorkout = workoutService.updateOneWorkout(workoutId,body);
        res.send({status: "OK", data: updatedWorkout});
    } catch (error) {
        res
          .status(error?.status || 500)
          .send({status: "FAILED", data: {error: error?.message || error } })
    }
};

const deleteOneWorkout = (req,res) => {

    const {
        params:{ workoutId },
    } = req;
    if(!workoutId){
        res
           .status(400)
           .send({
            status: "FAILED",
            data: { error: "Parameter ':workoutId' can not be empty"},
           });
    }
    try {
        workoutService.deleteOneWorkout(workoutId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res
          .status(error?.status || 500)
          .send({status: "FAILED", data: {error: error?.message || error } })
    }
    
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
};