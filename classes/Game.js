import { Gold } from "./Gold.js"
import { Obstacle } from "./Obstacle.js"
import { Player } from "./Player.js"
import { FeedBack } from "./FeedBack.js"

class Game {
    constructor(map, gameInfo) {
        this.map = map
        this.gameInfo = gameInfo
        this.mapWidth = this.map.getBoundingClientRect().width
        this.mapHeight = this.map.getBoundingClientRect().height

        this.player = new Player(map)
        this.obstacles = new Obstacle(map, 3)
        this.golds = new Gold(map, this.mapWidth, this.mapHeight, 4)
        this.hitFeedBack = new FeedBack(map, '#fb5a14')
        this.colectedGolds = 0
    }


    renderObstacles() {
        let { obstacles: { obstacleList } } = this

        obstacleList.forEach(obstacle => {
            let obstaclePosition = this.createPosition()
            obstacle.style.top = `${obstaclePosition.top}px`
            obstacle.style.left = `${obstaclePosition.left}px`

            this.map.appendChild(obstacle)
        });
    }


    renderGolds() {
        let { golds: { goldList } } = this

        goldList.forEach((gold, i) => {
            let goldPosition = this.createPosition()
            gold.innerCircle.style.top = `${goldPosition.top}px`
            gold.innerCircle.style.left = `${goldPosition.left}px`

            gold.outerCircle.style.top = `${goldPosition.top}px`
            gold.outerCircle.style.left = `${goldPosition.left}px`
            gold.outerCircle.setAttribute('id', `${i}`)

            this.map.appendChild(gold.outerCircle)
            this.map.appendChild(gold.innerCircle)
        })
    }


    createPosition() {
        let top = Math.floor(Math.random() * (this.mapHeight - 40 - 120) + 120);
        let left = Math.floor(Math.random() * (this.mapWidth - 40 - 50) + 50);

        return { top, left }
    }


    goldIntersection(array, face) {
        let goldData = array.map(function (gold) {
            let { style: { top, left } } = gold.outerCircle
            let { id } = gold.outerCircle

            let topDiff = Math.abs(parseInt(top) - parseInt(face.style.top))
            let leftDiff = Math.abs(parseInt(left) - parseInt(face.style.left))

            return { bool: topDiff < parseInt(face.style.height) && leftDiff < parseInt(face.style.width), id }
        })

        let isIntersection = false
        let goldId = null
        for (let i = 0; i < goldData.length; i++) {
            if (goldData[i].bool) {
                isIntersection = goldData[i].bool
                goldId = goldData[i].id
                break
            }
        }

        return { isIntersection, goldId }
    }


    obstacleIntersection(array, face) {
        let boolList = array.map(function (element) {
            let { style: { top, left } } = element

            let topDiff = Math.abs(parseInt(top) - parseInt(face.style.top))
            let leftDiff = Math.abs(parseInt(left) - parseInt(face.style.left))

            return topDiff < parseInt(face.style.height) && leftDiff < parseInt(face.style.width)
        })

        let isIntersection = this.checkObstacleIntersection(boolList)

        return isIntersection
    }


    checkObstacleIntersection(boolList) {
        let isIntersection = false
        for (let i = 0; i < boolList.length; i++) {
            isIntersection = boolList[i] ? true : isIntersection
        }

        return isIntersection
    }


    mapIntersection() {
        let { body: { face } } = this.player
        let { top, left } = face.style

        let isMapintersection = false
        if (parseInt(top) < 0 || parseInt(left) < 0) {
            isMapintersection = true
        } else if (parseInt(top) > this.mapHeight - 50 || parseInt(left) > this.mapWidth - 50) {
            isMapintersection = true
        }

        return isMapintersection
    }


    move = () => {
        document.addEventListener('keyup', (event) => {
            let { body: { face } } = this.player
            let { hitFeedBack } = this
            let { golds } = this
            let { golds: { goldList } } = this
            let { obstacles: { obstacleList } } = this

            switch (event.keyCode) {

                case 40: //down
                    this.goldData = this.goldIntersection(goldList, face)

                    if (this.obstacleIntersection(obstacleList, face)) {
                        this.up(face)
                        this.player.decreaseLife(5)
                        hitFeedBack.renderFeedBack(face, '-5')
                        break;

                    } else if (this.mapIntersection()) {
                        this.player.decreaseLife(101)
                        hitFeedBack.renderFeedBack(face, '- 100')
                        break

                    } else if (this.goldData.isIntersection) {
                        golds.addGold(this.goldData.goldId, this.colectedGolds, face)
                        this.colectedGolds = this.colectedGolds + 1
                        break;

                    } else {
                        this.down(face)
                        break;
                    }

                case 38: //up
                    this.goldData = this.goldIntersection(goldList, face)

                    if (this.obstacleIntersection(obstacleList, face)) {
                        this.down(face)
                        this.player.decreaseLife(5)
                        hitFeedBack.renderFeedBack(face, '-5')
                        break;

                    } else if (this.mapIntersection()) {
                        hitFeedBack.renderFeedBack(face, '- 100')
                        this.player.decreaseLife(101)
                        break

                    } else if (this.goldData.isIntersection) {
                        golds.addGold(this.goldData.goldId, this.colectedGolds, face)
                        this.colectedGolds = this.colectedGolds + 1
                        break;

                    } else {
                        this.up(face)
                        break;
                    }

                case 39: //right
                    this.goldData = this.goldIntersection(goldList, face)

                    if (this.obstacleIntersection(obstacleList, face)) {
                        this.left(face)
                        this.player.decreaseLife(5)
                        hitFeedBack.renderFeedBack(face, '-5')
                        break;

                    } else if (this.mapIntersection()) {
                        this.player.decreaseLife(101)
                        hitFeedBack.renderFeedBack(face, '- 100')
                        break

                    } else if (this.goldData.isIntersection) {
                        golds.addGold(this.goldData.goldId, this.colectedGolds, face)
                        this.colectedGolds = this.colectedGolds + 1
                        break;

                    } else {
                        this.right(face)
                        break;
                    }

                case 37: // left
                    this.goldData = this.goldIntersection(goldList, face)

                    if (this.obstacleIntersection(obstacleList, face)) {
                        this.right(face)
                        this.player.decreaseLife(5)
                        hitFeedBack.renderFeedBack(face, '-5')
                        break;

                    } else if (this.mapIntersection()) {
                        this.player.decreaseLife(101)
                        hitFeedBack.renderFeedBack(face, '- 100')
                        break

                    } else if (this.goldData.isIntersection) {
                        golds.addGold(this.goldData.goldId, this.colectedGolds, face)
                        this.colectedGolds = this.colectedGolds + 1
                        break;

                    } else {
                        this.left(face)
                        break;
                    }
            }
        })
    }


    start() {
        this.renderObstacles()
        this.renderGolds()
        this.golds.renderGoldInfo(this.gameInfo, this.colectedGolds)
        this.move()
    }


    left(face) {
        let { body } = this.player
        let oldLeft = parseInt(face.style.left);

        face.style.left = `${oldLeft - 20}px`
        body.lowLife.style.left = `${oldLeft - 20}px`
        body.highLife.style.left = `${oldLeft - 20}px`
    }


    right(face) {
        let { body } = this.player
        let oldLeft = parseInt(face.style.left);


        face.style.left = `${oldLeft + 20}px`
        body.lowLife.style.left = `${oldLeft + 20}px`
        body.highLife.style.left = `${oldLeft + 20}px`
    }


    up(face) {
        let { body } = this.player
        let oldTop = parseInt(face.style.top);

        face.style.top = `${oldTop - 20}px`
        body.lowLife.style.top = `${oldTop - 30 - 20}px` // hightLife bar
        body.highLife.style.top = `${oldTop - 30 - 20}px` // lowLife bar
    }


    down(face) {
        let { body } = this.player
        let oldTop = parseInt(face.style.top);

        face.style.top = `${oldTop + 20}px`
        body.lowLife.style.top = `${oldTop - 30 + 20}px`
        body.highLife.style.top = `${oldTop - 30 + 20}px`
    }
}


export { Game }