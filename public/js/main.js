var msgSend = document.getElementById('msg-send');
var chatSpace = document.getElementById('chat-space');
var msgOutgoing = document.getElementById('msgOutgoing');
const socket = io.connect();

//Event Listener...
msgSend.addEventListener('click', outgoing);
msgOutgoing.addEventListener('keyup', (e) => {
   if(e.key === 'Enter') {
      outgoing();
   }
})



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
   window.location = "/";
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
   window.location = "/";
});
 
//console.log(user);

console.log(username);
console.log(roomId);
console.log(createORjoin);

//Outgoing Chat......................

function outgoing(){
   var msgOutgoing = document.getElementById('msgOutgoing').value;

   if(msgOutgoing == ""){

   }else{
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      var chatSend = [dateTime, msgOutgoing];

      chatIsLive(chatSend, 'message-outgoing')
      //console.log(msgOutgoing);
      document.getElementById('msgOutgoing').value = "";

      socket.emit('chatIncoming', chatSend);
   }
}

//ChatIsLive.............

function chatIsLive(chatSend, type){ 
   let mainDiv = document.createElement('div')
   let className = type
   mainDiv.classList.add(type, 'message')
   var dT = chatSend[0];
   var inChat = chatSend[1];

   let markup = `
      <p>${dT}</p>
      <p>${inChat}</p>
   `
   mainDiv.innerHTML = markup

   chatSpace.appendChild(mainDiv)
   console.log(msgOutgoing);
   document.getElementById('msgOutgoing').value = "";
   chatSpace.scrollTop = chatSpace.scrollHeight
}


// Recieve messages 
socket.on('chatIncoming', function(chatSend){
   chatIsLive(chatSend, 'message-incomming');
});