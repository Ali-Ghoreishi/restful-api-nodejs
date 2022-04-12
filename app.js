const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');

const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User');

const app = express()
app.use(express.urlencoded({extended: false}))


//* Load Config
dotEnv.config({path: "./config/config.env"})

//* Database Connection
connectDB();

//* Middlewares
app.use("/users" , require('./controllers/userController'));


//* Server Connection
const PORT = process.env.PORT || 3000 ; 
app.listen(PORT , () => console.log("Server is running on port 3000"));