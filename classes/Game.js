import { Gold } from "./Gold.js"
import { Obstacle } from "./Obstacle.js"
import { Player } from "./Player.js"

class Game {
    constructor(map, gameInfo){
    this.map = map
    this.gameInfo = gameInfo
    this.player = new Player(map);
    this.obstacles = new Obstacle(map, 5)
    this.renderObstacles()
    this.golds = new Gold(map, 2)
    //this.renderGolds()
    this.player.move()
    this.decreaseLife()
    this.score = 0
    this.showScore()
    }

    renderObstacles(){
        let { obstacles : { obstacleList }} = this
       
        obstacleList.forEach(obstacle => {
            let obstacleTop = parseInt(obstacle.style.top)
            let obstacleLeft = parseInt(obstacle.style.left)

            if(obstacleTop >= 100 && obstacleLeft >= 40){ 
                this.map.appendChild(obstacle)
            } else {
                let obstaclePosition = this.newPosition ()
                let newLeft = `${obstaclePosition.left}px`
                let newTop = `${obstaclePosition.top}px`

                obstacle.style.left = newLeft
                obstacle.style.top = newTop

                this.map.appendChild(obstacle)
            }
        });
    }

  /*   renderGolds(){
        let { obstacles : { obstacleList }} = this
       
        obstacleList.forEach(obstacle => {
            let obstacleTop = parseInt(obstacle.style.top)
            let obstacleLeft = parseInt(obstacle.style.left)

            if(obstacleTop >= 100 && obstacleLeft >= 40){ 
                this.map.appendChild(obstacle)
            } else {
                let obstaclePosition = this.newPosition ()
                let newLeft = `${obstaclePosition.left}px`
                let newTop = `${obstaclePosition.top}px`

                obstacle.style.left = newLeft
                obstacle.style.top = newTop

                this.map.appendChild(obstacle)
            }
        });
    } */

    newPosition () {
        let top = Math.floor(Math.random() * (360 - 120) + 100);
        let left = Math.floor(Math.random() * (460 - 50) + 40);

        return { top, left }
    }

    showScore = () => {
        let score = document.createElement('p')
        score.innerText = 'Gold: ' + `${this.score}`
        score.setAttribute('id','score')
        this.gameInfo.appendChild(score)
    }

    decreaseLife = () => {
        let playerTop = this.player.body.face.style.top
        let playerLeft = this.player.body.face.style.top
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
    }



}

export { Game }