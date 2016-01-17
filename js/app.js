var Character = function(startX, startY) {
  this.x = startX;
  this.y = startY;
};
// Draw the enemy on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemies our player must avoid
var Enemy = function(startX, startY) {
    Character.call(this, startX, startY);

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 100 * dt;
    var deltaX = Math.abs(this.x - player.x);
    var deltaY = Math.abs(this.y - player.y);
    if(deltaX < 50 && deltaY < 50) {
      player.x = 200;
      player.y = 405;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(startX, startY) {
  Enemy.call(this, startX, startY);
  this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
};
Player.prototype.handleInput = function(input) {
  if(input == 'left') {
    this.x -= 100;
  }
  else if(input == 'up') {
    this.y -= 83;
  }
  else if(input == 'right') {
    this.x += 100;
  }
  else if(input == 'down') {
    this.y += 83;
  }
  console.log(this.x,this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-100, 60)];
var player = new Player(200, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
