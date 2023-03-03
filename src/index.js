const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes.js");
const {dbConnection} = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
    console.log(`API is listening ein port ${PORT}`);
});

dbConnection();