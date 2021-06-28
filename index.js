const express = require('express');
const expressHandlebars = require('express-handlebars');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');

const routesRoutes = require('./routes/routes');

var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(express.static('public'));

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

app.use("/routes", routesRoutes)

var server = app.listen(4444, () => {
    console.log(4444);
});




