const express = require('express');
const expressHandlebars = require('express-handlebars');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');

var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({
	extended : true
}));

app.set('views', path.join(__dirname, "/views/"));

app.engine("hbs", expressHandlebars({
	extname : "hbs",
	defaultLayout : "mainlayout",
	layoutsDir : __dirname + "/views/layouts"
}));

app.set("view engine", "hbs")

app.get('/', (req, res)=>{
    res.render('index', {});
});

app.get('/login', (req, res)=>{
    res.render('login', {});
})

var server = app.listen(4444, () => {
    console.log(4444);
});




