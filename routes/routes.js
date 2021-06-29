const express = require('express');

const routes = express.Router();


routes.get('/login', (req, res)=>{
    res.render('login',{})
});

routes.get('/room', (req, res)=>{
    res.render('login',{})
});

routes.post('/room', (req, res)=>{
    var data = req.body;
	console.log(data.roomId);
    res.render('room',{data : data})

});

module.exports = routes;