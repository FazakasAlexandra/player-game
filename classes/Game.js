import { Gold } from "./Gold.js"
import { Obstacle } from "./Obstacle.js"
import { Player } from "./Player.js"
import { FeedBack } from "./FeedBack.js"

class Game {
    constructor(map, gameInfo){
    this.map = map
    this.gameInfo = gameInfo
    this.mapWidth = this.map.getBoundingClientRect().width 
    this.mapHeight = this.map.getBoundingClientRect().height
    console.log(this.mapWidth)
    console.log(this.mapHeight)
    this.colectedGolds = 0
    console.log('game colected gold:' + this.colectedGolds)

    this.hitFeedBack = new FeedBack(map, '#fb5a14')
    this.player = new Player(map) 
    this.obstacles = new Obstacle(map, 3) 
    this.golds = new Gold(map, this.mapWidth, this.mapHeight, 4)

    this.isMapIntersection = false
    this.isObstacleIntersection = false
    this.isGoldIntersection = false
    }

    renderObstacles() {
        let { obstacles : { obstacleList }} = this
       
        obstacleList.forEach(obstacle => {
            let obstaclePosition = this.createPosition ()
            obstacle.style.top = `${obstaclePosition.top}px`
            obstacle.style.left = `${obstaclePosition.left}px`

            this.map.appendChild(obstacle)
        });
    }

    renderGolds(){
        let { golds : {goldList} } = this

        goldList.forEach((gold, i) => {
            let goldPosition = this.createPosition ()
            gold.innerCircle.style.top = `${goldPosition.top}px`
            gold.innerCircle.style.left = `${goldPosition.left}px`

            gold.outerCircle.style.top = `${goldPosition.top}px`
            gold.outerCircle.style.left = `${goldPosition.left}px`
            gold.outerCircle.setAttribute('id', `${i}`)

            this.map.appendChild(gold.outerCircle)
            this.map.appendChild(gold.innerCircle)
        })
    } 

    createPosition () {
        let top = Math.floor(Math.random() * (this.mapHeight - 40 - 120) + 120);
        let left = Math.floor(Math.random() * (this.mapWidth - 40 - 50) + 50);

        return { top, left }
    }

    goldIntersection (array, face) {
        let goldData = array.map(function (gold) {
            let { style: { top } } = gold.outerCircle
            let { style: { left } } = gold.outerCircle
            let { id } = gold.outerCircle

            let topDiff = Math.abs(parseInt(top) - parseInt(face.style.top))
            let leftDiff = Math.abs(parseInt(left) - parseInt(face.style.left))

            return {bool: topDiff < parseInt(face.style.height) && leftDiff < parseInt(face.style.width), id }
        })

        let isIntersection = false
        let goldId = null 
        for(let i = 0; i < goldData.length; i++){
            if(goldData[i].bool){
                isIntersection = goldData[i].bool
                goldId = goldData[i].id
                break
            }
        }

        return {isIntersection, goldId}
    }

    obstacleIntersection (array, face) {
        let boolList = array.map( function ( element ){
            let {style : { top }} = element
            let {style: { left }} = element

            let topDiff = Math.abs(parseInt(top) - parseInt(face.style.top))
            let leftDiff = Math.abs(parseInt(left) - parseInt(face.style.left))

            return topDiff < parseInt(face.style.height) && leftDiff < parseInt(face.style.width)
        })
        
        let isIntersection = this.checkObstacleIntersection(boolList)

        return isIntersection
    }

    checkObstacleIntersection (boolList){
        let isIntersection = false
        for (let i = 0; i < boolList.length; i++) {
            isIntersection = boolList[i] ? true : isIntersection
        }

        return isIntersection
    }

    mapIntersection() {
        let { body : { face } } = this.player
        let { top } = face.style
        let { left } = face.style

        let isMapintersection = false
        if ( parseInt(top) < 0 || parseInt(left) < 0){
            isMapintersection = true
        } else if ( parseInt(top) > this.mapHeight - 50 || parseInt(left) > this.mapWidth - 50){
            isMapintersection = true
        }

        return isMapintersection
    }



    move = () => {
        document.addEventListener('keyup', (event) =>{
            let { hitFeedBack } = this
            let { golds } = this
            let { golds : { goldList } } = this
            let { obstacles: { obstacleList } } = this
            let { body: { face } } = this.player
            let { body } = this.player
            let { isMapIntersection } = this.isMapIntersection
            let { isObstacleIntersection } = this.isObstacleIntersection
            let oldTop = parseInt (face.style.top);
            let oldLeft = parseInt (face.style.left);
            
                switch(event.keyCode){

                case 40 : //down
                isMapIntersection = this.mapIntersection()
                isObstacleIntersection = this.obstacleIntersection(obstacleList, face)
                this.goldData = this.goldIntersection(goldList, face)

                        if (isObstacleIntersection) {
                            face.style.top = `${oldTop - 20}px`
                            body.lowLife.style.top = `${oldTop - 30 - 20}px` // hightLife
                            body.highLife.style.top = `${oldTop - 30 - 20}px` // lowLife
                            this.player.decreaseLife(5)
                            hitFeedBack.renderFeedBack(face, '-5')
                            break;

                        } else if(isMapIntersection){
                            this.player.decreaseLife(101)
                            hitFeedBack.renderFeedBack(face, '- 100')
                            break

                        } else if (this.goldData.isIntersection){
                            golds.addGold(this.goldData.goldId, this.colectedGolds, face)
                            this.colectedGolds = this.colectedGolds + 1
                            break;

                        } else {
                            face.style.top = `${oldTop + 20}px`
                            body.lowLife.style.top = `${oldTop - 30 + 20}px`
                            body.highLife.style.top = `${oldTop - 30 + 20}px`
                            break;
                        }

                case 38: //up
                isMapIntersection = this.mapIntersection()
                isObstacleIntersection = this.obstacleIntersection(obstacleList, face)
                this.goldData = this.goldIntersection(goldList, face)

                        if (isObstacleIntersection) {
                            face.style.top = `${oldTop + 20}px`
                            body.lowLife.style.top = `${oldTop - 30 + 20}px`
                            body.highLife.style.top = `${oldTop - 30 + 20}px`
                            this.player.decreaseLife(5)
                            hitFeedBack.renderFeedBack(face, '-5')
                            break;

                        } else if(isMapIntersection){
                            this.player.decreaseLife(101)
                            hitFeedBack.renderFeedBack(face, '- 100')
                            break

                        } else if (this.goldData.isIntersection){
                            golds.addGold(this.goldData.goldId, this.colectedGolds, face)
                            this.colectedGolds = this.colectedGolds + 1
                            break;

                        } else {
                            face.style.top = `${oldTop - 20}px` // face
                            body.lowLife.style.top = `${oldTop - 30 - 20}px` // hightLife
                            body.highLife.style.top = `${oldTop - 30 - 20}px` // lowLife
                            break;
                        }

                case 39 : 
                isMapIntersection = this.mapIntersection()
                isObstacleIntersection = this.obstacleIntersection(obstacleList, face)
                this.goldData = this.goldIntersection(goldList, face)

                        if (isObstacleIntersection) {
                            face.style.left = `${oldLeft - 20}px`
                            body.lowLife.style.left = `${oldLeft - 20}px`
                            body.highLife.style.left = `${oldLeft - 20}px`
                            this.player.decreaseLife(5)
                            hitFeedBack.renderFeedBack(face, '-5')
                            break;

                        } else if(isMapIntersection){
                            this.player.decreaseLife(101)
                            hitFeedBack.renderFeedBack(face, '- 100')
                            break

                        }else if (this.goldData.isIntersection){
                            golds.addGold(this.goldData.goldId, this.colectedGolds, face)
                            this.colectedGolds = this.colectedGolds + 1
                            break;

                        } else {
                            face.style.left = `${oldLeft + 20}px`
                            body.lowLife.style.left = `${oldLeft + 20}px`
                            body.highLife.style.left = `${oldLeft + 20}px`
                            break;
                        }

                case 37 : 
                isMapIntersection = this.mapIntersection()
                isObstacleIntersection = this.obstacleIntersection(obstacleList, face)
                this.goldData = this.goldIntersection(goldList, face)

                        if (isObstacleIntersection) {
                            face.style.left = `${oldLeft + 20}px`
                            body.lowLife.style.left = `${oldLeft + 20}px`
                            body.highLife.style.left = `${oldLeft + 20}px`
                            this.player.decreaseLife(5)
                            hitFeedBack.renderFeedBack(face, '-5')
                            break;

                        } else if (isMapIntersection){
                            this.player.decreaseLife(101)
                            hitFeedBack.renderFeedBack(face, '- 100')
/*                             setTimeout(() => {
                                this.play() 
                            }, 400); */
                            break

                        }else if (this.goldData.isIntersection) {
                            golds.addGold(this.goldData.goldId, this.colectedGolds, face)
                            this.colectedGolds = this.colectedGolds + 1
                            break;

                        } else {
                            face.style.left = `${oldLeft - 20}px`
                            body.lowLife.style.left = `${oldLeft - 20}px`
                            body.highLife.style.left = `${oldLeft - 20}px`
                            break;
                        }
            }
        })
    }

        play() {
            this.renderObstacles()
            this.renderGolds()
            this.golds.renderGoldInfo(this.gameInfo, this.colectedGolds)
            this.move()
        }

}


export { Game }