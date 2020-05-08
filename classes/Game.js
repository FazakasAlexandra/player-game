import { Gold } from "./Gold.js"
import { Obstacle } from "./Obstacle.js"
import { Player } from "./Player.js"

class Game {
    constructor(map, gameInfo){
    this.map = map
    this.mapWidth = this.map.getBoundingClientRect().width
    this.mapHeight = this.map.getBoundingClientRect().height
    this.gameInfo = gameInfo
    this.player = new Player(map)
    this.obstacles = new Obstacle(map, 5)
    this.golds = new Gold(map, 2)
    this.score = 0

    this.renderObstacles()
    this.renderGolds()
    this.checkIntersection()
    this.player.move()
    this.showScore()
    }

    renderObstacles(){
        let { obstacles : { obstacleList }} = this
       
        obstacleList.forEach(obstacle => {
            let obstaclePosition = this.createPosition ()
            obstacle.style.top = `${obstaclePosition.top}px`
            obstacle.style.left = `${obstaclePosition.left}px`

            this.map.appendChild(obstacle)
        });
    }

    renderGolds(){
        //more destrucure
        let { golds : {goldList} } = this

        goldList.forEach(gold => {
            let goldPosition = this.createPosition ()
            gold.innerCircle.style.top = `${goldPosition.top}px`
            gold.innerCircle.style.left = `${goldPosition.left}px`
            gold.outerCircle.style.top = `${goldPosition.top}px`
            gold.outerCircle.style.left = `${goldPosition.left}px`
            this.map.appendChild(gold.outerCircle)
            this.map.appendChild(gold.innerCircle)
        })
    } 

    createPosition () {
        // obstacle position !== player position
        let top = Math.floor(Math.random() * (this.mapHeight - 40 - 120) + 120);
        let left = Math.floor(Math.random() * (this.mapWidth - 40 - 50) + 50);

        return { top, left }
    }

    checkIntersection() {
        // decrease life and make the player stop
        let { obstacles: { obstacleList } } = this
        console.log(obstacleList)
        let { body: { face } } = this.player
        console.log(face)

        let obstaclesDiff = this.getPositionDiff(obstacleList, face)
        console.log(obstaclesDiff)
        let sameTop = false
        let sameLeft = false
        let isIntersected = sameTop && sameLeft

        console.log(sameTop, sameLeft, isIntersected)

        document.addEventListener('keyup', (event) =>{
            console.log(face.style.top)
            console.log(face.style.left)

            obstaclesDiff.y.diffTop.map(function (nr) {
                sameTop = nr < face.style.height
                console.log(sameTop)
            })
    
            obstaclesDiff.x.diffLeft.map(function (nr) {
                sameLeft = nr < face.style.width
                console.log(sameLeft)
            })
    
            if (isIntersected) {
                ('inside if intersection')
                this.decreaseLife()
                //stopMove()
            } 
        })
    }

    getPositionDiff(array, face) {
        let diffTop = array.map( function ( element ){
            let {style : { top }} = element
            return Math.abs(parseInt(top) - parseInt(face.style.top))
        })

        let diffLeft = array.map( function ( element ){
            let {style: { left }} = element
            return Math.abs(parseInt(left) - parseInt(face.style.left))
        })
    
        return { y: {diffTop}, x:{diffLeft} }
    }

    decreaseLife(){
        console.log('inside decrease life function')

        //let { body : { highLife }} = this.player
        //console.log(highLife)
        //highLife.innerText 
    }

    stopMove() {

    }
    
 
    showScore = () => {
        let score = document.createElement('p')
        score.innerText = 'Gold: ' + `${this.score}`
        score.setAttribute('id','score')
        this.gameInfo.appendChild(score)
    }

}

export { Game }