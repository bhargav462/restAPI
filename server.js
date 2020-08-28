        const express = require('express');
        const colors = require('colors');
        const morgan = require('morgan');
        const dotenv = require('dotenv');
        const mongoose = require('mongoose');
        const bodyParser = require('body-parser');
        const _ = require('lodash');
        const multer = require('multer');
        const sharp = require('sharp');

        const Items = require('./models/items');
        const Photos = require('./models/photos');

        const upload = multer({
            limits:{
                fileSize: 40000000
            }
        })
        

        const app = express(); 

        mongoose.Promise = global.Promise;

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true}))

        app.use(morgan('dev'));

        dotenv.config({
            path: './config/config.env'
        })

        app.post('/addPhoto',upload.single('photo'),async (req,res) => {
            var photo = new Photos();
            const buffer = await sharp(req.file.buffer).resize({width:250, height: 250}).png().toBuffer();
            photo.userPost = buffer;
            photo.save().then((result) => {
                res.send(result);
            })
        })

        app.post('/addLargePhoto',upload.single('photo'),async (req,res) => {
            var photo = new Photos();
            photo.userPost = req.file.buffer;
            photo.save().then((result) => {
                res.send(result);
            })
        })

        app.get('/image/:id',(req,res) => {
            Photos.find().then((photoResult) => {
                console.log(req.params);
                console.log(photoResult)
                res.set('Content-Type','image/png');
                res.send(photoResult[req.params.id].userPost);
            })
        })

        app.get('/getItemsList',(req,res) => {
            console.log("request");
            Items.find().then((itemResult) => {
                var resultList = {};
                resultList.totalItems = itemResult;
                console.log(resultList)
                res.json(resultList);
            })
        })

        app.get('/getItems',(req,res) => {
            Items.find().then((itemResult) => {
                console.log(itemResult)
                var itemDetails = new Set();
                for(var i = 0; i < itemResult.length; i++)
                {
                    console.log('check' + itemResult[i].itemList.length);
                    for(var j = 0; j < itemResult[i].itemList.length; j++)
                    {
                       itemDetails.add(itemResult[i].itemList[j]);
                    }
                }
                console.log(itemDetails);
                var items = {item:Array.from(itemDetails)}
                console.log(items);
                res.json(items);
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

        const PORT = process.env.PORT || 3000;

        mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true}).then(result => {
            var server = app.listen(PORT,(res) => {
                console.log(`Server running on port : ${PORT}`.red.underline.bold);
            })
        }).catch(e => {
            console.log('Unable to connect to the database');
        })

