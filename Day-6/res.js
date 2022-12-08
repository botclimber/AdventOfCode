// day 6 - part 2

const data = document.getElementsByTagName("pre")[0].textContent

var daySix = (function(nrOfDistinct){

  function getResult(){
    var marker = 0

    for(let i = 0; i < data.length; i++){
        var counter = 0

        var groupOfChar = data.substring(i, i+nrOfDistinct)

        for (let y = 0; y < groupOfChar.length -1; y++){

            if (!groupOfChar.substring(y+1).includes(groupOfChar[y])) counter += 1
            else break
        }

        if(counter == nrOfDistinct - 1){
            marker = i+1+(nrOfDistinct - 1)
            break
        }
    }

    return marker
  }

  return { getResult }
})

console.log(daySix(4).getResult()) // result for 1 part
console.log(daySix(14).getResult())// result for 2 part
