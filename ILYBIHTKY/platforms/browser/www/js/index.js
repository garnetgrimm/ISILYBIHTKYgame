/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

inGame = false;
currentWeapon = 0;
clicking = false;
x = window.innerWidth;
y = 0;
waeponryY = 0;
backgroundSizeX = 128;
backgroundSizeY = 128;
fontSize = 20;

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var imageObj = new Image();
imageObj.src = 'img/BIGSword.png';


var backround = new Image();
backround.src = 'img/BIGsteel.png';


var weapons = []

weapons.push('img/WeaponIcon.png');
weapons.push('img/BombIcon.png');
weapons.push('img/GunIcon.png');
weapons.push('img/AnidoteIcon.png');
weapons.push('img/SkullIcon.png');

for(var i = 0; i < weapons.length; i++) {
	var img = new Image();
	img.src = weapons[i];
	weapons[i] = img;
}

function drawRotated(img, degrees){
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    context.translate(canvas.width/2,canvas.height/2);
    context.rotate(degrees*Math.PI/180);
    context.drawImage(img,-img.width/2,-img.width/2);
    context.restore();
}

function update() {
	if(inGame) {
		imgSize =  window.innerHeight / weapons.length;
		context.canvas.width  = window.innerWidth;
		context.canvas.height = window.innerHeight;
		x = canvas.width / 2 - imageObj.width / 2;
		y = canvas.height / 2 - imageObj.height / 2;
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		if(!clicking) context.drawImage(imageObj, x,y);
		else drawRotated(imageObj, -30);
		for(var i = 0; i < weapons.length; i++) {
			context.drawImage(weapons[i], window.innerWidth - imgSize, (i * imgSize) , imgSize, imgSize);
		}
		
		context.font = fontSize + "px Balthazar";
		//if(context.measureText("Target: " + gameData.target).width>(window.innerWidth /4) - 10) fontSize--;
		//if(context.measureText("Target: " + gameData.target).width<(window.innerWidth /4) + 10) fontSize++;
		context.fillStyle = "cyan";
		context.textAlign = "left";
		//context.fillText("Target: " + gameData.target, (window.innerWidth/4) + 10,fontSize);
		context.fillText("Target: " + gameData.target, fontSize, fontSize);
	} else {
		imgSize =  window.innerHeight / weapons.length;
		context.canvas.width  = window.innerWidth;
		context.canvas.height = window.innerHeight;
		x = canvas.width / 2 - imageObj.width / 2;
		y = canvas.height / 2 - imageObj.height / 2;
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	}
  }
  
document.onmousedown = function (e) { if(!forClick(e)) clicking = true; };
document.onmouseup = function (e) { clicking = false; };
document.ontouchstart = function (e) { if(!forClick(e)) clicking = true; };
document.ontouchend = function (e) { clicking = false; };

function forClick (e) { 
	var clickedButton = false;
	for(var i = 0; i < weapons.length; i++) {
		if(e.clientX > (window.innerWidth - imgSize) && e.clientX <  (window.innerWidth - imgSize) + imgSize) {
			if(e.clientY > i * imgSize && e.clientY < (i * imgSize) + imgSize) {
				imageObj.src = weapons[i].src
				clickedButton = true;
			}
		}
	}
	return clickedButton;
}
  
setInterval(update, 1);