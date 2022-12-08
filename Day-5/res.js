// day 5 - part 1

const data = document.getElementsByTagName("pre")[0].textContent

var stacks = { 
        '1': ['Q','M','G','C','L'],
        '2': ['R', 'D', 'L', 'C', 'T', 'F', 'H', 'G'],
        '3': ['V', 'J', 'F', 'N', 'M', 'T', 'W', 'R'],
        '4': ['J', 'F', 'D', 'V', 'Q', 'P'],
        '5': ['N', 'F', 'M', 'S', 'L', 'B', 'T'],
        '6': ['R', 'N', 'V', 'H', 'C', 'D', 'P'],
        '7': ['H', 'C', 'T'],
        '8': ['G', 'S', 'J', 'V', 'Z', 'N', 'H', 'P'],
        '9': ['Z', 'F', 'H', 'G']
        }   

var dayFive = (function(){     
        const moves = data.split("\n").slice(10)

        function move(qt, from, to){
            console.log(qt, from, to, "\n")

                var toMove = stacks[from].slice((stacks[from].length - qt))
                console.log(stacks[from]+"\n")
            
                for(let i = toMove.length -1; i >= 0; i--){
                        stacks[from].pop()
                        stacks[to].push(toMove[i])
                }
                console.log("from "+from+": "+stacks[from]+" | to "+to+": "+stacks[to])
        }   

        function getLastCrates(){
   		var lastCrates = ""

		for(key in stacks){lastCrates += stacks[key][stacks[key].length -1]}
 
		return lastCrates
        }   

        function getFHResult(){
    
                for (let i = 0; i < moves.length -1; i++){
                        var spMoves = moves[i].split(" ")
                        move(spMoves[1], spMoves[3], spMoves[5])    
                }   
    
                return getLastCrates() //string
        }   
    

        return  {getFHResult}

}());


console.log(dayFive.getFHResult())
