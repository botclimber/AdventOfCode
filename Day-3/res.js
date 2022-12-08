/**

notes:
	- each letter (lower or upper) is a item
	- each rucksack has 2 compartments
	- each compartment is the rucksack total items / 2
	- find items that appear in both compartments
	- calcule priority:
		- [a - z] -> [1 - 26]
		- [A - Z] -> [27 - 52]

	- find the items that appear in both compartments foreach given rucksack, and sum all related prior numbers

@author botclimber
@Date	2022-12-08

*/

var dayThree = (function(){

        "use strict";
        const data = document.getElementsByTagName("pre")[0].textContent
    
        const rucksacks = data.split("\n")          

        const nrOfComps = 2 
        const itemValues = { 
                "none":0, "a":1, "b":2, "c":3, "d":4, "e":5, "f":6, "g":7, "h":8, "i":9, "j":10, "k":11, "l":12, "m":13, "n":14, "o":15, "p":16, "q":17, "r":18, "s":19, "t":20, "u":21, "v":22, "w":23, "x":24, "y":25, "z":26,
                "A":27, "B":28, "C":29, "D":30, "E":31, "F":32, "G":33, "H":34, "I":35, "J":36, "K":37, "L":38, "M":39, "N":40, "O":41, "P":42, "Q":43, "R":44, "S":45, "T":46, "U":47, "V":48, "W":49, "X":50, "Y":51, "Z":52
                }   

        let RuckSack = class {
                constructor(ruckSack){

                        this.ruckSack = ruckSack
                        this.comps= this.getCompartments()
                }   

                getCompartments(){
                        var half = this.ruckSack.length / nrOfComps
                        return [this.ruckSack.slice(0, half), this.ruckSack.slice(half)]
                }
                    
                getDuplicatedItem(){

                    var res = "none"
                        for (let x = 0; x < this.comps[0].length; x++){
                                
                            var letter = this.comps[0][x]
                                if(this.comps[1].includes(letter)){ 
                                    
                                    res = letter
                                    break
                                }
                        }

                    return res
                }   

                get itemValue(){
                    var duplValue = this.getDuplicatedItem()
                    var itemPrioValue = itemValues[duplValue]
                    console.log("\n"+duplValue+" = "+itemPrioValue)
                    return itemPrioValue
        
                }


        }   


        function getResult(){
                var sum = 0 

                for (let i = 0; i < rucksacks.length; i++){
                        var r = new RuckSack(rucksacks[i])
                        sum += r.itemValue
                }   

                return sum    
        }   


	function scdHalf(){

                var sum = 0
                for (let ruc = 0 ; ruc < (rucksacks.length)-1; ruc += 3){
                    console.log(rucksacks[ruc], rucksacks[ruc+1], rucksacks[ruc+2])
                        for (let oneRuc = 0; oneRuc < rucksacks[ruc].length; oneRuc++){

                                var letter = rucksacks[ruc][oneRuc]
                                var res = 0
                                if(rucksacks[ruc+1].includes(letter) && rucksacks[ruc+2].includes(letter)){

                                    res = itemValues[letter]
                                    break
                                }
                        }

                console.log(sum, letter, res)
                sum += res
                }

                return sum
        }	

        return { getResult, scdHalf }

}());


console.log(dayThree.getResult());
console.log(dayThree.scdHalf());

