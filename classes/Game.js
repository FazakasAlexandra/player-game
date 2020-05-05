class Game {
    constructor(map, gameInfo){
    this.map = map
    this.gameInfo = gameInfo
    this.player = new Player('#0ea7ed', container);
    this.obstacles = new Obstacle(map, 2)
    this.golds = new Gold(map, 2)
    this.player.move()
    this.decreaseLife()
    this.score = 0
    this.showScore()
    }
    showScore = () => {
        let score = document.createElement('p')
        score.innerText = 'Gold: ' + `${this.score}`
        score.setAttribute('id','score')
        this.gameInfo.appendChild(score)
    }
    decreaseLife = () => {
        let playerTop = this.player.body.chest.style.top
        let playerLeft = this.player.body.chest.style.top
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