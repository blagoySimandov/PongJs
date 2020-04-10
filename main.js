window.onload = function() {
    animate(next);
  };

var player = new Human();
var computer = new Bot();
var ball = new Ball(200,300);

const animate = window.requestAnimationFrame;




var canvas = document.getElementById('canvas');
var width = 400;
var height = 600;
var context = canvas.getContext('2d');

var next = function() {
    update();
    render();
    animate(next);
  };
  
  var update = function() {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
  };
  
Ball.prototype.update = function(paddle1, paddle2) {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    var topX = this.x - 5;
    var topY = this.y - 5;
    var botX = this.x + 5;
    var botY = this.y + 5;
  
    if(this.x - 5 < 0) {
      this.x = 5;
      this.xSpeed = -this.xSpeed;
    } else if(this.x + 5 > 400) {
      this.x = 395;
      this.xSpeed = -this.xSpeed;
    }
  
    if(this.y < 0 || this.y > 600) {
      this.xSpeed = 0;
      this.ySpeed = 3;
      this.x = 200;
      this.y = 300;
    }
  
    if(topY > 300) {
      if(topY < (paddle1.y + paddle1.height) && botY > paddle1.y && topX < (paddle1.x + paddle1.width) && botX > paddle1.x) {
        this.ySpeed = -3;
        this.xSpeed += (paddle1.xSpeed / 2);
        this.y += this.ySpeed;
      }
    } else {
      if(topY < (paddle2.y + paddle2.height) && botY > paddle2.y && topX < (paddle2.x + paddle2.width) && botX > paddle2.x) {
        this.ySpeed = 3;
        this.xSpeed += (paddle2.xSpeed / 2);
        this.y += this.ySpeed;
      }
    }
  };
var render = function() {
  context.fillStyle = "#333333";
  context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();

};

function Slider(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = 0;
    this.ySpeed = 0;
}

Slider.prototype.render = function(){
    context.fillStyle = "whitesmoke";
    context.fillRect(this.x,this.y,this.width,this.height);
}
function Human() {
    this.paddle = new Slider(175, 580, 50, 10);
 }
 
 function Bot() {
   this.paddle = new Slider(175, 10, 50, 10);
 }
 Human.prototype.render = function() {
    this.paddle.render();
  };
  
  Bot.prototype.render = function() {
    this.paddle.render();
  };
  function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = 3;
    this.rad = 5;
  }
  
  Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.rad, 2 * Math.PI, false);
    context.fillStyle = "#FFFFFF";
    context.fill();
  };

  var keysPressed = {};

  window.addEventListener("keydown", event => {
    keysPressed[event.keyCode] = true;
  });
  
  window.addEventListener("keyup",event => {
    delete keysPressed[event.keyCode];
  });
  Human.prototype.update = function() {
    for(var key in keysPressed) {
      var value = Number(key);
      if(value == 37) {
        this.paddle.move(-4, 0);
      } else if (value == 39) {
        this.paddle.move(4, 0);
      } else {
        this.paddle.move(0, 0);
      }
    }
  };
  
  Slider.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.xSpeed = x;
    this.ySpeed = y;
    if(this.x < 0) {
      this.x = 0;
      this.xSpeed = 0;
    } else if (this.x + this.width > 400) {
      this.x = 400 - this.width;
      this.xSpeed = 0;
    }
  }


  Bot.prototype.update = function(ball) {
    var xPos = ball.x;
    var diff = -((this.paddle.x + (this.paddle.width / 2)) - xPos);
    if(diff < 0 && diff < -4) { 
      diff = -5;
    } else if(diff > 0 && diff > 4) {
      diff = 5;
    }
    this.paddle.move(diff, 0);
    if(this.paddle.x < 0) {
      this.paddle.x = 0;
    } else if (this.paddle.x + this.paddle.width > 400) {
      this.paddle.x = 400 - this.paddle.width;
    }
  };
  
