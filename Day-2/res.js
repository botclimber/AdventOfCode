/**
DAY 2 advent of code challenge

Approach:
	- ...

@author botclimber
@date	2022-12-06

*/

const data = document.getElementsByTagName("pre")[0].textContent

var dayTwo = (function(){
        const x = data.split("\n")
	
	// combinations for first half exercise
	const combinationsFH = {
		"A X": 4,
		"A Y": 8,
		"A Z": 3,

		"B X": 1,
		"B Y": 5,
		"B Z": 9,

		"C X": 7,
		"C Y": 2,
		"C Z": 6 
	}


	// combinations for the second half of the exercise
	const combinationsSH = {
		"A X": 3,
		"A Y": 4,
		"A Z": 8,

		"B X": 1,
		"B Y": 5,
		"B Z": 9,

		"C X": 2,
		"C Y": 6,
		"C Z": 7 
	}


        function getSolution(comb){

                var sum = 0
                for (let i = 0; i < (x.length)-1; i++){
                        sum += comb[x[i]]
             	}

                return sum
        }


        return { 
	combinationsFH,
	combinationsSH,
	getSolution }

}());

console.log(dayTwo.getSolution(dayTwo.combinationsFH))
console.log(dayTwo.getSolution(dayTwo.combinationsSH))



