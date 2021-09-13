const express = require('express');
const fs = require('fs');
const { url } = require('inspector');
var path = require('path');

const routes = express.Router();


routes.get('/login', (req, res)=>{
    res.render('login',{})
});


routes.get('/room', (req, res)=>{
    var data = (req._parsedOriginalUrl).query;
    var dd = data.split("&");
    var arr = [];

    for(i=0; i<3; i++){
        var a = dd[i].split("=");
        arr.push(a)
    }

    var g = { username : (arr[0])[1], roomId : (arr[1])[1], createORjoin : (arr[2])[1]};
    console.log(g);
    console.log(Object.keys(dd).length);
    //console.log(data);
    res.render('room',{data : g})

});


routes.post('/room', (req, res)=>{
    var data = req.body;
	console.log(data.roomId);
    console.log(data);
    //res.send(data);
    //chat(data);
    //res.sendFile(path.join(__dirname,'../public/room.html'));
    //res.send(data);

});


module.exports = routes;