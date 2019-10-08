var enemy1 = false;
var enemy2 = false;
var enemy3 = false;
var enemy4 = false;
function et1 (){
enemy1 = true;
}

function et2 (){
enemy1 = true;
enemy2 = true;
}

function et3 (){
enemy1 = true;
enemy2 = true;
enemy3 = true;
}

function et4 (){
enemy1 = true;
enemy2 = true;
enemy3 = true;
enemy4 = true;
}
var car;
var myScore;
function startGame() {
    myGameArea.start();
	new component(0, 0, 'images/explosion.png', 100, 80, 'image');
    playeyer = new component(80, 39.6, 'images/car.png', 10, 130.2, 'image');
    e1 = new component(90, 49.6, "images/enemy.png", 1000, 20, 'image' );
    e2 = new component(90, 49.6, "images/enemy.png", 1000, 100, 'image' );
    e3 = new component(90, 49.6, "images/enemy.png", 1000, 200, 'image' );
    e4 = new component(90, 49.6, "images/enemy.png", 1000, 250.4, 'image' );
     myScore = new component("20px", "Consolas", "black", 0, 40, "text");
    score.number = 0;
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        });
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  stop : function() {
    clearInterval(this.interval);
	enemy1 = false;
	  enemy2 = false;
	  enemy3 = false;
	  enemy4 = false;
  }
}
var score = new component(0,0,0,0,0,0,1)
function component(width, height, color, x, y, type, number) {
 this.type = type;
 if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
    this.gamearea = myGameArea;
    this.number = number + 1;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        
        if (type == "image") {
      		ctx.drawImage(this.image,
          this.x,
        	this.y,
        	this.width, this.height);
    		} 
    		else {
    		ctx.fillStyle = color;
      	ctx.fillRect(this.x, this.y, this.width, this.height);
    		}
        
        if (this.type == "text") {
      		ctx.font = this.width + " " + this.height;
      		ctx.fillStyle = color;
      		ctx.fillText(this.text, this.x, this.y);
    		} 
     
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }  
    this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}
explosion.x = player.x;
explosion.y = player.y;
function updateGameArea() {
if (player.crashWith(e1)) {
    myGameArea.stop();}
    if (player.crashWith(e2)) {
    myGameArea.stop();}
    if (player.crashWith(e3)) {
    myGameArea.stop();}
    if (player.crashWith(e4)) {
    myGameArea.stop();
 } 
 else {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    player.speedX = 0;
    player.speedY = 0;  
 
    
    if (myGameArea.keys && myGameArea.keys[37] && player.x > 10) {player.speedX = 10;}
    if (myGameArea.keys && myGameArea.keys[39] && player.x < 370) {player.speedX = 10; }
    if (myGameArea.keys && myGameArea.keys[38] && player.y > 10) {player.speedY = -10; }
    if (myGameArea.keys && myGameArea.keys[40] && player.y < 250.4) {player.speedY = 10; }
    player.newPos();    
    player.update();
    myScore.text = "SCORE: " + score.number;
    score.update();
 		myScore.update();
   	if(enemy1 == true){
   		e1.update();
    	e1.x += -15;
    }
    
    if(enemy2 == true){
    	e2.update();
    	e2.x += -15;
    }
    
    if(enemy3 == true){
    	e3.update();
    	e3.x += -15;
    }
   
   	if(enemy4 == true){
    	e4.update();
    	e4.x += -15;
    }
   
    if(e1.x <= -49.6){
    	score.number += 1;
	    e1.x = 1000;
	    e1.y = Math.floor(Math.random() * 250.4) + 1
    }
    
    if(e2.x <= -49.6){
	    score.number += 1;
	    e2.x = 1000;
	    e2.y = Math.floor(Math.random() * 250.4) + 1
    }
    
    if(e3.x <= -49.6){
	    score.number += 1;
	    e3.x = 1000;
	    e3.y = Math.floor(Math.random() * 250.4) + 1
    }
    
    if(e4.x <= -49.6){
	    score.number += 1;
	    e4.x = 1000;
	    e4.y = Math.floor(Math.random() * 250.4) + 1
    }
 }
}
