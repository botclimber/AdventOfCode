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


	function getResult(){}

	return { getResult }

}());


console.log(dayThree.getResult());


