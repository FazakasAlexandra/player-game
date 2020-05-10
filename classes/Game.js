import { Gold } from "./Gold.js"
import { Obstacle } from "./Obstacle.js"
import { Player } from "./Player.js"

class Game {
    constructor(map, gameInfo){
    this.map = map
    this.mapWidth = this.map.getBoundingClientRect().width 
    this.mapHeight = this.map.getBoundingClientRect().height
    console.log(this.mapWidth)
    console.log(this.mapHeight)
    
    this.player = new Player(map) 
    this.obstacles = new Obstacle(map, 3) 
    this.gameInfo = gameInfo
    this.golds = new Gold(map, 4)
    this.colectedGolds = 0

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
            console.log(i)
            let goldPosition = this.createPosition ()
            gold.innerCircle.style.top = `${goldPosition.top}px`
            gold.innerCircle.style.left = `${goldPosition.left}px`

            gold.outerCircle.style.top = `${goldPosition.top}px`
            gold.outerCircle.style.left = `${goldPosition.left}px`
            gold.outerCircle.setAttribute('id', `${i}`)
            console.log('id : ' + gold.outerCircle.id )

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
        console.log ({isIntersection, goldId })

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
        if( top < '0px' || left < '0px' || left > this.mapWidth - 100 || top > this.mapHeight){
            isMapintersection = true
        }

        console.log(isMapintersection)
        return isMapintersection
    }



    move = () => {
        document.addEventListener('keyup', (event) =>{
            let { obstacles: { obstacleList } } = this
            let { golds : { goldList } } = this
            let { body: { face } } = this.player
            let { body } = this.player
            let { isObstacleIntersection } = this.isObstacleIntersection
            let { isMapIntersection } = this.isMapIntersection
            let oldTop = parseInt (face.style.top);
            let oldLeft = parseInt (face.style.left);
            
                switch(event.keyCode){

                case 40 : //down
                isMapIntersection = this.mapIntersection()
                isObstacleIntersection = this.obstacleIntersection(obstacleList, face)
                this.goldData = this.goldIntersection(goldList, face)

                        if (isObstacleIntersection || isMapIntersection) {
                            face.style.top = `${oldTop - 20}px`
                            body.lowLife.style.top = `${oldTop - 30 - 20}px` // hightLife
                            body.highLife.style.top = `${oldTop - 30 - 20}px` // lowLife
                            this.player.decreaseLife(this.renderFeedBack('-10', '#fb5a14'))
                            break;

                        } else if (this.goldData.isIntersection){
                            this.addGold(this.goldData.goldId)
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

                        if (isObstacleIntersection || isMapIntersection) {
                            face.style.top = `${oldTop + 20}px`
                            body.lowLife.style.top = `${oldTop - 30 + 20}px`
                            body.highLife.style.top = `${oldTop - 30 + 20}px`
                            this.player.decreaseLife(this.renderFeedBack('-10', '#fb5a14'))
                            break;

                        } else if (this.goldData.isIntersection){
                            this.addGold(this.goldData.goldId)
                            break;

                        } else {
                            face.style.top = `${oldTop - 20}px`
                            body.lowLife.style.top = `${oldTop - 30 - 20}px` // hightLife
                            body.highLife.style.top = `${oldTop - 30 - 20}px` // lowLife
                            break;
                        }

                case 39 : 
                isMapIntersection = this.mapIntersection()
                isObstacleIntersection = this.obstacleIntersection(obstacleList, face)
                this.goldData = this.goldIntersection(goldList, face)

                        if (isObstacleIntersection || isMapIntersection ) {
                            face.style.left = `${oldLeft - 20}px`
                            body.lowLife.style.left = `${oldLeft - 20}px`
                            body.highLife.style.left = `${oldLeft - 20}px`
                            this.player.decreaseLife(this.renderFeedBack('-10', '#fb5a14'))
                            break;

                        } else if (this.goldData.isIntersection){
                            this.addGold(this.goldData.goldId)
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

                        if (isObstacleIntersection || isMapIntersection) {
                            face.style.left = `${oldLeft + 20}px`
                            body.lowLife.style.left = `${oldLeft + 20}px`
                            body.highLife.style.left = `${oldLeft + 20}px`
                            this.player.decreaseLife(this.renderFeedBack('-10', '#fb5a14'))
                            break;

                        } else if (this.goldData.isIntersection) {
                            this.addGold(this.goldData.goldId)
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

    renderGoldInfo = () => {
        let score = document.createElement('p')
        score.innerText = 'Gold: ' + `${this.colectedGolds}`
        score.setAttribute('id','score')
        this.gameInfo.appendChild(score)
    }

    addGold(goldId){
        console.log(goldId)
        let score = document.getElementById('score')
        this.colectedGolds = this.colectedGolds + 1
        score.innerText = 'Gold: ' + `${this.colectedGolds}`

        this.moveGold(goldId)
    }

    moveGold(colectedGoldId){
        console.log(colectedGoldId)
        let colectedGoldOuter = document.getElementById(colectedGoldId)
        let colectedGoldinner = colectedGoldOuter.nextElementSibling

        let goldPosition = this.createPosition()
        colectedGoldOuter.style.top = `${goldPosition.top}px`
        colectedGoldOuter.style.left = `${goldPosition.left}px`
        colectedGoldinner.style.top = `${goldPosition.top}px`
        colectedGoldinner.style.left = `${goldPosition.left}px`

        this.renderFeedBack('1$', '#f4a80d')
        
    }

    renderFeedBack (text, color) {
        let reward = document.createElement('p')
        let { body: { face } } = this.player
        reward.innerText = text
        reward.style.position = 'absolute'
        reward.style.color = color
        reward.style.top = face.style.top
        reward.style.left = face.style.left
        reward.style.fontSize = 'xx-large'
        this.map.appendChild(reward)

        this.removeFeedBack(reward)
    }

    removeFeedBack(reward){
        setTimeout(()=>{
            reward.remove()
        },500)
    }

}


export { Game }