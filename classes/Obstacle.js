import { Player } from "./Player.js"

class Obstacle {
    constructor(map, nrObstacles){
        this.map = map
        this.obstacleList = this.createObstacles(nrObstacles)
    }

    createObstacles(nrObstacles){
        let obstacles = []
        for(let i = 0; i < nrObstacles; i++){
            obstacles[i] = this.createObstacle(40, 40)
        }

        return obstacles
    }

    createObstacle = (width, heigh) => {
        let obstacle = document.createElement('img')
        obstacle.setAttribute('src','https://image.flaticon.com/icons/svg/1583/1583574.svg')

        const mapWidth = this.map.getBoundingClientRect().width;
        const mapHeight = this.map.getBoundingClientRect().height;

        this.top = Math.floor(Math.random() * (mapHeight-40));
        this.left = Math.floor(Math.random() * (mapWidth-40));

        let { style } = obstacle;

        style.width = `${width}px`
        style.height = `${heigh}px`
        style.position = "absolute";
        style.top = `${this.top}px`
        style.left = `${this.left}px`

        return obstacle
    }
}

export { Obstacle }









































