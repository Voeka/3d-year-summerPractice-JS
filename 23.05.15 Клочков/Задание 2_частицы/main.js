// к канвасу

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");


// Рандом
function rnd(min, max) {
	return Math.random() * (max-min) + min;
}
// Ширина и высота
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// цвета и задний фон
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
canvas.style.backgroundColor = "black";
// canvas.style.backgroundImage('1.jpg')

let points = [];
let SPEED = 6;

const MAX_DIST = 250;
// Создание точек
function addPoint(x, y) {
	let newPoint = {
		x: x,
		y: y,
		angle: rnd(0, Math.PI * 2)
	};
	points.push(newPoint);
}
// Создание точек не больше 25
for (let i = 0; i < 35; i++) {
	addPoint(rnd(0, canvas.width), rnd(0, canvas.height));
}


let mouse_pos = {};
function drawPoints() {
	for (let point of points) {
		ctx.beginPath();
		ctx.arc(point.x, point.y, 5, 0, Math.PI*2);
		ctx.fill();


			ctx.beginPath();
			ctx.moveTo(point.x, point.y);
			ctx.lineTo(mouse_pos.x, mouse_pos.y);

			ctx.lineWidth = 1;
			ctx.stroke();
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	

	drawPoints();
	drawLines();
	movePoint();

	requestAnimationFrame(draw);
}

draw();
// Движение  точек
function movePoint() {
	for (let point of points) {
		point.x += document.querySelector("input").value * Math.cos(point.angle);
		point.y += document.querySelector("input").value * Math.sin(point.angle);

		if (point.x > canvas.width)
			point.x = 0;

		if (point.x < 0)
			point.x = canvas.width;

		if (point.y > canvas.height)
			point.y = 0;

		if (point.y < 0)
			point.y = canvas.height;
	}
}
// расчёт дистанции
function getDist(a, b) {
	return ((a.x - b.x)**2 + (a.y - b.y)**2)**0.5;
}
// Рисование линий
function drawLines() {
	for (let pointA of points) {
		for (let pointB of points) {
			if (pointA == pointB) continue;

			let distance = getDist(pointA, pointB);
			if (distance < MAX_DIST) {
				ctx.beginPath();
				ctx.moveTo(pointA.x, pointA.y);
				ctx.lineTo(pointB.x, pointB.y);

				ctx.lineWidth = (1 - (distance / MAX_DIST));
				ctx.stroke();
			}
		}
	}
}

canvas.onclick = function(e) {
	addPoint(e.clientX, e.clientY)
};

canvas.onmousemove = e => {
	let mouse = {
		x: e.clientX,
		y: e.clientY
	};
mouse_pos = mouse;
	for (let point of points) {
		let distance = getDist(point, mouse);

		if (distance <= MAX_DIST) {
			if (mouse.y > point.y)
				point.y -= SPEED;
			else
				point.y += SPEED;

			if (mouse.x > point.x)
				point.x -= SPEED;
			else
				point.x += SPEED;
		}
	}
};