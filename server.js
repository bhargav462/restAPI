const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express(); 

app.use(morgan('dev'));

dotenv.config({
    path: './config/config.env'
})

app.get('/todo',(req,res) => {
    console.log("request");
    res.status(200).send("bhargav");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,
    console.log(`Server running on port : ${PORT}`.red.underline.bold))