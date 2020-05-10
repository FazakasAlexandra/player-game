class Obstacle {
    constructor(map, nrObstacles){
        this.map = map
        this.obstacleList = this.createObstacles(nrObstacles)
        console.log(this.obstacleList)
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

        let { style } = obstacle;

        style.width = `${width}px`
        style.height = `${heigh}px`
        style.position = "absolute";

        return obstacle
    }
}

export { Obstacle }









































