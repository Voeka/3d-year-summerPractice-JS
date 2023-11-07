const $ = el => document.querySelector(el);

// подключение канваса
let canvas = $("canvas"), ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// игрок
let player = {
	x: canvas.width / 2 - 25,
	y: canvas.height / 2 + 50,
	w: 50,
	h: 10,
	color: "green",
	score: 0,
	goodScore:0
};

let mark = {
	x:canvas.width/2,
	y:30,
	w:30,
	h:30,
	color:'red',
	scoreGiv:5
}



function moveMark(){
	for (let b of bullets) {
	if(mark.x<b.x){
		mark.x++;
		}
	if(mark.x+mark.w>b.x){
		mark.x--;
	}

	}
	var  timers=setTimeout(function(){
		mark.x+= Math.random()*5+-Math.random()*5
	},200)

}
// масимы движения и пулей
let moves = {};

let bullets = [];
// движение пулей
function moveBullets() {
	ctx.fillStyle = "brown";

	for (let b of bullets) {
		if (b.kuda === "right")
			b.x += 10;
		else if (b.kuda === "left")
			b.x -= 10;
		else if (b.kuda === "up")
			b.y -= 10;
		else
			b.y += 10;

		ctx.fillRect(b.x, b.y, b.w, b.h);

		if((b.x<=mark.x+1||b.x>mark.x+mark.w-1)&&(b.y<=mark.y||b.y>mark.y+mark.height)){
			player.score--;
			b.kuda ='none';
		} else if((b.x>=mark.x+1||b.x<mark.x+mark.w-1)&&(b.y<=mark.y||b.y>mark.y+mark.height)){
			player.goodScore++;
			player.score++;
		}

		if((b.x>player.x&&b.x<player.x+player.w)&&b.y==player.y){
			player.score--;
			b.kuda = 'up';
		}

		
	}

	// оставляем только пульки, которые видны
	// х пульки между 0 и шириной экрана
	// у пульки между 0 и высотой экрана
	bullets = bullets.filter(b => 
		b.x < canvas.width && b.x > 0 &&
		b.y > 0 && b.y < canvas.height
	);
}

// отрисовка
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	move();
	moveBullets();

	ctx.fillStyle = player.color;
	ctx.fillRect(player.x, player.y, 
								player.w, player.h);
	moveMark()
	ctx.font = "24px Arial";
	ctx.fillText(player.score, canvas.width / 2, 100);
	ctx.fillText(player.goodScore, canvas.width / 2-100, 100);
	ctx.fillText("Feed ME", canvas.width / 2-200, 100);

	ctx.fillStyle = mark.color;
	ctx.fillRect(mark.x,mark.y,mark.w,mark.h);

	if(player.goodScore>=1000){
		clearInterval(inter);
		alert('Вы победили.')
		console.log('aaa');
	}
}



// Проверка на нажатие и сразу действие
function move() {

	if (moves.ArrowUp) {
		if (player.y > canvas.height/2)
			player.y -= 5;
	}

	if (moves.ArrowDown) {
		if (player.y + player.h < canvas.height)
			player.y += 5;
	}

	if (moves.ArrowRight) {
		if (player.x + player.w < canvas.width)
			player.x += 5;
	}

	if (moves.ArrowLeft) {
		if (player.x > 0)
			player.x -= 5;
	}

	if (moves.KeyD) {
		bullets.push({
			x: player.x + player.w,
			y: player.y + player.h / 2,
			w: 20,
			h: 5,
			kuda: "right"
		});
	}

	if (moves.KeyA) {
		bullets.push({
			x: player.x - 20,
			y: player.y + player.h / 2,
			w: 20,
			h: 5,
			kuda: "left"
		});
	}

	if (moves.KeyW) {
		bullets.push({
			x: player.x + player.w / 2,
			y: player.y - 20,
			w: 5,
			h: 20,
			kuda: "up"
		});
	}

	if (moves.KeyS) {
		bullets.push({
			x: player.x + player.w / 2,
			y: player.y + player.h,
			w: 5,
			h: 20,
			kuda: "down"
		});
	}
}

var inter = setInterval(draw, 30);





document.onkeydown = e => moves[e.code] = true;
document.onkeyup = e => moves[e.code] = false;