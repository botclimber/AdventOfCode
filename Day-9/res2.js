// day 9 - part 2
// find way of solving overlap motion

const data = document.getElementsByTagName("pre")[0].textContent
//const movesTodo = data.split("\n").filter(rmEmpty => rmEmpty != "" )
const movesTodo = [
  //"L 1","D 4", "U 3", "U 2"
  "D 6",
]

var dayNine = (function(){

  "use strict";

  var fieldSize = {
    x: 20,
    y: 20
  }

  var field = createField(fieldSize.x, fieldSize.y)
  function createField(rows, cols){
    var x = []

    for (let i = 0 ; i < rows; i++){
      var arr = []
        for(let x = 0; x < cols; x++){
          arr.push('*')
        }
      x.push(arr)
    }

    x[rows/2][cols/2] = "s"

    return x
  }

  const moves = {

    currentPosition: [
      [fieldSize.x/2, fieldSize.y/2],
      [fieldSize.x/2, fieldSize.y/2],
      [fieldSize.x/2, fieldSize.y/2],
      [fieldSize.x/2, fieldSize.y/2],
      [fieldSize.x/2, fieldSize.y/2],
      [fieldSize.x/2, fieldSize.y/2],
      [fieldSize.x/2, fieldSize.y/2],
      [fieldSize.x/2, fieldSize.y/2],
      [fieldSize.x/2, fieldSize.y/2],
      [fieldSize.x/2, fieldSize.y/2],
    ],

    L: function(steps){
      do{

          this.currentPosition[0][1] -= 1
          field[this.currentPosition[0][0]][this.currentPosition[0][1]] = 'H'

          var adj = checkPosition(this.currentPosition[0][0], this.currentPosition[0][1], this.currentPosition[1][0], this.currentPosition[1][1])

          if(!adj){
            for(let index = 1; index < this.currentPosition.length - 1; index ++){
              this.currentPosition[index][0] = this.currentPosition[index-1][0]
              this.currentPosition[index][1] -= 1

              field[this.currentPosition[index][0]][this.currentPosition[index][1]] = index
              if(checkPosition(this.currentPosition[index][0], this.currentPosition[index][1], this.currentPosition[index+1][0], this.currentPosition[index+1][1])) break
            }
          }

        steps--
      }while(steps > 0)
    },
    R: function(steps){
      do{

        this.currentPosition[0][1] += 1
        field[this.currentPosition[0][0]][this.currentPosition[0][1]] = 'H'

        var adj = checkPosition(this.currentPosition[0][0], this.currentPosition[0][1], this.currentPosition[1][0], this.currentPosition[1][1])

        if(!adj){
          for(let index = 1; index < this.currentPosition.length - 1; index ++){
            this.currentPosition[index][0] = this.currentPosition[index-1][0]
            this.currentPosition[index][1] += 1

            field[this.currentPosition[index][0]][this.currentPosition[index][1]] = index
            if(checkPosition(this.currentPosition[index][0], this.currentPosition[index][1], this.currentPosition[index+1][0], this.currentPosition[index+1][1])) break
          }
        }

        steps--
      }while(steps > 0)
    },
    D: function(steps){
      do{

        this.currentPosition[0][0] += 1
        field[this.currentPosition[0][0]][this.currentPosition[0][1]] = 'H'

        var adj = checkPosition(this.currentPosition[0][0], this.currentPosition[0][1], this.currentPosition[1][0], this.currentPosition[1][1])

        if(!adj){
          for(let index = 1; index < this.currentPosition.length - 1; index ++){
            this.currentPosition[index][0] += 1
            this.currentPosition[index][1] = this.currentPosition[index-1][1]

            field[this.currentPosition[index][0]][this.currentPosition[index][1]] = index
            if(checkPosition(this.currentPosition[index][0], this.currentPosition[index][1], this.currentPosition[index+1][0], this.currentPosition[index+1][1])) break
          }
        }

        steps--
      }while(steps > 0)
    },
    U: function(steps){
      do{

        this.currentPosition[0][0] -= 1
        field[this.currentPosition[0][0]][this.currentPosition[0][1]] = 'H'

        var adj = checkPosition(this.currentPosition[0][0], this.currentPosition[0][1], this.currentPosition[1][0], this.currentPosition[1][1])

        if(!adj){
          for(let index = 1; index < this.currentPosition.length - 1; index ++){
            this.currentPosition[index][0] -= 1
            this.currentPosition[index][1] = this.currentPosition[index-1][1]

            field[this.currentPosition[index][0]][this.currentPosition[index][1]] = index
            if(checkPosition(this.currentPosition[index][0], this.currentPosition[index][1], this.currentPosition[index+1][0], this.currentPosition[index+1][1])) break
          }
        }

        steps--
      }while(steps > 0)
    },
  }

  function checkPosition(hx, hy, tx, ty){
    const possPos = {
      northWest: [hx-1, hy-1],
      northEast: [hx-1, hy+1],
      north: [hx-1, hy],
      south: [hx+1, hy],
      west: [hx, hy-1],
      east: [hx, hy+1],
      southWest: [hx+1, hy-1],
      southEast: [hx+1, hy+1]
    }

    for(let pos in possPos){ if(possPos[pos][0] == tx && possPos[pos][1] == ty ) return true }
    return (hx == tx && hy == ty)? true : false

  }

  function runMoves(){
    for (let x of movesTodo){

        var dirSteps = x.split(" ")
        moves[dirSteps[0]](dirSteps[1])
    }
  }

  function getVisPos() {
    runMoves()

    var count = 0

    for(let x of field)
      for(let z of x){
        count += (z == "#")? 1 : 0
      }

      console.log(field)
    //return count
    return 1
  }

  return {getVisPos}

}())

console.log(dayNine.getVisPos())
