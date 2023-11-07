// Канвас
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

var w = canvas.width,
	h = canvas.height;


//рисования круга
var circle = function(x, y, radius, fillCircle){
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI*2, false);
	if (fillCircle)
		ctx.fill();
	else
		ctx.stroke();
};


// мяч
var Ball = function(){
	this.x = w/2;
	this.y = h/2;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.speed = 5;
	this.size = 10;
};

Ball.prototype.move = function(){
	if (this.x < 0 || this.x > w)
		this.xSpeed = -this.xSpeed;

	if (this.y < 0 || this.y > h)
		this.ySpeed = -this.ySpeed;

	this.x += this.xSpeed;
	this.y += this.ySpeed;
};

Ball.prototype.draw = function(){
	circle(this.x, this.y, this.size, true);
};

Ball.prototype.keyInput = function(act){
	switch (act){
		case "up":
			this.xSpeed = 0;
			this.ySpeed = -this.speed;
			break;

		case "down":
			this.xSpeed = 0;
			this.ySpeed = this.speed;
			break;

		case "right":
			this.xSpeed = this.speed;
			this.ySpeed = 0;
			break;

		case "left":
			this.xSpeed = -this.speed;
			this.ySpeed = 0;
			break;

		case "stop":
			this.xSpeed = 0;
			this.ySpeed = 0;
			break;

		case "speedDown":
			if (this.speed > 1)
				this.speed--;
			break;

		case "speedUp":
			if (this.speed < 15)
				this.speed++;
			break;

		case "sizeDown":
			if (this.size > 1)
				this.size--;
			break;

		case "sizeUp":
			if (this.size < 25)
				this.size++;
			break;
	};
};


// контроллер
var ball = new Ball();

var keyActions = {
	32: "stop",
	37: "left",
	38: "up",
	39: "right",
	40: "down",
	90: "speedDown",
	88: "speedUp",
	67: "sizeDown",
	86: "sizeUp"
};

$("body").keydown(function(event){
	if (!(event.keyCode in keyActions))
		return;
	console.log(event.keyCode);
	var action = keyActions[event.keyCode];
	ball.keyInput(action);
});

setInterval(function(){
	ctx.clearRect(0, 0, w, h);
	ball.draw();
	ball.move();
}, 30);