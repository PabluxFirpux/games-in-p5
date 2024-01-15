const WIDTH = 600;
const HEIGHT = 600;
const CELLSIZE = 20;
let grid = [];
let snake = [];
let gameOver = false;

const DIR = {
	UP: 0,
	RIGHT: 1,
	DOWN: 2,
	LEFT: 3
};
let dir = DIR.RIGHT;

function setup() {
	createCanvas(WIDTH, HEIGHT);
	for (let i = 0; i < WIDTH; i += CELLSIZE) {
		let arr = [];
		grid.push(arr);
		for (let j = 0; j < HEIGHT; j += CELLSIZE) {
			grid[i / CELLSIZE].push(0);
		}
	}
	//Snake en el centro
	let medioX = WIDTH / (2 * CELLSIZE);
	let medioY = HEIGHT / (2 * CELLSIZE);
	grid[medioX][medioY] = 1;
	snake.push([ medioX, medioY ]);
	//Manzana en un lugar aleatorio
	grid[Math.floor(random(WIDTH / CELLSIZE))][Math.floor(random(HEIGHT / CELLSIZE))] = 2;
}

function draw() {
	background(0);

	if (!gameOver) gameLoop();
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		dir = DIR.UP;
	} else if (keyCode === DOWN_ARROW) {
		dir = DIR.DOWN;
	} else if (keyCode === RIGHT_ARROW) {
		dir = DIR.RIGHT;
	} else if (keyCode === LEFT_ARROW) {
		dir = DIR.LEFT;
	}
}

const gameLoop = () => {
	calculateSnake();
	/*switch (keyCode) {
		case UP_ARROW:
			dir = DIR.UP;
			break;
		case RIGHT_ARROW:
			dir = DIR.RIGHT;
			break;
		case DOWN_ARROW:
			dir = DIR.DOWN;
			break;
		case LEFT_ARROW:
			dir = DIR.LEFT;
			break;
	}
  */
	for (let i = 0; i < WIDTH; i += CELLSIZE) {
		for (let j = 0; j < HEIGHT; j += CELLSIZE) {
			switch (grid[i / CELLSIZE][j / CELLSIZE]) {
				case 0:
					fill(color(0));
					rect(i, j, CELLSIZE, CELLSIZE);
					break;
				case 1:
					fill(color(0, 255, 0));
					rect(i, j, CELLSIZE, CELLSIZE);
					break;
				case 2:
					fill(color(255, 0, 0));
					rect(i, j, CELLSIZE, CELLSIZE);
					break;
				default:
					fill(color(0));
					rect(i, j, CELLSIZE, CELLSIZE);
					break;
			}
		}
	}
	frameRate(10);
};

const calculateSnake = () => {
	let head = snake[snake.length - 1];
	let newHead = [];
	switch (dir) {
		case DIR.UP:
			newHead = [ head[0], head[1] - 1 ];
			break;
		case DIR.RIGHT:
			newHead = [ head[0] + 1, head[1] ];
			break;
		case DIR.DOWN:
			newHead = [ head[0], head[1] + 1 ];
			break;
		case DIR.LEFT:
			newHead = [ head[0] - 1, head[1] ];
			break;
		default:
			newHead = [ head[0] + 1, head[1] ];
			break;
	}
	if (head[0] === newHead[0] && head[1] === newHead[1]) {
		return;
	} else if (newHead[0] < 0 || newHead[0] >= WIDTH / CELLSIZE || newHead[1] < 0 || newHead[1] >= HEIGHT / CELLSIZE) {
		//Muere
		console.log('Muere');
		gameOver = true;
		noLoop();
	} else if (grid[newHead[0]][newHead[1]] === 1) {
		//Muere
		gameOver = true;
		console.log('Muere');
		noLoop();
	} else if (grid[newHead[0]][newHead[1]] === 2) {
		//Come manzana
		snake.push(newHead);
		grid[newHead[0]][newHead[1]] = 1;
		grid[Math.floor(random(WIDTH / CELLSIZE))][Math.floor(random(HEIGHT / CELLSIZE))] = 2;
	} else {
		//Avanza
		snake.push(newHead);
		grid[newHead[0]][newHead[1]] = 1;
		let tail = snake.shift();
		grid[tail[0]][tail[1]] = 0;
	}
};
