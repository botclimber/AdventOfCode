// day 9 - part 1

const data = document.getElementsByTagName("pre")[0].textContent
const movesTodo = data.split("\n").filter(rmEmpty => rmEmpty != "" )

var dayNine = (function(){

  "use strict";

  var fieldSize = {
    x: 6000,
    y: 6000
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
    currentPosition: {
      hx: fieldSize.x/2,
      hy: fieldSize.y/2,

      tx: fieldSize.x/2,
      ty: fieldSize.y/2,
    },

    L: function(steps){
      do{
        this.currentPosition.hy -= 1
        var adj = checkPosition(this.currentPosition.hx, this.currentPosition.hy, this.currentPosition.tx, this.currentPosition.ty)

        if(!adj){
          this.currentPosition.tx = this.currentPosition.hx
          this.currentPosition.ty -= 1
        }

        field[this.currentPosition.tx][this.currentPosition.ty] = '#'

        console.log([this.currentPosition.hx, this.currentPosition.hy], this.currentPosition.tx, this.currentPosition.ty, field[this.currentPosition.tx][this.currentPosition.ty] , adj, steps, 'L')

        steps--
      }while(steps > 0)
    },
    R: function(steps){
      do{
        this.currentPosition.hy += 1
        var adj = checkPosition(this.currentPosition.hx, this.currentPosition.hy, this.currentPosition.tx, this.currentPosition.ty)

        if(!adj){
          this.currentPosition.tx = this.currentPosition.hx
          this.currentPosition.ty += 1
        }

        field[this.currentPosition.tx][this.currentPosition.ty] = '#'

        console.log([this.currentPosition.hx, this.currentPosition.hy], this.currentPosition.tx, this.currentPosition.ty, field[this.currentPosition.tx][this.currentPosition.ty] , adj, steps, 'R')
        steps--
      }while(steps > 0)
},
    D: function(steps){
      do{
        this.currentPosition.hx += 1
        var adj = checkPosition(this.currentPosition.hx, this.currentPosition.hy, this.currentPosition.tx, this.currentPosition.ty)

        if(!adj){
          this.currentPosition.tx += 1
          this.currentPosition.ty = this.currentPosition.hy
        }

        field[this.currentPosition.tx][this.currentPosition.ty] = '#'

        console.log([this.currentPosition.hx, this.currentPosition.hy], this.currentPosition.tx, this.currentPosition.ty, field[this.currentPosition.tx][this.currentPosition.ty] , adj, steps, 'D')
        steps--
      }while(steps > 0)

},
    U: function(steps){
      do{
        this.currentPosition.hx -= 1
        var adj = checkPosition(this.currentPosition.hx, this.currentPosition.hy, this.currentPosition.tx, this.currentPosition.ty)

        if(!adj){
          this.currentPosition.tx -= 1
          this.currentPosition.ty = this.currentPosition.hy
        }

        field[this.currentPosition.tx][this.currentPosition.ty] = '#'

        console.log([this.currentPosition.hx, this.currentPosition.hy], this.currentPosition.tx, this.currentPosition.ty, field[this.currentPosition.tx][this.currentPosition.ty] , adj, steps, 'U')

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

    return count
  }

  return {getVisPos}

}())

console.log(dayNine.getVisPos())
