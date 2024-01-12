const WIDTH = 600;
const HEIGHT = 600;
const CELLSIZE = 10;
let grid;

function setup() {
	createCanvas(WIDTH, HEIGHT);
	console.log('Working');
	grid = make2DArray(WIDTH / CELLSIZE, HEIGHT / CELLSIZE);
	fillGrid(grid);
}

function draw() {
	background(200);
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			grid[i][j].show();
		}
	}
	grid = nextGen(grid);
	setTimeout(() => {
		console.log('Next gem:');
	}, 2000);
}

const fillGrid = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (random(1, 10) < 5) {
				grid[i][j].alive = true;
			}
		}
	}
};

function make2DArray(cols, rows) {
	let arr = [];
	for (let i = 0; i < cols; i++) {
		arr.push([]);
		for (let j = 0; j < rows; j++) {
			arr[i].push(new Cell(i, j));
		}
	}
	return arr;
}

const countNeighbors = (grid, x, y) => {
	let sum = 0;
	for (let i = -1; i < 2; i++) {
		let col = (x + i + grid.length) % grid.length;
		for (let j = -1; j < 2; j++) {
			let row = (y + j + grid[0].length) % grid[0].length;
			sum += grid[col][row].alive;
		}
	}
	sum -= grid[x][y].alive;
	return sum;
};

const nextGen = (grid) => {
	let next = make2DArray(WIDTH / CELLSIZE, HEIGHT / CELLSIZE);
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			let state = grid[i][j].alive;
			let neighbors = countNeighbors(grid, i, j);
			if (state && (neighbors < 2 || neighbors > 3)) {
				next[i][j].alive = false;
			} else if (!state && neighbors === 3) {
				next[i][j].alive = true;
			} else {
				next[i][j].alive = state;
			}
		}
	}
	return next;
};

class Cell {
	constructor(x, y) {
		this.x = x * CELLSIZE;
		this.y = y * CELLSIZE;
		this.alive = false;
	}

	show() {
		if (this.alive) {
			fill(0);
			rect(this.x, this.y, CELLSIZE, CELLSIZE);
		} else {
			fill(255);
			rect(this.x, this.y, CELLSIZE, CELLSIZE);
		}
	}
}
