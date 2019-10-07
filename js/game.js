var enemies; //(x,y) has the max (from 1,1) of (1600, 1900)
var player;
var myScore;
var score = new component(0,0,0,0,0,0,1)

function startGame() {
 myGame.resize();
 myGame.start();
 player = new component(80, 39.6, 'images/car.png', 10, 130.2, 'image');
 enemies = new component(90, 49.6, "images/enemy.png", 1000, 20, 'image');
 myScore = new component("20px", "Consolas", "black", 0, 40, "text");
 score.number = 0;
}

var myGame = {
 canvas : document.createElement("canvas"),
 getSize : function() {
  if (window.innerWidth*9<window.innerHeight*16) {
   getSizeWidth = Math.min(window.innerWidth, 16*100);
   getSizeHeight = 9/16*Math.min(window.innerWidth, 16*100);
  } else {
   getSizeWidth = 16/9*Math.min(window.innerHeight, 9*100); //600;
   getSizeHeight = Math.min(window.innerHeight, 9*100); //300;
   }
  return [getSizeWidth-10, getSizeHeight-10] //-10 for boarders
 },
 resize : function() {
    //if (window.innerWidth*16>window.innerHeight*9) {
    // this.canvas.width = Math.min(window.innerWidth, 16*100);
   ///  this.canvas.height = 9/16*Math.min(window.innerWidth, 16*100);
  ///  } else {
    // this.canvas.width = 16/9*Math.min(window.innerHeight, 9*100); //600;
    // this.canvas.height = Math.min(window.innerHeight, 9*100); //300;
   // }
   [this.canvas.width, this.canvas.height] = myGame.getSize()
  },
  start : function() {
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
      myGame.keys = (myGame.keys || []);
      myGame.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function (e) {
      myGame.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('resize', function (e) {
      myGame.resize()
    })
  },
  clear : function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
 stop : function() {
  clearInterval(this.interval);
 }
}
function component(width, height, color, x, y, type, number) {
 this.type = type;
 if (type == "image") {
  this.image = new Image();
  this.image.src = color;
 }
  this.gamearea = myGame;
  this.number = number + 1;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGame.context;
     if (type == "image") {
   ctx.drawImage(this.image,
    this.x,
    this.y,
    this.width, this.height);
  } else {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);}
    if (this.type == "text") {
   ctx.font = this.width + " " + this.height;
   ctx.fillStyle = color;
   ctx.fillText(this.text, this.x, this.y);
  } else {
  }}
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
 



function updateGameArea() {
 if (player.crashWith(enemies)) {
  myGame.stop();
 } else {
  myGame.clear();
  myGame.frameNo += 1;
  player.speedX = 0;
  player.speedY = 0; 
  if (myGame.keys && myGame.keys[37] && player.x > 10) {player.speedX = -5;}
  if (myGame.keys && myGame.keys[39] && player.x < 370) {player.speedX = 5; }
  if (myGame.keys && myGame.keys[38] && player.y > 10) {player.speedY = -5; }
  if (myGame.keys && myGame.keys[40] && player.y < 250.4) {player.speedY = 5; }
  player.newPos();  
  player.update();
  myScore.text = "SCORE: " + score.number;
  score.update();
  myScore.update();
  enemies.newPos();
  enemies.update();
  enemies.x += -15;
  if(enemies.x <= -49.6){
   score.number += 1;
   enemies.x = 1000;
   enemies.y = Math.floor(Math.random() * 250.4) + 1
  }
 }
}












