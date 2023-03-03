const dataTest = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

const data = `Sensor at x=3999724, y=2000469: closest beacon is at x=4281123, y=2282046
Sensor at x=3995530, y=8733: closest beacon is at x=3321979, y=-692911
Sensor at x=3016889, y=2550239: closest beacon is at x=2408038, y=2645605
Sensor at x=3443945, y=3604888: closest beacon is at x=3610223, y=3768674
Sensor at x=168575, y=491461: closest beacon is at x=1053731, y=-142061
Sensor at x=2820722, y=3865596: closest beacon is at x=3191440, y=3801895
Sensor at x=2329102, y=2456329: closest beacon is at x=2408038, y=2645605
Sensor at x=3889469, y=3781572: closest beacon is at x=3610223, y=3768674
Sensor at x=3256726, y=3882107: closest beacon is at x=3191440, y=3801895
Sensor at x=3729564, y=3214899: closest beacon is at x=3610223, y=3768674
Sensor at x=206718, y=2732608: closest beacon is at x=-152842, y=3117903
Sensor at x=2178192, y=2132103: closest beacon is at x=2175035, y=2000000
Sensor at x=1884402, y=214904: closest beacon is at x=1053731, y=-142061
Sensor at x=3060435, y=980430: closest beacon is at x=2175035, y=2000000
Sensor at x=3998355, y=3965954: closest beacon is at x=3610223, y=3768674
Sensor at x=3704399, y=3973731: closest beacon is at x=3610223, y=3768674
Sensor at x=1421672, y=3446889: closest beacon is at x=2408038, y=2645605
Sensor at x=3415633, y=3916020: closest beacon is at x=3191440, y=3801895
Sensor at x=2408019, y=2263990: closest beacon is at x=2408038, y=2645605
Sensor at x=3735247, y=2533767: closest beacon is at x=4281123, y=2282046
Sensor at x=1756494, y=1928662: closest beacon is at x=2175035, y=2000000
Sensor at x=780161, y=1907142: closest beacon is at x=2175035, y=2000000
Sensor at x=3036853, y=3294727: closest beacon is at x=3191440, y=3801895
Sensor at x=53246, y=3908582: closest beacon is at x=-152842, y=3117903
Sensor at x=2110517, y=2243287: closest beacon is at x=2175035, y=2000000
Sensor at x=3149491, y=3998374: closest beacon is at x=3191440, y=3801895`;

const re = new RegExp("([x,y]=[-]?[0-9]+[, ]*){2}");

class Sensor{
	constructor(x, y, beacon){
		this.sx = x
		this.sy = y
		this.closestBeacon = beacon
		this.spreadDistance = this.spread()
	}
	
	spread(){
		//console.log(this.sx, this.sy, this.closestBeacon.bx, this.closestBeacon.by)
		const distance = Math.abs(this.sx - this.closestBeacon.bx) + Math.abs(this.sy - this.closestBeacon.by)
		//console.log(distance)
		return distance
	}
	
	checkY(targetY){
		const max = this.sy + this.spreadDistance
		const min = this.sy - this.spreadDistance
		
		return (min < targetY && max > targetY)
		
	}
	
	calcRowOccupation(targetY){
		
		//const res = Math.abs(Math.abs(this.sy - targetY) - this.spreadDistance)
		//return (this.spreadDistance - res) * 2
		
		const res = (this.spreadDistance * 2 ) - Math.abs(this.sy - targetY) * 2
		return res
	}
	
}

class Beacon{
	constructor(x, y){
		this.bx = x
		this.by = y
	}
}

const Y = 2000000

const sensors = data.split('\n').map(r => {
	const sensorCoords = r.split(':')
	
	const sensorX = re.exec(sensorCoords[0])
	const x = sensorX[0].split(',')[0].split('=')[1]
	
	const sensorY = re.exec(sensorCoords[0])
	const y = sensorY[0].split(',')[1].split('=')[1]
	
	const beaconX = re.exec(sensorCoords[1])
	const bx = beaconX[0].split(',')[0].split('=')[1]
	
	const beaconY = re.exec(sensorCoords[1])
	const by = beaconY[0].split(',')[1].split('=')[1]
	
	const beacon = new Beacon(parseInt(bx), parseInt(by))
	
	const instanceOfSensor = new Sensor(parseInt(x), parseInt(y), beacon)

	return (instanceOfSensor.checkY(Y))? instanceOfSensor : ""

}).filter(row => row != "")

const targetYOcc = new Map()
const resres = sensors.map(sensor => {
	const rowOcc = sensor.calcRowOccupation(Y)
	const minX = sensor.sx - rowOcc / 2
	const maxX = sensor.sx + rowOcc / 2
	
	targetYOcc.set(sensor, {xmin: minX, xmax: maxX})
	return rowOcc
})

var fResult = []
for (s of sensors){
	var sToCompare = targetYOcc.get(s)
	
	var xMinFound = sToCompare.xmin
	var xMaxFound = sToCompare.xmax
	
	for(s2 of  sensors){
		if(s2 !== s){
			//console.log(s, s2)
			
			var sToCompareWith = targetYOcc.get(s2)
			
			if( (xMinFound < sToCompareWith.xmax) && (xMinFound > sToCompareWith.xmin) ) xMinFound = sToCompareWith.xmin;
			else if( (xMaxFound > sToCompareWith.xmin) && (xMaxFound < sToCompareWith.xmax) ) xMaxFound = sToCompareWith.xmax ;
			
			//console.log(xMinFound, xMaxFound)
			//console.log(sToCompare, sToCompareWith)
		}
	}
	
	console.log(xMinFound, xMaxFound)
	fResult.push({from: xMinFound, to: xMaxFound, distance: xMaxFound - xMinFound})

}

// calcular x min e max dentro do target y para cada sensor e verificar intersecoes
// contar beacons com y = targetY
// retirar resultado final

console.log(sensors)
console.log(resres)
console.log(targetYOcc)
console.log(typeof(fResult))
console.log(fResult)

// main dev
/*

{from: 2175035, to: 4562231, distance: 2387196}
{from: -614713, to: 2175035, distance: 2789748}

answer: 2387196 + 2789748 = 5176944

*/

