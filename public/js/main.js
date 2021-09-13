const socket = io.connect();

socket.on('message', message => {
    console.log(message);
});

//create Room Or join room
if(createORjoin === "Create+Room"){
   console.log("gfhgfhfuyfyjy")
   createRoom();
}
 
if(createORjoin === "Join+Room"){
   joinRoom();
}

 // create room
function createRoom(){
   var room = roomId;
    
    
   if (room !== '') {
      socket.emit('create or join', room);
      console.log('Attempted to create room', room);
   }
}

 // join room 
function joinRoom(){
   var room = roomId;
   
   if (room !== '') {
      socket.emit('join a room', room);
      console.log('Attempted to join room', room);
   }
}

socket.on('created', function(room) {
   console.log('Created room ' + room);
   /* isInitiator = true;
    videoStream();
    maybeStart();*/
    console.log('Welcome to Hii_bol '+ username + '\n Waiting for other member');
    
});

socket.on('noRoom', function(room) {
   console.log('not exist Room ' + room );
   //window.location = "index.html";
});

socket.on('join', function (room){
   console.log('Another peer made a request to join room ' + room);
   console.log('This peer is the initiator of room ' + room + '!');
   //isChannelReady = true;
   console.log('New member.... ');
   
});
 
socket.on('joined', function(room) {
   console.log('joined: ' + room);
   //isChannelReady = true;
   //videoStream();
   //maybeStart();
  //outputMessage('Welcome to Hii_bol '+ username);
  
   
});

socket.on('full', function(room) {
   console.log('Room ' + room + ' is full');
   //window.location = "index.html";
});

socket.on('alreadyRoom', function(room) {
   console.log('Already exist Room ' + room );
   //window.location = "index.html";
});
 
//console.log(user);

console.log(username);
console.log(roomId);
console.log(createORjoin);