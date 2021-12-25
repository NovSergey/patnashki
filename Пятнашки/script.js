let n = 4;
let offset = 20;
let cell_s = 125;
let field = document.getElementById("outer");
let modal = document.getElementById("modal");
let button = document.getElementById("button");
let select = document.getElementById("select_n");
let freeCell, tiles, shuffle;
field.style.width = "500px";
field.style.height ="100px";
button.addEventListener("click", main);


function main(){
	modal.className = "modal"
	n = Number(select.value )
	let size = n * cell_s + (n + 1) * offset;
	field.style.width = size + "px";
	field.style.height = size + "px";
	freeCell = {x: n -1, y: n - 1};
	shuffle = true;
	create_field();
	create_cells();
	shuffletiles();
}

function create_field(){
	for(y = 0; y < n; y++){
		for(x = 0; x < n; x++){
			let cell = document.createElement("div");
			cell.className = "cell";		
			cell.x = x;
			cell.y = y;
			cell.style.left = (20+ 145 * cell.x) + "px";
			cell.style.top = (20+ 145 * cell.y) + "px";
			cell.style.width = "125px";
			cell.style.height = "125px";
			field.appendChild(cell);
		}
	}
}


function setCellOffset(cell){
	cell.style.left = (offset + (offset + cell_s) * cell.x) + "px";
	cell.style.top = (offset + (offset + cell_s) * cell.y) + "px";
	cell.style.width = cell_s + "px";
	cell.style.height = cell_s + "px";
}

function create_cells(){
	tiles = [];
	for(y = 0; y < n; y++){
		for(x = 0; x < n; x++){
			if (!(x == n -1 && y == n - 1)){
				let cell = document.createElement("div");
				cell.className = "tile";
				cell.x = x;
				cell.y = y;
				let t = y * n + x;
				tiles[t] = cell;
				cell.innerHTML = t + 1;
				cell.onclick = tileClick;
				setCellOffset(cell);
				field.appendChild(cell);
			}
		}
	}
}

function tileClick(event){
	let tile = event.target
	let pos = {x: tile.x, y: tile.y};
	if(invertical(tile) || ingorizantal(tile)){
		freeCell = pos;
		checkvictory();
	}
}

function btw(a, b, x){
	return a <= x && x<=b || b <= x && x<=a;
}


function invertical(cell){
	if(cell.x != freeCell.x){
		return false;
	}
	for (tile of tiles){
		if(tile.x == cell.x && btw(cell.y, freeCell.y, tile.y)){
			if (cell.y < freeCell.y){
				tile.y++;
			}
			else{
				tile.y--;
			}
			setCellOffset(tile);
		}
	}
	return true;
}

function ingorizantal(cell){
	if(cell.y != freeCell.y){
		return false;
	}
	for (tile of tiles){
		if(tile.y == cell.y && btw(cell.x, freeCell.x, tile.x)){
			if (cell.x < freeCell.x){
				tile.x++;
			}
			else{
				tile.x--;
			}
			setCellOffset(tile);
		}
	}
	return true;
}

function shuffletiles(){
	for(let i = 0; i < 1000; i++){
		let j = Math.floor(Math.random() * (n * n - 1));
		tiles[j].click();
	}
	shuffle = false;
}

function checkvictory(){
	if (shuffle)
		return	
	for(i in tiles){
		if(i != n * tiles[i].y + tiles[i].x)
			return;
	}
	console.log("Победа!!!!")
	modal.innerHTML = "Победа!"
	modal.className = "modal modal_visible"
}
