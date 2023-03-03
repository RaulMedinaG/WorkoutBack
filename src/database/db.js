const mongoose = require('mongoose');

dbConnection().catch(err => console.log(err));

async function dbConnection() {
    await mongoose.connect('mongodb+srv://Admin:admin@cluster0.y1vdhbx.mongodb.net/Workouts');

    console.log('BD conect');
}

module.exports={
    dbConnection
}