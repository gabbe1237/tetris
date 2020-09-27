

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
			[1, 0],
			[1, 0],
			[1, 1]
		];

		var longblock = [
			[1, 1, 1, 1]
		];

		var squareblock = [
			[1, 1],
			[1, 1],
		];

		var zblock = [
			[1, 0],
			[1, 1],
			[0, 1]
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


var tid = -10;
function draw() {
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
	// Tar bort det gammla blocket om den inte har ramlar ner på skärmen eller på ett annat block. Jag inte ta bort den om den landar ju.
	if (!krock()) {
		for (var i = 0; i < tetrimino.block.length; i++) {
			for (var j = 0; j < tetrimino.block[i].length; j++) {
				grid[ytemp + i][xtemp + j] = 0;
			}
		}
		// background(51)
	}

	// drawBoard()


	if (!krock()) {
		if (tid > 0 && tid % 600 === 0) {
			tetrimino.y++;
		}
	} else {
		// Blocket har landat och ett nytt block skall skapas
		tetrimino = new Block;
	}


	if (tid % 40 === 0) {
		if (keyIsDown(DOWN_ARROW) && !krock()) {
			tetrimino.y++;
		}
	}

	tid += 10
}

function drawBoard() {
	for (var i = 0; i < cellh; i++) {
		for (var j = 0; j < cellw; j++) {
			if (grid[i][j] == 0) {
				stroke(0);
				fill(51);
				rect(j * blockdim, i * blockdim, blockdim, blockdim);
			}
			else {
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
}

function krock() {
	// Denna del gör precis det som funktionen väggy gör. Jag använder bara väggy i mina if-satser för att slippa långa rader. 
	if (tetrimino.block.length + tetrimino.y >= cellh) {
		return true
	}

	// Denna del kollar om en tetrimino träffar en annan tetrimino. Detta görs genom att loopa igenom den aktiva tetriminons lista och kolla om det finns en etta under 
	// det aktiva elementet. En tetrimino kan ha ettor under sig (kolla på t.ex. T tetriminon) och därför måste jag endast loopa igenom element som inte har en etta under sig. 
	// Detta gör dock att jag måste dela upp hela fallet i två fall, ett där jag kollar det nyss nämnda och ett annat där jag kollar det sista elementet. 
	var trueorfalse;
	for (var i = 0; i < tetrimino.block.length; i++) {
		for (var j = 0; j < tetrimino.block[i].length; j++) {
			if (tetrimino.block[i][j] !== 0) {
				// Notera att grid[i + tetrimino.y + 1] alltid kommer att vara definerad pga. av if-satsen högst upp i funktionen. 
								//Om det finns en etta under		// Om det finns en etta under själva tetriminon
				if (i < tetrimino.block.length - 1 && tetrimino.block[i + 1][j] !== 1 && grid[i + tetrimino.y + 1][j + tetrimino.x] === 1) {
					trueorfalse = true;
				}

				// Kollar på den sista listan i tetriminon.
				if (i === tetrimino.block.length - 1 && grid[i + tetrimino.y + 1][j + tetrimino.x] === 1) {
					trueorfalse = true;
				}

			}
		}
	}

	if (trueorfalse === true) {
		return true;
	}
	if (trueorfalse !== true) {
		return false;
	}
}

function väggx(sida) {
	for (var i = 0; i < tetrimino.block.length; i++) {
		for (var j = 0; j < tetrimino.block[i].length; j++) {
			if (sida === "höger") {
				if (tetrimino.block[i].length + tetrimino.x >= cellw) {
					return true;
				} else {
					return false;
				}
			}
			if (sida === "vänster") {
				if (tetrimino.x <= 0) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
}
function keyPressed() {
	//kanske flytta över detta till draw()
	if (keyCode === LEFT_ARROW && !väggx("vänster")) {
		tetrimino.x--;
	}

	if (keyCode === RIGHT_ARROW && !väggx("höger")) {
		tetrimino.x++;
	}

	if (keyCode === UP_ARROW) {
		//Rotera hela skiten. 
	}
}
