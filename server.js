        const express = require('express');
        const colors = require('colors');
        const morgan = require('morgan');
        const dotenv = require('dotenv');
        const mongoose = require('mongoose');
        const bodyParser = require('body-parser');
        const _ = require('lodash');

        const Items = require('./models/items');

        const app = express(); 

        mongoose.Promise = global.Promise;

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true}))

        app.use(morgan('dev'));

        dotenv.config({
            path: './config/config.env'
        })

        app.get('/getItemsList',(req,res) => {
            console.log("request");
            Items.find().then((itemResult) => {
                console.log(itemResult);
                 res.send(itemResult);
            })
        })

        app.post('/check',(req,res) => {
            console.log(req.body);
            res.send({"name":"Bhargav"});
        })

        app.post('/addData',(req,res) => {
        
            var items = _.pick(req.body,['shopName','latitude','longitude','itemList']);

            console.log(items);

            const newItemList = new Items(items);

            newItemList.save().then((result) => {
                console.log(result);
            })

        res.send();
        })

        app.get('/itemsData')

        const PORT = process.env.PORT || 3000;

        mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true}).then(result => {
            var server = app.listen(PORT,(res) => {
                console.log(`Server running on port : ${PORT}`.red.underline.bold);
            })
        }).catch(e => {
            console.log('Unable to connect to the database');
        })

