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
	function getData(){
		var j = []
		for (let i = 0; i < data.length -1 ; i++) j.push([...data[i]])
		
		return j
	}
	
	const heightMap =getData()

		
	
	// computation goes here
	
	
	// ---------
	
	return {heightMap}
	
}())

console.log(dayTwelve.heightMap)