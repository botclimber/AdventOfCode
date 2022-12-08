var data = document.getElementsByTagName("pre")[0].textContent
var parOfSections = data.split("\n")


// ------------- first half
function sections(sec1, sec2){

    var sec1 = sec1.split("-")
    var sec2 = sec2.split("-")

    var secOneZero = parseInt(sec1[0])
    var secOneOne = parseInt(sec1[1])
    var secTwoZero = parseInt(sec2[0])
    var secTwoOne = parseInt(sec2[1])


    console.log(secOneZero + secOneOne)
    if(secOneZero <= secTwoZero && secOneOne >= secTwoOne || secOneZero >= secTwoZero && secOneOne <= secTwoOne) {

        console.log(sec1[0], sec1[1], sec2[0], sec2[1])
        return 1
    }
    else return 0

}


// ------------- second half
function sections2(sec1, sec2){

    var sec1 = sec1.split("-")
    var sec2 = sec2.split("-")

    var secOneZero = parseInt(sec1[0])
    var secOneOne = parseInt(sec1[1])
    var secTwoZero = parseInt(sec2[0])
    var secTwoOne = parseInt(sec2[1])


    console.log(secOneZero + secOneOne)
    if(secOneZero > secTwoOne || secOneOne < secTwoZero) { 

        console.log(sec1[0], sec1[1], sec2[0], sec2[1])
        return 0
    }   
    else return 1

}

var sum = 0
var sum2 = 0

for (let index = 0; index < parOfSections.length -1; index++) {

    var splitedSections = parOfSections[index].split(",")
    console.log(splitedSections)
    
	sum += sections(splitedSections[0], splitedSections[1])
	sum2 += sections2(splitedSections[0], splitedSections[1])

    console.log("SUM: "+sum+" | SUM2: "+sum2)
    
}

console.log(sum)
console.log(sum2)

