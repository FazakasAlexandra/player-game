class Gold {
    constructor(map, nrGold){
        //get rid of the map
        this.map = map
        this.goldList = Gold.createGolds(nrGold, map)
        console.log(this.goldList)
    }


    static createGolds = (nrGold, map) => {
        let golds = []
        for(let i = 0; i < nrGold; i++){
            golds[i] = Gold.createGold(map, 20, 20)
        }
        return golds
    }


    static createGold = (map, width, heigh) => {
        let outerCircle = Gold.createOuterCircle(map, width + 20, heigh + 20)
        let innerCircle = Gold.createInnerCircle(map, width, heigh)

        return {outerCircle,innerCircle}
    }


    static createOuterCircle = (map, width, heigh) => {
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


    static createInnerCircle = (map, width, heigh) => {
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
}

export { Gold }