const express = require('express');

const routes = express.Router();


routes.get('/login', (req, res)=>{
    res.render('login',{})
});

module.exports = routes;