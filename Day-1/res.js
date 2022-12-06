/**
* Parte 1
*
*/
function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

var x = document.getElementsByTagName("pre")[0].textContent

var xArray = x.split("\n")
var xResult = []
var sum = 0

for (let index = 0; index < xArray.length; index++) {
    if(xArray[index] != "") sum += parseInt(xArray[index])
    else{
        xResult.push(sum)
        sum = 0
    }
}

console.log("Max: "+getMaxOfArray(xResult))

/**
* Parte 2
*
*/
var maxThree = []
var i = 0

while (i < 3) {

    var max = getMaxOfArray(xResult)
    maxThree.push(max)
    xResult = xResult.filter(num => num != max)
   
    i++
}

console.log("3 Max: "+maxThree)
