var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var colors = require('colors');
colors.setTheme({
  Green: 'green',
  Yellow: 'yellow',
  Blue: 'cyan',
  White: 'white',
  Red: 'red'
});



About();



server.listen(3000);
var DISCONNECT_TIME = 3000;
var enemies =[];
var playerSpawnPoints=[];
var clients = [];
var setGameLoop=[];

var tickLengthMs = 1000 / 20;
var previousTick = Date.now();
var actualTicks = 0;
var playeractualTicks = 0;




var currentPlayer = {};
currentPlayer.Id='null';
currentPlayer.UserId='null';
currentPlayer.UserName='null';
currentPlayer.UserPic='null';
currentPlayer.UserToken='null';
currentPlayer.UserPosX='null';
currentPlayer.UserPosY='null';
currentPlayer.UserPosZ='null';
currentPlayer.UserLevel='null';
currentPlayer.UserCurrency='null';
currentPlayer.UserExpierance='null';
currentPlayer.UserHealth='null';
currentPlayer.UserPower='null';
currentPlayer.UserGpsX='null';
currentPlayer.UserGpsY='null';
currentPlayer.UserGpsZ='null';
currentPlayer.UserVungleApi='null';
currentPlayer.UserAdcolonyApi='null';
currentPlayer.UserAdcolonyZone='null';
currentPlayer.IdleTime=0;
currentPlayer.Action=0;



io.on('connection',function(socket)
{







var gameLoop = function () 
{
  var now = Date.now();

  actualTicks++
  if (previousTick + tickLengthMs <= now) 
  {
    var delta = (now - previousTick) / 1000;
    previousTick = now;
    Update(delta);
    actualTicks = 0;
  }

    if (Date.now() - previousTick < tickLengthMs - 16) 
    {
    setTimeout(gameLoop);
    }
    else 
    {
    setImmediate(gameLoop);
    }
}



var Update = function(delta) 
{
  

  for (var i = 0; i<clients.length; i++) 
      {
      	
      
      	CheckIdleStatus(i,clients[i].UserId ,clients[i].IdleTime++,socket,clients[i].UserId,clients[i].Action);
      }
}
  







gameLoop();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//START PLAYER CONNECTED
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
socket.on('OnConnection',function(data)
{


/*
Todo On Connection Check If Player Is Already Connected If So Disconnect them from list and reconnec them to list to complete the loop
*/
info('Method Get: OnConnection:');
info('Server Recieved From Client: ');
command('Data_Manager: '+JSON.stringify(data));
currentPlayer.Id=data.Id;
debug('Data: Id= '+data.Id);
currentPlayer.UserId=data.UserId;
debug('Data: UserId= '+data.UserId);
currentPlayer.UserName=data.UserName;
debug('Data: UserName= '+data.UserName);
currentPlayer.UserPic=data.UserPic;
debug('Data: UserPic= '+data.UserPic);
currentPlayer.UserToken=data.UserToken;
debug('Data: UserToken= '+data.UserToken);
currentPlayer.UserPosX=data.UserPosX;
debug('Data: UserPosX= '+data.UserPosX);
currentPlayer.UserPosY=data.UserPosY;
debug('Data: UserPosY= '+data.UserPosY);
currentPlayer.UserPosZ=data.UserPosZ;
debug('Data: UserPosZ= '+data.UserPosZ);
currentPlayer.UserLevel=data.UserLevel;
debug('Data: UserLevel= '+data.UserLevel);
currentPlayer.UserCurrency=data.UserCurrency;
debug('Data: UserCurrency= '+data.UserCurrency);
currentPlayer.UserExpierance=data.UserExpierance;
debug('Data: UserExpierance= '+data.UserExpierance);
currentPlayer.UserHealth=data.UserHealth;
debug('Data: UserHealth= '+data.UserHealth);
currentPlayer.UserPower=data.UserPower;
debug('Data: UserPower= '+data.UserPower);
currentPlayer.UserGpsX=data.UserGpsX;
debug('Data: UserGpsX= '+data.UserGpsX);
currentPlayer.UserGpsY=data.UserGpsY;
debug('Data: UserGpsY= '+data.UserGpsY);
currentPlayer.UserGpsZ=data.UserGpsZ;
debug('Data: UserGpsZ= '+data.UserGpsZ);
currentPlayer.UserVungleApi=data.UserVungleApi;
debug('Data: UserVungleApi= '+data.UserVungleApi);
currentPlayer.UserAdcolonyApi=data.UserAdcolonyApi;
debug('Data: UserAdcolonyApi= '+data.UserAdcolonyApi);
currentPlayer.UserAdcolonyZone=data.UserAdcolonyZone;
debug('Data: UserAdcolonyZone= '+data.UserAdcolonyZone);

currentPlayer.IdleTime=0;
debug('Data: IdleTime= '+currentPlayer.IdleTime);

currentPlayer.Action=0;
debug('Data: Action= '+currentPlayer.Action);

 

playerSpawnPoints =[];

 
    
    var playerConnected = {
		Id:currentPlayer.Id,
		UserId:currentPlayer.UserId,
		UserName:currentPlayer.UserName,
		UserPic:currentPlayer.UserPic,
		UserToken:currentPlayer.UserToken,
		UserPosX:currentPlayer.UserPosX,
		UserPosY:currentPlayer.UserPosY,
		UserPosZ:currentPlayer.UserPosZ,
		UserLevel:currentPlayer.UserLevel,
		UserCurrency:currentPlayer.UserCurrency,
		UserExpierance:currentPlayer.UserExpierance,
		UserHealth:currentPlayer.UserHealth,
		UserPower:currentPlayer.UserPower,
		UserGpsX:currentPlayer.UserGpsX,
		UserGpsY:currentPlayer.UserGpsY,
		UserGpsZ:currentPlayer.UserGpsZ,
		UserVungleApi:currentPlayer.UserVungleApi,
		UserAdcolonyApi:currentPlayer.UserAdcolonyApi,
		UserAdcolonyZone:currentPlayer.UserAdcolonyZone,
	    position:currentPlayer.position,
	    rotation:currentPlayer.rotation,
	    IdleTime:currentPlayer.IdleTime=0,
	    Action:currentPlayer.Action=0
       };


data.playerSpawnPoints.forEach(function(_playerSpawnPoint)
{

var playerSpawnPoint = {
position:_playerSpawnPoint.position,
rotation:_playerSpawnPoint.rotation
};
playerSpawnPoints.push(playerSpawnPoint);

});
 
var isConnected = false;
 for(var i =0; i<clients.length; i++)
{

if(clients[i].UserId === playerConnected.UserId )
{
	//we are already connected
	debug("we are already connected");
	isConnected = true;
	
}
else
{
	//new connection
	isConnected = false;
	debug("we are now connected");
}
}
if(isConnected == false)
{
    clients.push(playerConnected);
}
	


	
   

for (var i = 0; i<clients.length; i++) 
{
	var playerConnected = {
		Id:clients[i].Id,
		UserId:clients[i].UserId,
		UserName:clients[i].UserName,
		UserPic:clients[i].UserPic,
		UserToken:clients[i].UserToken,
		UserPosX:clients[i].UserPosX,
		UserPosY:clients[i].UserPosY,
		UserPosZ:clients[i].UserPosZ,
		UserLevel:clients[i].UserLevel,
		UserCurrency:clients[i].UserCurrency,
		UserExpierance:clients[i].UserExpierance,
		UserHealth:clients[i].UserHealth,
		UserPower:clients[i].UserPower,
		UserGpsX:clients[i].UserGpsX,
		UserGpsY:clients[i].UserGpsY,
		UserGpsZ:clients[i].UserGpsZ,
		UserVungleApi:clients[i].UserVungleApi,
		UserAdcolonyApi:clients[i].UserAdcolonyApi,
		UserAdcolonyZone:clients[i].UserAdcolonyZone,
	    position:clients[i].position,
	    rotation:clients[i].rotation,
	    IdleTime:clients[i].IdleTime=0,
	    Action:clients[i].Action=0
	    
	};

	



  
	socket.broadcast.emit('OnPlayerConnected', playerConnected);
	debug('Data: Clients Added= '+clients.length);
	info('Method Post: OnPlayerConnected:');
    info('Server Submit To Clients: ');
    command('Send To Data_Manager: '+JSON.stringify(playerConnected));
    socket.emit('OnPlayerConnected', playerConnected);
    clear('Method Finished: OnPlayerConnected:');
}

  



});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//END PLAYER CONNECTED
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//START PLAY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
socket.on('OnPlay',function(data)
{
command(currentPlayer.UserId+' recv: play: '+JSON.stringify(data));
//if this is the first person to join the game init the enemies 

if(clients.length === 0)
{

          /* numberOfEnemies = data.enemySpawnPoints.length;
           enemies = [];
           data.enemySpawnPoints.forEach(function(_enemySpawnPoint)
           {

             var enemy = {
	             name:guid(),
	             position:_enemySpawnPoint.position,
	             rotation:_enemySpawnPoint.rotation,
	             health:100

                         };
            enemies.push(enemy);
           });*/
/*
var enemiesResponse = {
	enemies: enemies
};*/
//socket.emit('OnEnemies',enemiesResponse);
//we will always send the enemies when the player joins
//clear(currentPlayer.UserId+' emit: enemies: '+JSON.stringify(enemiesResponse));

/*playerSpawnPoints =[];
data.playerSpawnPoints.forEach(function(_playerSpawnPoint)
{

var playerSpawnPoint = {
position:_playerSpawnPoint.position,
rotation:_playerSpawnPoint.rotation
};
playerSpawnPoints.push(playerSpawnPoint);

});
}




var randomSpawnPoint = playerSpawnPoints[Math.floor(Math.random() * playerSpawnPoints.length)];
currentPlayer = {
	name: data.name,
	position:randomSpawnPoint.position,
	rotation:randomSpawnPoint.rotation,
	health: 100

};
clients.push(currentPlayer);
//in current game tell you that you have joined
clear(currentPlayer.UserId+' emit: play: '+JSON.stringify(currentPlayer));
socket.emit('OnPlay', currentPlayer);
//in your current game we need to tell the other payers about you
socket.broadcast.emit('OnPlayerConnected', currentPlayer);
});*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//END PLAY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//START PLAYER MOVE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 socket.on('OnPlayerMove', function(data)
 {

//info('Method Get: OnPlayerMove:');
//info('Server Recieved From Client: ');
command('Data_Manager: '+JSON.stringify(data));


for (var i = 0; i<clients.length; i++) 
      {
      	
      if(data.UserId == clients[i].UserId)
      {
        debug("I AM AS ME");
        clients[i].Action = data.isMoving;
        if(data.isMoving == true)
          {
	//info('Broadcast : ');
	       clients[i].IdleTime =0;
          }
      }
      	
      }



socket.broadcast.emit('OnPlayerMove',data);




 });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//END PLAYER MOVE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//START PLAYER SHOOT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

socket.on('OnPlayerShoot', function(data){
info('Method Get: OnPlayerShoot:');
info('Server Recieved From Client: ');
command('Data_Manager: '+JSON.stringify(data));


socket.emit('OnPlayerShoot',data);
socket.broadcast.emit('OnPlayerShoot',data);

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//END PLAYER SHOOT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//START PLAYER HEALTH
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*socket.on('health',function(data){
command(currentPlayer.UserId+' recv: health: '+JSON.stringify(data));
if(data.from === currentPlayer.UserId){
var indexDamage = 0;
if(!data.isEnemy){
clients = clients.map(function(client,index){
if(client.UserId == data.UserId){

	indexDamage = index;
	client.UserHealth -=data.healthChange;
}
return client;
});
}else{
	enemies = enemies.map(function(enemy, index){
        if(enemy.name === data.name){
        	indexDamage = index;
        	enemy.UserHealth -= data.healthChange;

        }
        return enemy;
	});
}

var response = {
	name:(!data.isEnemy) ? clients[indexDamage].name : enemies[indexDamage].name,
	health:(!data.isEnemy) ? clients[indexDamage].UserHealth : enemies[indexDamage].UserHealth
};
clear(currentPlayer.UserId+' bcst: health: '+JSON.stringify(response));
socket.emit('health',response);
socket.broadcast.emit('health',response);

}
}); 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//END PLAYER HEALTH
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//START PLAYER DISCONNECT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

socket.on('OnPlayerDisconnect',function(data)
{
info('Method Get: OnPlayerDisconnect:');
info('Server Recieved From Client: ');
command('Data_Manager: '+JSON.stringify(data));
debug('Data: Total Online Clients= '+clients.length);




for(var i =0; i<clients.length; i++)
{

	debug(clients[i].UserId);
if(clients[i].UserId === data.UserId)
{
	
	
	
	clients.splice(i,1);
	
	socket.emit('OnPlayerDisconnect',data);
	socket.broadcast.emit('OnPlayerDisconnect',data);
	clear('Method Finished: OnPlayerDisconnect:');
}

    
   
   
   

}

debug('Data: New Total Online Clients= '+clients.length);

});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//END PLAYER DISCONNECT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
});




function guid(){
	function s4(){
		return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
	}
	return s4()+s4() + '-' + s4() +'-'+s4()+'-'+s4()+'-'+s4()+s4() +s4();
}


function clear(m)
{
	console.log(m.Green);
}

function command(m)
{
	console.log(m.Blue);
}

function debug(m)
{
	console.log(m.Red);
}

function info(m)
{
	console.log(m.Yellow);
}

function About()
{
info("PCTRS SERVER");
info("Build Version 0.01");
info("www.projectclickthrough.com");
info("Copyrights @ What Copyrights 2017");
info("Trademark @ What Trademark 2017");
}

//Todo how Can I get the current player information and submit to the server when they move to keep them connected
//else if the user is still login to the server and they have been inactive for xamount of time disconnect them..
//I havent solved it 
function CheckIdleStatus(i,UserId,tick,socket,who,action)
{
	
	if(tick > DISCONNECT_TIME && action == false)
	{
		debug("CheckIdleStatus Tick: "+tick ); 
		 var playerDisConnected = {
		
		UserId:clients[i].UserId
	};

	
	
    // if(playerDisConnected == who)
      // {
		socket.emit('OnPlayerDisconnect',playerDisConnected);
		socket.broadcast.emit('OnPlayerDisconnect',playerDisConnected);

		clients.splice(i,1);
	 //  }
	
	}

  debug("CheckIdleStatus UserId: "+UserId); 
  debug("IdleTime Disconnect: "+tick); 
  debug("CheckIdleStatus who: "+who );
  debug("CheckIdleStatus who: "+action );
  debug("WHO IS I: "+i); 

 debug('Data: Total Online Clients= '+clients.length);
	

}

