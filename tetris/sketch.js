
var cw = 300;
var ch = 600;
// En tetris bräda är 20 blocks hög och 10 bred. 
var cellh = 20;
var cellw = 10;
var blockdim = 30;

var grid;

class Block {
	constructor() {
		var lblock = [
			[1, 0, 0],
			[1, 0, 0],
			[1, 1, 0]
		];

		var longblock = [
			[1, 1, 1, 1]
		];

		var squareblock = [
			[1, 1, 0],
			[1, 1, 0],
		];

		var zblock = [
			[1, 0, 0],
			[1, 1, 0],
			[0, 1, 0]
		];

		var tblock = [
			[1, 1, 1],
			[0, 1, 0]
		];

		var listblocks = [lblock, longblock, squareblock, zblock, tblock];
		this.block = random(listblocks);
		this.x = 4;
		this.y = 0;
	}
};

function setup() {
	var canvas = createCanvas(cw, ch);
	canvas.position(windowWidth / 2 - cw / 2, 100);
	background(51);

	// Gör en 10X20 lista där elementen är nollor. Detta för att senare göra visa element ettor när det väl finns tetris blocks. 
	grid = new Array(cellw);
	for (var i = 0; i < cellh; i++) {
		grid[i] = new Array(cellw);
		for (var j = 0; j < cellw; j++) {
			grid[i][j] = 0;
		}
	}
	tetrimino = new Block;
}
var tid = 0;
function draw() {
	// Alternativt kan frameRate(num) användas för att uppnå samma resultat. 
	if (tid % 100 == 0) {
		//Ritar blocken
		for (var i = 0; i < tetrimino.block.length; i++) {
			for (var j = 0; j < tetrimino.block[i].length; j++) {
				if (tetrimino.block[i][j] !== 0) {
					grid[tetrimino.y + i][tetrimino.x + j] = 1;
				}
			}
		}
		drawBoard();

		var xtemp = tetrimino.x;
		var ytemp = tetrimino.y;
		if (väggy() == false) {
			tetrimino.y++;
			// Tar bort det gammla blocket. 
			for (var i = 0; i < tetrimino.block.length; i++) {
				for (var j = 0; j < tetrimino.block[i].length; j++) {
					grid[ytemp + i][xtemp + j] = 0;

				}
			}
		} else {
			// Blocket har landat och ett nytt block skall skapas
			tetrimino = new Block;
		}

	}
	tid += 10;
}

function drawBoard() {
	for (var i = 0; i < cellh; i++) {
		for (var j = 0; j < cellw; j++) {
			if (grid[i][j] == 0) {
				stroke(0);
				fill(51);
				rect(j * blockdim, i * blockdim, blockdim, blockdim);
			} else {
				fill(255);
				rect(j * blockdim, i * blockdim, blockdim, blockdim);
			}
		}
	}
}


function väggy() {
	if (tetrimino.block.length + tetrimino.y >= cellh) {
		return true
	} else {
		return false;
	}
h
}