class Gold {
    constructor(map, nrGold){
        this.map = map
        this.golds = Gold.createGolds(nrGold, map)
    }


    static createGolds = (nrGold, map) => {
        let golds = []
        for(let i = 0; i < nrGold; i++){
            golds[i] = Gold.createGold(map, 20, 20)
        }
        return golds
    }


    static createGold = (map, width, heigh) => {
        const mapWidth = map.getBoundingClientRect().width;
        const mapHeight = map.getBoundingClientRect().height;

        let top = Math.floor(Math.random() * (mapHeight-40));
        let left = Math.floor(Math.random() * (mapWidth-40));
        
        let outerCircle = Gold.createOuterCircle(map, width + 20, heigh + 20, top, left)
        let innerCircle = Gold.createInnerCircle(map, width, heigh, top, left)

        return {outerCircle,innerCircle}
    }


    static createOuterCircle = (map, width, heigh, top, left) => {
        let outerCircle = document.createElement('div')
        outerCircle.className = 'goldCircles'
        outerCircle.setAttribute('id', 'outerCircle') 

        let { style } = outerCircle;

        style.width = `${width}px`
        style.height = `${heigh}px`
        style.backgroundColor = '#f4a80d'
        style.position = "absolute";
        style.top = `${top}px`
        style.left = `${left}px`

        map.appendChild(outerCircle)

        return outerCircle
    }


    static createInnerCircle = (map, width, heigh, top, left) => {
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
        style.top = `${top}px`
        style.left = `${left}px`

        map.appendChild(innerCircle)
        innerCircle.appendChild(cash)

        return innerCircle
    }
}

export { Gold }