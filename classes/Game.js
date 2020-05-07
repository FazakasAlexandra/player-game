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
    this.player.move()
    //this.decreaseLife()
    //this.showScore()
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

/*     gameOver() {

        if
    }
 */
    showScore = () => {
        let score = document.createElement('p')
        score.innerText = 'Gold: ' + `${this.score}`
        score.setAttribute('id','score')
        this.gameInfo.appendChild(score)
    }

    /* decreaseLife = () => {
        let playerTop = this.player.body.face.style.top
        let playerLeft = this.player.body.face.style.left
        //console.log(playerTop)
        //console.log(playerLeft)

        let { obstacles } = this.obstacles
        const obstaclesTop = obstacles.map( obstacle => obstacle.style.top)
        const obstaclesLeft = obstacles.map( obstacle => obstacle.style.left)

        //console.log(obstaclesTop)
        //console.log(obstaclesLeft)

        //const isIntersection = compareTopLeft(playerTop, playerLeft, obstaclesTop, obstaclesLeft)

        //if(isIntersection){
            // decrese life
        //}
    }

    compareTopLeft = (playerTop, playerLeft, elementsTop, elementsLeft, chest) => {
        // compare the difference between playerTop and each elementTop -> loop through elementTop array
        // store the difference number in an array
        // check if in that array there is one number that < chest.style.width
        // return true if number exists, return false if no 
        // apply same logic for secound playerLeft and elementLeft
        // isIntersected = isTopIntersected() && isLeftIntersected
        // return isIntersected
    
        const diffTop = Math.abs(playerTop - elementTop)
        const diffLeft =  Math.abs(playerLeft - elementLeft)
        const isIntersection = diffTop < chest.style.width && diffLeft < chest.style.width
        
        return isIntersection
    } */



}

export { Game }