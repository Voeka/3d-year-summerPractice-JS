window.onload = function(){
	// привязываем переменную сtx к canvas c id=canvas
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var W = window.innerWidth,	// ширина окна
		H = window.innerHeight;	// высота окна

	// устанавливаем размеры canvas 
	canvas.width = W;
	canvas.height = H;

	// класс Box
	function Box(_x,_y){
		// координаты 
		this.x = _x;
		this.y = _y;

		// скорость по каждой координате
		this.xVel = Math.random()*2 - 1;
		this.yVel = 1 + Math.random()*3;

		// размеры квадрата (box)
		this.width = 20
		this.height = 20;

		// случайный цвет квадрата (три компоненты в rgb)
		this.r = Math.round(Math.random()*255);
		this.g = Math.round(Math.random()*255);
		this.b = Math.round(Math.random()*255);

		// цвет в полной записи
		this.rgba = "rgba("+this.r+","+this.g+","+this.b+",1)";

		// отрисовка квадрата
		this.draw = function(){
			ctx.fillStyle = this.rgba;	// цвет заполнения

			// рисуем прямоугольник
			ctx.fillRect(this.x,this.y,this.width,this.height); 
			this.update();
		};

		// реализация движения
		this.update = function(){
			// проверка на выход границу
			if (this.x < 0){
				this.x = 0;
				this.xVel *= -1;	// отскок (изменение направления)
			};

			// проверка правой границы
			if (this.x > W - this.width){
				this.x = W - this.width;	// установка координаты в 0
				this.xVel *= -1;	// отскок
			};

			// проверка верхней границы
			if (this.y < 0){
				this.y = 0;			
				this.yVel *= -1; 
			};

			if (this.y < H - this.height)
				this.yVel += .25;
			
			// проверка нижней границы
			if (this.y > H - this.height){
				this.xVel *= .5;
				this.yVel *= .5;

				this.y = H - this.height;
				this.yVel *= -1;
			};

			this.x += this.xVel;
			this.y += this.yVel;
		};
	};

	// массив квадратов
	var boxes = [];

	// рисуем фон и квадраты
	function draw(){
		// фон
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "rgba(0,0,0,0.5)";
		ctx.fillRect(0,0,W,H);

		ctx.globalCompositeOperation = "lighter";

		// перебор квадратов и отрисовка каждого
		for (i = 0; i < boxes.length; i++)
			boxes[i].draw();

		update();
	};

	// анимация
	function update(){
		// перебор всех квадратов и анимация каждого
		for(i = 0; i < boxes.length; i++)
			boxes[i].update();
	};

	// каждую минуту добавляем в массив квадратов новый квадрат
	setInterval(function(){
		boxes.push(new Box(Math.random()*W, 0));
	}, 250);

	// каждые 30 мс обновляем экран
	setInterval(draw, 30);
};