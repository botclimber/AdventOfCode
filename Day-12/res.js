// DAY - 12

/**

	S current position
	E location with best signal
	
	going from a to z before reaching E 
	
	NOTE: use few steps as possible

	APPROACH:
		- matrix ?
		- run thro all indexes following the alphabetic condition each time we end up in a no escape state we start from the begining ? or we can persist some path
		
			- e.g.
				a b c
				b b d
				b a e
				
				- we can persist all positions that have more than one way to be chosen
	
*/
const data = document.getElementsByTagName("pre")[0].textContent.split("\n")

var dayTwelve = (function(){
	
	"use strict";
	
	const pathOrder = ['S','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','E']

	const heightMap = getData()
	const maxColIndexes = heightMap[0].length -1
	const maxRowIndexes = heightMap.length -1
	const startPos = indexOfMatrix('S')
	const endPos = indexOfMatrix('E')
	
	function getData(){
		var j = []
		for (let i = 0; i < data.length -1 ; i++) j.push([...data[i]])
		
		return j
	}

	function indexOfMatrix(x){
		for (let i in heightMap){
			var index = heightMap[i].indexOf(x)
			if( index != -1) return [i, index]
		}
		
		return -1
	}

	class Path {
		constructor(x, y){
			this.x = x
			this.y = y
			this.state = true // open or close
		}
		
	}

	class Intersection{
		constructor(x, y, paths){
			this.x = x
			this.y = y
			this.possiblePaths = paths
		}
		
	}
	
	class Travis {
		constructor(x, y, letter){
			this.x = x
			this.y = y
			this.letter = letter
		}
		
	}
	
	
	function getPossiblePaths(travis, prevPath){
		var pWays = {
			U:[travis.x+1, travis.y] 
			D:[travis.x-1, travis.y] 
			R:[travis.x, travis.y+1] 
			L:[travis.x, travis.y-1] 
		}
		var paths = []

		if(travis.x > 0 && travis.x < maxRowIndexes){
			if (travis.y > 0 && travis.y < maxColIndexes){
				if( (prevPath.x != pWays.U[0] && prevPath.y != pWays.U[1]) && (pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.U[0], pWays.U[1]))
					
				if( (prevPath.x != pWays.D[0] && prevPath.y != pWays.D[1]) && (pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.D[0], pWays.D[1]))
					
				if( (prevPath.x != pWays.R[0] && prevPath.y != pWays.R[1]) && (pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.R[0], pWays.R[1]))
					
				if( (prevPath.x != pWays.L[0] && prevPath.y != pWays.L[1]) && (pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.L[0], pWays.L[1]))
					
			}else if(travis.y == maxColIndexes){
				if( (prevPath.x != pWays.U[0] && prevPath.y != pWays.U[1]) && (pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.U[0], pWays.U[1]))
					
				if( (prevPath.x != pWays.D[0] && prevPath.y != pWays.D[1]) && (pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.D[0], pWays.D[1]))
					
				if( (prevPath.x != pWays.L[0] && prevPath.y != pWays.L[1]) && (pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.L[0], pWays.L[1]))
					
				
			}else if(travis.y == 0){
				if( (prevPath.x != pWays.U[0] && prevPath.y != pWays.U[1]) && (pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.U[0], pWays.U[1]))
					
				if( (prevPath.x != pWays.D[0] && prevPath.y != pWays.D[1]) && (pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.D[0], pWays.D[1]))
					
				if( (prevPath.x != pWays.R[0] && prevPath.y != pWays.R[1]) && (pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.R[0], pWays.R[1]))
				
			}
		}else if(travis.x == maxRowIndexes){
			if (travis.y > 0 && travis.y < maxColIndexes){
				if( (prevPath.x != pWays.U[0] && prevPath.y != pWays.U[1]) && (pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.U[0], pWays.U[1]))
					
				if( (prevPath.x != pWays.R[0] && prevPath.y != pWays.R[1]) && (pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.R[0], pWays.R[1]))
					
				if( (prevPath.x != pWays.L[0] && prevPath.y != pWays.L[1]) && (pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.L[0], pWays.L[1]))
					
			}else if(travis.y == maxColIndexes){
				if( (prevPath.x != pWays.U[0] && prevPath.y != pWays.U[1]) && (pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.U[0], pWays.U[1]))
					
				if( (prevPath.x != pWays.L[0] && prevPath.y != pWays.L[1]) && (pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.L[0], pWays.L[1]))
					
				
			}else if(travis.y == 0){
				if( (prevPath.x != pWays.U[0] && prevPath.y != pWays.U[1]) && (pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.U[0]][pWays.U[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.U[0], pWays.U[1]))
					
				if( (prevPath.x != pWays.R[0] && prevPath.y != pWays.R[1]) && (pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.R[0], pWays.R[1]))
				
			}
		}else if(travis.x == 0){
			if (travis.y > 0 && travis.y < maxColIndexes){
					
				if( (prevPath.x != pWays.D[0] && prevPath.y != pWays.D[1]) && (pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.D[0], pWays.D[1]))
					
				if( (prevPath.x != pWays.R[0] && prevPath.y != pWays.R[1]) && (pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.R[0], pWays.R[1]))
					
				if( (prevPath.x != pWays.L[0] && prevPath.y != pWays.L[1]) && (pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.L[0], pWays.L[1]))
					
			}else if(travis.y == maxColIndexes){
					
				if( (prevPath.x != pWays.D[0] && prevPath.y != pWays.D[1]) && (pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.D[0], pWays.D[1]))
					
				if( (prevPath.x != pWays.L[0] && prevPath.y != pWays.L[1]) && (pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.L[0]][pWays.L[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.L[0], pWays.L[1]))
					
				
			}else if(travis.y == 0){
					
				if( (prevPath.x != pWays.D[0] && prevPath.y != pWays.D[1]) && (pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.D[0]][pWays.D[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.D[0], pWays.D[1]))
					
				if( (prevPath.x != pWays.R[0] && prevPath.y != pWays.R[1]) && (pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter)) || pathOrder.indexOf(heightMap[pWays.R[0]][pWays.R[1]]) == pathOrder.indexOf(travis.letter) + 1 ) paths.push(new Path(pWays.R[0], pWays.R[1]))
				
			}
		}
		
		return paths
	}
	
	function main(){

		var travis = new Travis(startPos[0], startPos[1], 'S')
		var persistIntersections = []
		var prevPath = new Path(-1, -1)
		
		while(travis.letter !== 'E'){
			
			var paths = getPossiblePaths(travis, prevPath)
			var intersection = (paths.length > 1)? new Intersection(travis.x, travis.y, paths) :(paths.length == 1)? paths[0] : 0 
			
			// contine computation here, generate proper class methods
			// check if intersection.possiblePaths is empty:
			// 		if it has only 1 path chose it and neglect intersection
			//		if it is empty go to last intersection in persistIntersections and chose next path, 
			//			neglect empty intersection
			//			check chosen intersection (if its empty or with only one way)
			//				if yes remove it from persistIntersections
			//		after getting new path:
			//			update prevPath
		}
	}
	
	return {main}
	
}())

console.log(dayTwelve.main())