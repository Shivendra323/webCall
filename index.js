'use strict';
var os          = require('os');
var express     = require('express');
var https       = require('https');
var http       = require('http');
var app         = express();
var fs          = require('fs');
var socketIO    = require('socket.io');
const expressHandlebars = require('express-handlebars');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');
var path = require('path');

//add additional routes
const routesRoutes = require('./routes/routes');


//add https certificates
var options = {
	key: fs.readFileSync('ssl/key.pem'),
	cert: fs.readFileSync('ssl/cert.pem')
 };

//server
var servers = https.createServer(options, app).listen(443, function(req, res){
	console.log('HTTPS listening on 443');
});

//------------------------------------------------------------------------------------------------------------------------
// web-sockets------------------------------------------------------------------------------------------------------------
console.log(socketIO.listen);
var io = socketIO.listen(servers);
io.sockets.on('connection', function(socket){
	function log(){
		var array = ['Message from server:'];
		array.push.apply(array, arguments);
		socket.emit('log', array);
	}
	socket.on('message', function(message){
		console.log('Client said: ', message);
		// for a real app, would be room-only (not broadcast)
		socket.broadcast.emit('message', message);
	});

	socket.on('chatIncoming', function(chatSend){
		//console.log('Client said: ', message);
		// for a real app, would be room-only (not broadcast)
		socket.broadcast.emit('chatIncoming', chatSend);
	});
	
	socket.on('create or join', function(room){
		console.log('Received request to create room ' + room);
		var clientsInRoom = io.sockets.adapter.rooms[room];
		var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
		console.log('Room ' + room + ' now has ' + numClients + ' client(s)');
		
		
		if(numClients === 0){
			socket.join(room);
			console.log('Client ID ' + socket.id + ' created room ' + room);
			socket.emit('created', room, socket.id);
		
		}else{
			socket.emit('alreadyRoom', room);
		}
	});


	socket.on('join a room', function(room) {
		console.log('Received request to join room ' + room);
		
		var clientsInRoom = io.sockets.adapter.rooms[room];
		var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
		console.log('Room ' + room + ' now has ' + numClients + ' client(s)');
			
			
		if (numClients === 0) {
			socket.emit('noRoom', room, socket.id);
	
		}else if(numClients === 1){
			console.log('Client ID ' + socket.id + ' joined room ' + room);
			io.sockets.in(room).emit('join', room);
			socket.join(room);
			socket.emit('joined', room, socket.id);
			io.sockets.in(room).emit('ready');
		}else{ // max two clients
			socket.emit('full', room);
		}
	});

	socket.on('bye', function(){
		console.log('received bye');
	});
});



app.use(express.static('public'));

app.use(bodyParser.urlencoded({
	extended : true
}));

//handlebars
app.set('views', path.join(__dirname, "/views/"));

app.engine("hbs", expressHandlebars({
	extname : "hbs",
	defaultLayout : "mainlayout",
	layoutsDir : __dirname + "/views/layouts"
}));

app.set("view engine", "hbs")

app.get('/', function (req, res) {
   //res.send('<title>hello</title>');
   res.render("index",{})
})

app.use("/routes", routesRoutes);