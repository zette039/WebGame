//(x,y) has the max (from 1,1) of (1600, 1900)
var player;
var myScore;

// Create global variables for enemies
var enemies = [];

// Drawn sprite setup
score = new sprite("20px", "Consolas", "black", 0, 40, "text");
player = new sprite(80, 39.6, 'images/car.png', 10, 130.2, 'image');

function startGame() {
  // Generate enemies with starting value
  var quantE = 5; //parseInt(window.prompt("Difficaulty (integer):"));
  for (const x of Array(quantE).keys()) {
    enemy = new sprite(90, 49.6, "images/enemy.png", 1900, Math.floor(Math.random() * 1600), 'image');
    enemies.push(enemy);
  }

  // Begin game loops
  myGame.resize();
  myGame.start();
  score.number = 0;
}

var myGame = {
    canvas: document.createElement("canvas"),
    getSize: function() {
        if (window.innerWidth * 9 < window.innerHeight * 16) {
            getSizeWidth = Math.min(window.innerWidth);
            getSizeHeight = 9 / 16 * Math.min(window.innerWidth);
        } else {
            getSizeWidth = 16 / 9 * Math.min(window.innerHeight); //600;
            getSizeHeight = Math.min(window.innerHeight); //300;
        }
        return [getSizeWidth - 10, getSizeHeight - 10] //-10 for boarders
    },
    resize: function() {
        [this.canvas.width, this.canvas.height] = myGame.getSize()
    },
    start: function() {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(gameTickLoop, 40);
        window.addEventListener('keydown', function(e) {
            myGame.keys = (myGame.keys || []);
            myGame.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function(e) {
            myGame.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('resize', function(e) {
            myGame.resize()
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

function sprite(width, height, color, x, y, type, number) {
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
this.drawPosX = function() {
  return (this.x*myGame.getSize()[0]/1900)
}
this.drawPosY = function() {
  return (this.y*myGame.getSize()[1]/1600)
}
this.drawPosW = function() {
  return this.width*1/(1900/myGame.getSize()[0])
}
this.drawPosH = function() {
  return this.height*1/(1600/myGame.getSize()[1])
}

this.update = function() {
    ctx = myGame.context;
    if (type == "image") {
        ctx.drawImage(this.image,
            this.drawPosX(),
            this.drawPosY(),
            this.drawPosW(), this.drawPosH());
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.drawPosX(), this.drawPosY(), this.drawPosW(), this.drawPosH());
    }
    if (this.type == "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.drawPosX(), this.drawPosY());
    } else {}
}
this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
}
this.crashWith = function(otherobj) {
    var myleft = this.drawPosX();
    var myright = this.drawPosX() + this.drawPosW();
    var mytop = this.drawPosY();
    var mybottom = this.drawPosY() + this.drawPosH();

    var otherleft = otherobj.drawPosX();
    var otherright = otherobj.drawPosX() + (otherobj.drawPosW());
    var othertop = otherobj.drawPosY();
    var otherbottom = otherobj.drawPosY() + (otherobj.drawPosH());
    var crash = true;
    if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
        crash = false;
    }
    return crash;
}
this.debug = function() {
  //commented for release
  //ctx = myGame.context;
  //ctx.strokeRect(this.drawPosX(), this.drawPosY(), this.drawPosW(), this.drawPosH());
}
}



function gameTickLoop() { // Loop the game
    // Game updates
    //myScore.update();
    myGame.clear();
    myGame.frameNo += 1;

    score.text = "SCORE: " + score.number;
    score.update();
    // Player updates
    player.speedX = 0;
    player.speedY = 0;
    if (myGame.keys && myGame.keys[37] && player.x > 0+10) {
        player.speedX = -15;
    }
    if (myGame.keys && myGame.keys[39] && player.x < 1900-10) {
        player.speedX = 15;
    }
    if (myGame.keys && myGame.keys[38] && player.y > 0+10) {
        player.speedY = -15;
    }
    if (myGame.keys && myGame.keys[40] && player.y < 1600-10) {
        player.speedY = 15;
    }
    player.newPos();
    player.update();
    player.debug();
    // Enemy Updates
    for (i in enemies) {
        enemy = enemies[i];
        if (player.crashWith(enemy)) {
            score.number -= 50; //myGame.stop();
        } else {
            enemy.x = enemy.x-(20*Math.random()+10);
            enemy.newPos();
            if (enemy.x <= -50) {
                score.number += 1;
                enemy.x = 1900;
                enemy.speedX = 0;
                enemy.y = Math.floor(Math.random() * 1600)
                if (Math.random() > 0.9) {
                      newEnemy = new sprite(90, 49.6, "images/enemy.png", 1900, Math.floor(Math.random() * 1600), 'image');
                      enemies.push(newEnemy);
                }
            }
            enemy.update();
            enemy.debug();
        }
    }
}
