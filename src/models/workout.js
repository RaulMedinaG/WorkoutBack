const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    mode:{
        type:String,
        required :true
    },
    equipment:{
        type:Array,
        required :true
    },
    exercises:{
        type:Array,
        required :true
    },
    trainerTips:{
        type:Array,
        required : true
    }
    

})

module.exports = mongoose.model('workouts',WorkoutSchema);