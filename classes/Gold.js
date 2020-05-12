import {FeedBack} from "./FeedBack.js"

class Gold {
    constructor(map, mapWidth, mapHeight, nrGold){
        this.map = map
        this.mapWidth = mapWidth
        this.mapHeight = mapHeight
        this.goldList = Gold.createGolds(nrGold)
        this.feedBack = new FeedBack(map, '#f4a80d')
    }


    static createGolds = (nrGold) => {
        let golds = []
        for(let i = 0; i < nrGold; i++){
            golds[i] = Gold.createGold(20, 20)
        }
        return golds
    }


    static createGold = (width, heigh) => {
        let outerCircle = Gold.createOuterCircle(width + 20, heigh + 20)
        let innerCircle = Gold.createInnerCircle(width, heigh)

        return {outerCircle,innerCircle}
    }


    static createOuterCircle = (width, heigh) => {
        let outerCircle = document.createElement('div')
        outerCircle.className = 'goldCircles'
        outerCircle.setAttribute('id', 'outerCircle') 

        let { style } = outerCircle;
        style.width = `${width}px`
        style.height = `${heigh}px`
        style.backgroundColor = '#f4a80d'
        style.position = "absolute";

        return outerCircle
    }


    static createInnerCircle = (width, heigh) => {
        let innerCircle = document.createElement('div')
        innerCircle.className = 'goldCircles'
        innerCircle.setAttribute('id', 'innerCircle') 
        let cash = document.createElement('span')
        cash.innerText = '$'

        let { style } = innerCircle;
        style.width = `${width}px`
        style.height = `${heigh}px`
        style.backgroundColor = '#f4cf0d'
        style.position = "absolute";

        innerCircle.appendChild(cash)

        return innerCircle
    }

    createPosition () {
        let top = Math.floor(Math.random() * (this.mapHeight - 40 - 120) + 120);
        let left = Math.floor(Math.random() * (this.mapWidth - 40 - 50) + 50);

        return { top, left }
    }

    renderGoldInfo = (gameInfo, colectedGolds) => {
        let score = document.createElement('p')
        score.innerText = 'Gold: ' + `${colectedGolds}`
        score.setAttribute('id','score')
        gameInfo.appendChild(score)
    }

    addGold(goldId, colectedGolds, face){
        let score = document.getElementById('score')
        colectedGolds = colectedGolds + 1
        score.innerText = 'Gold: ' + `${colectedGolds}`

        this.moveGold(goldId, face)
    }

    moveGold(colectedGoldId, face){
        let colectedGoldOuter = document.getElementById(colectedGoldId)
        let colectedGoldinner = colectedGoldOuter.nextElementSibling

        let goldPosition = this.createPosition()

        colectedGoldOuter.style.top = `${goldPosition.top}px`
        colectedGoldOuter.style.left = `${goldPosition.left}px`

        colectedGoldinner.style.top = `${goldPosition.top}px`
        colectedGoldinner.style.left = `${goldPosition.left}px`

        this.feedBack.renderFeedBack(face, '1$')
    }
}

export { Gold }