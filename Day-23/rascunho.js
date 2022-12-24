// Day 23

// rows 73
// cols 73

/** 
Notes:
	- if no adjacent elves dont move
	- if more then 1 elve move to the same position none of them move
	- the first direction the elves considered is moved to the end of the directions list

*/
const data = document.getElementsByTagName("pre")[0].textContent.split("\n")
data.pop()

const maxRounds = 10000

const checkMacth ={
	'n': -2,
	's': 2,
	'w': -2,
	'e': 2
}

const toMove = {
			'n': function(x,y) { return [x-1, y] },
			's': function(x,y){ return [x+1, y] },
			'e': function(x,y){ return [x, y+1] },
			'w': function(x,y){ return [x, y-1] }
		}

class Elve {

	constructor(x,y){
		this.currentPos = {row:x ,col:y}
		this.consPos = {row: 1e6, col: 1e6 }
		this.dirs = ['n','s','w','e'],
		this.occDirs = ''

	}
	
	moveDir(){ this.dirs.push(this.dirs.shift()) }
	/*moveDir(dir){ 
		var idx = this.dirs.indexOf(dir)
		var removedElement = this.dirs.splice(idx, 1)
		this.dirs.push(removedElement)
	}*/
	
	emptyAdj(elves){
		var isEmpty = true
		
		var possiblePositions = [
		[this.currentPos.row-1, this.currentPos.col-1, 'nw'],
		[this.currentPos.row-1, this.currentPos.col, 'n'],
		[this.currentPos.row-1, this.currentPos.col+1, 'ne'],
		
		[this.currentPos.row, this.currentPos.col+1, 'e'],
		[this.currentPos.row, this.currentPos.col-1, 'w'],
		
		[this.currentPos.row+1, this.currentPos.col-1, 'sw'],
		[this.currentPos.row+1, this.currentPos.col, 's'],
		[this.currentPos.row+1, this.currentPos.col+1, 'se'],
		]
		
		for(let x of elves){
			for(let coords of possiblePositions){
				if(x.currentPos.row == coords[0] && x.currentPos.col == coords[1]){
					this.occDirs += coords[2]
					isEmpty = false
				}
			}
		}
		
		return isEmpty
	}
	
	getConsPos(){
		
		for(let dir of this.dirs){
			if(!this.occDirs.includes(dir)){
				var computedCoords = toMove[dir](this.currentPos.row, this.currentPos.col)
				this.consPos.row = computedCoords[0]
				this.consPos.col = computedCoords[1]
				
				break
			}
		}
		
		return this.consPos
	}
	
	moveElv(){
		this.currentPos.row = this.consPos.row 
		this.currentPos.col = this.consPos.col 
	}
	
	cleanOccDirs(){this.occDirs = ''}
	
}

var elves = []
for (let rows in data){
	for(let cols in data[rows]){
		if(data[rows][cols] == '#') elves.push(new Elve(parseInt(rows)+10, parseInt(cols)+10))
	}
}

// computation
var round = 0
while (true){
	var count = 0
	var movableElves = []
	
	for (let x of elves){
		if(!x.emptyAdj(elves)){
			x.getConsPos()
			x.cleanOccDirs()
			movableElves.push(x)
			
			console.log(x)
		
		}else count++
		
		x.moveDir()
	}
	
	round++
	
	console.log("Round: "+round+ " | Count: "+count+" | Elves: "+elves.length)
	if(count == elves.length) break
	
	// check matches
	for (let x = 0; x < movableElves.length; x++){
		
		var cPos = [movableElves[x].consPos.row, movableElves[x].consPos.col]
		var move = true
		
		for(let y = 0; y < movableElves.length; y++){
			if (x == y) continue
			else{
				if(cPos[0] == movableElves[y].consPos.row && cPos[1] == movableElves[y].consPos.col){
				move = false
				break
				}
			}
		}
		
		if(move) movableElves[x].moveElv() 
	}
}