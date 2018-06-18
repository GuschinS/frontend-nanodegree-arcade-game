// Enemies our player must avoid
var Enemy = function (x, y, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	this.x = x;
	this.y = y;
	this.speed = speed;
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug-left.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x -= this.speed * dt;
	// Create a new enemy with different speed
	if (this.x < -100) {
		this.x = 700;
		this.speed = Math.floor(Math.random() * 300 + speedEnemy);
	}
	// Check for a collision between the player and opponents. Return the player to the starting position
	if (player.x < this.x + 50 &&
		player.x + 50 > this.x &&
		player.y < this.y + 30 &&
		player.y + 30 > this.y) {
		lives();
//		console.log(heart);
	}
};

function lives() {
	const hearts = live.getElementsByTagName('img');
	if (i < 3) {
		hearts[i].className = 'none';
		i = i + 1;
	}
	heart = heart - 1;
	player.x = 300;
	player.y = 500;
	if (heart === 0) {
		end();
	}
}

function allLives() {
	const hearts = live.getElementsByTagName('img');
	for (i = 0; i < hearts.length; i++) {
		hearts[i].className = 'yes';
	}
}

function end() {
	endGame.removeAttribute('style');
	scorend.textContent = 'Final Score: ' + score;
	score = 0;
	heart = 3;
	mov.textContent = score;
	speedEnemy = 100;
	allLives();
	i = 0;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function () {
	// Deny the player to move beyond the canvas
	if (this.y > 400) {
		this.y = 400;
	}

	if (this.x > 600) {
		this.x = 600;
	}

	if (this.x < 0) {
		this.x = 0;
	}

	// Make sure that the player wins the game and returns to the starting position
	if (this.y < 0) {
		this.x = 300;
		this.y = 400;
		score += 10;
		mov.textContent = score;
		speedEnemy = speedEnemy + 10;
	}
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Change the position of the player depending on the key pressed
Player.prototype.handleInput = function (keyPress) {
	switch (keyPress) {
		case 'left':
			this.x -= this.speed + 50;
			break;
		case 'up':
			this.y -= this.speed + 40;
			break;
		case 'right':
			this.x += this.speed + 50;
			break;
		case 'down':
			this.y += this.speed + 40;
			break;
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
// Position "y" where the enemies will are created
const enemyPosition = [60, 140, 220, 300];
const player = new Player(300, 400, 50);
const mov = document.querySelector('#score');
const scorend = document.querySelector('.score');
const endGame = document.querySelector('#end');
const live = document.querySelector('#hearts');
let heart = 3;
let enemy;
let speedEnemy = 100;
let score = 0;
let i = 0;

enemyPosition.forEach(function (posY) {
	enemy = new Enemy(700, posY, Math.floor(Math.random() * 300 + speedEnemy));
	allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
