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

const checkMacth ={
	'n': -2,
	's': 2,
	'w': -2,
	'e': 2
}

class Elve {

	constructor(x,y){
		this.currentPos = {row:x ,col:y}
		this.consPos = {row: 1e6, col: 1e6 }
		this.dirs = ['n','s','w','e']

	}
	
	moveDir(){}
	emptyAdj(){}
	getConsPos(){}
	
	moveElv(){}
	
}

var elves = []
for (rows in data){
	for(cols in data[rows]){
		if(data[rows][cols] == '#') elves.push(new Elve(rows, cols))
	}
}

// computation
while (rounds <= 10){
	
	for (x of elves){
		if(!x.emptyAdj()){
			x.getConsPos()
			x.moveDir()
		}
	}
	
	// check matches
	for (x in elves){
		var dir = elves[x].dirs[3]
		
		switch(dir) {
			'n':
			's': {
				if(elves[x].consPos.row == elves[x + checkMacth[dir]].consPos.row && (elves[x].consPos.col == elves[x].consPos.col)
					else{
						elves[x].moveElv
					}
			}
			'w':
			'e':{
				if(elves[x].consPos.row == elves[x].consPos.row && (elves[x].consPos.col == elves[x + checkMacth[dir]].consPos.col)
					else{
						elves[x].moveElv
					}
			}
				
			
		}
		
		
		
	}
	
	rounds++
}



//console.log(elves)

function showAllElves(elves){
	
	for (x of elves) console.log(x.currentPos.row + " | "+ x.currentPos.col)
}
showAllElves(elves)