const express = require('express');
const dotEnv = require('dotenv');

const path = require('path');
const connectDB = require('./config/db');
const { errorHandler } = require("./middlewares/errors");

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json({limit: '10kb'})); 

//* Load Config
dotEnv.config({path: "./config/config.env"})

//* Database Connection
connectDB();

//* Middlewares
app.use("/users" , require('./routes/user') );



//* Error Controller
app.use(errorHandler);

//* Server Connection
const PORT = process.env.PORT || 3030 ; 
app.listen(PORT , () => console.log(`Server is running on port ${PORT}`));

module.exports = app