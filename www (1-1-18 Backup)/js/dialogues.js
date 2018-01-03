var playerData = {
	username: "",
	password: "",
	firstname: "",
	lastname: "",
	lobbyPassword: "",
	hostname: "",
	inGame: "",
	inLobby: ""
};

var gameData = {
	players: null
};

function makeLobbyButton() {
	var div = "<div>";
	div += "<button class='UI' onClick='createLobbyPopup()'> Create Lobby </button>";
	div += "<br>";
	div += "<button class='UI' onClick='joinLobbyPopup()'> Join Lobby </button>";
	div += "</div>";
	pop(div);
}

function openLobby() {
	
	var div = "<div class='playerTextDiv'>";
	for(var i = 0; i < gameData.players.length; i++) {
		div += "<div class='playerText'>" + gameData.players[i] + "</div>"
	}
	div += "</div>";
	if(playerData.hostname == playerData.username) {
		div += "<button class='UI'> Leave </button>"
		div += "<button class='UI' onClick='submitGameStart()'> Start </button>"
	} else {
		div += "<button class='UI L'> Leave </button>"
	}
	pop(div);
	
	setInterval(function(){ 
		updateStats();
	}, 3000);
}

function joinLobbyPopup() {
	var div = "<div>";
	div += "<form class='UI L'>";
	div += "<br>";
	div += "Host Username";
	div += "<br>";
	div += "<input type='text' class='UI M' id='HN'>";
	div += "<br>";
	div += "Lobby Password";
	div += "<br>";
	div += "<input type='password' class='UI M' id='LPW'>";
	div += "<br><br>";
	div += "<input type='button' value='BACK' class='UI' onClick='makeLobbyButton()'>";
	div += "<input type='button' value='GO' class='UI' onClick='submitJoinLobby()'>";
	div += "<br>";
	div += "</form>";
	div += "</div>";
	pop(div);
}

function createLobbyPopup() {
	var div = "<div>";
	div += "<form class='UI L'>";
	div += "<br>";
	div += playerData.username + "'s Game";
	div += "<br>";
	div += "Create a Lobby Password";
	div += "<br>";
	div += "<input type='password' class='UI M' id='LPW'>";
	div += "<br><br>";
	div += "<input type='button' value='BACK' class='UI' onClick='makeLobbyButton()'>";
	div += "<input type='button' value='GO' class='UI'  onClick='submitCreateLobby()'>";
	div += "<br>";
	div += "</form>";
	div += "</div>";
	pop(div);
}

function login() {
	var div = "<div>";
	div += "<form class='UI L'>";
	div += "<br>";
	div += "Username";
	div += "<br>";
	div += "<input type='text' class='UI M' id='UN'>";
	div += "<br>";
	div += "Password";
	div += "<br>";
	div += "<input type='password' class='UI M' id='PW'>";
	div += "<br><br>";
	div += "<input type='button' value='BACK' class='UI' onClick='loginSignup()'>";
	div += "<input type='button' value='GO' class='UI' onClick='submitLogin()'>";
	div += "<br>";
	div += "</form>";
	div += "</div>";
	pop(div);
}

function signup() {
	var div = "<div>";
	div += "<form class='UI L'>";
	div += "<br>";
	div += "First Name";
	div += "<br>";
	div += "<input type='text' class='UI M' id='FN'>";
	div += "<br>";
	div += "Last Name";
	div += "<br>";
	div += "<input type='text' class='UI M' id='LN'>";
	div += "<br>";
	div += "Username";
	div += "<br>";
	div += "<input type='text' class='UI M' id='UN'>";
	div += "<br>";
	div += "Password";
	div += "<br>";
	div += "<input type='password' class='UI M' id='PW'>";
	div += "<br><br>";
	div += "<input type='button' value='BACK' class='UI' onClick='loginSignup()'>";
	div += "<input type='button' value='GO' class='UI' onClick='submitSignup()'>";
	div += "<br>";
	div += "</form>";
	div += "</div>";
	pop(div);
}

function loginSignup() {
	var div = "<div>";
	div += "<button class='UI' onClick='login()'> Login </button>";
	div += "<br>";
	div += "<button class='UI' onClick='signup()'> Signup </button>";
	div += "</div>";
	pop(div);
}

function pop(content) {
	uglipop({class:'put', //styling class for Modal
	source:'html',
	content: content });
}

function submitGameStart() {
	var fd = new FormData();
	
	fd.append( 'un', playerData.username  );
	fd.append( 'pw', playerData.password  );
	
	var response = submitForm('startGame', fd);
	console.log(response);
	if(response == "P") startGame();
}

function submitCreateLobby() {
	var fd = new FormData();
	
	playerData.lobbyPassword = $('#LPW').val();
	//you are the host
	playerData.hostname = playerData.username;
	
	fd.append( 'un', playerData.username  );
	fd.append( 'hn', playerData.username  );
	fd.append( 'pw', playerData.password  );
	fd.append( 'lpw', playerData.lobbyPassword );
	
	var response = submitForm('createLobby', fd);
	console.log(response);
	if(response == "P") startGame();
}

function submitJoinLobby() {
	var fd = new FormData();
	
	playerData.hostname = $('#HN').val();
	playerData.lobbyPassword = $('#LPW').val();
	
	fd.append( 'un', playerData.username  );
	fd.append( 'hn', playerData.hostname  );
	fd.append( 'pw', playerData.password  );
	fd.append( 'lpw', playerData.lobbyPassword );
	
	var response = submitForm('joinLobby', fd);
	console.log(response);
	if(response == "P") startGame();
}

function submitSignup() {
	
	var fd = new FormData();
	
	playerData.username = $('#UN').val();
	playerData.password = $('#PW').val();
	playerData.firstName = $('#FN').val();
	playerData.lastName = $('#LN').val();
	
	fd.append( 'un', playerData.username  );
	fd.append( 'pw', playerData.password  );
	fd.append( 'fn', playerData.firstName );
	fd.append( 'ln', playerData.lastName  );
	
	var response = submitForm('signup', fd);
	if(response == "P") startGame();
}

function submitLogin() {
	
	var fd = new FormData();
	
	playerData.username = $('#UN').val();
	playerData.password = $('#PW').val();
	
	fd.append( 'un', playerData.username );
	fd.append( 'pw', playerData.password );
	
	var response = submitForm('login', fd);
	console.log(response + " " + (response == "P"))
	if(response == "P") startGame();
}

function getPlayerData() {
	var fd = new FormData();
	
	fd.append( 'un', playerData.username );
	fd.append( 'pw', playerData.password );
	
	var player = submitForm('getPlayerStats', fd);
	
	playerData.hostname = player.hn;
	playerData.lobbyPassword = player.lpw;
	playerData.inGame = player.ig;
	playerData.inLobby = player.hn;
}

function getLobbyData() {
	var fd = new FormData();
		
	fd.append( 'un', playerData.username  );
	fd.append( 'hn', playerData.hostname  );
	fd.append( 'pw', playerData.password  );
	fd.append( 'lpw', playerData.lobbyPassword );
	
	gameData.players = submitForm('getPlayers', fd);
}

function startGame() {
	removePopup();
	getPlayerData();
	
	if(playerData.inGame) {
		inGame = true; 
	} else if(playerData.inLobby != null) {
		getLobbyData();
		openLobby();
	} else {
		makeLobbyButton();
	}
}

function updateStats() {
	getPlayerData();
	
	var preUpdatePlayers = gameData.players;
	getLobbyData();
	var postUpdatePlayers = gameData.players;
	var updateRequired = false;
	if(preUpdatePlayers != postUpdatePlayers) updateRequired = true;
	console.log(preUpdatePlayers + " : " + postUpdatePlayers);
	
	if(playerData.inGame) {
		removePopup();
		inGame = true; 
	} else if(playerData.inLobby != null && updateRequired) {
		openLobby();
	} else {
		makeLobbyButton();
	}
}
	
function submitForm(route, fd) {
	var r = "?";
	
	$.ajax({
		type: 'POST',
		async: false,
		url: 'http://localhost:5000/' + route,
		crossDomain: true,
		data: fd,
		processData: false,
		contentType: false,
		success: function(responseData, textStatus, jqXHR) {
			r = responseData;
		},
		error: function (responseData, textStatus, errorThrown) {
			r = 'F';
		}
	});
	
	return r;
}