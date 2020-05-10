class Player {
    constructor (map) {
        this.map = map
        this.life = 100
        this.golds = 0
        this.body = Player.createBody(this.map, this.life);
    }    

    static createBody = (map, life) => {
        let face = Player.createFace(map)
        let lowLife = Player.createLowLife(map)
        let highLife = Player.createHightLife(map, life)

        return {face, lowLife, highLife};
    }


    static createFace = (map) => {
        const face = document.createElement('img');
        face.setAttribute('src', 'https://image.flaticon.com/icons/svg/658/658360.svg')

        const { style } = face;

        style.width = `60px`;
        style.height = `60px`;
        style.marginLeft = `10px`
        style.position = "absolute";
        style.top =  `50px`
        style.left = `20px`

        map.appendChild(face);

        return face
    }


    static createLowLife = (map) => {
        const lowLife = document.createElement('div')

        const { style } = lowLife;

        style.width = `80px`;
        style.height = `20px`;
        style.backgroundColor = '#fb5a14'
        style.position = "absolute";
        style.top = `20px`
        style.left = `20px`
        style.borderRadius = `10px`


        map.appendChild(lowLife);

        return lowLife
    }


    static createHightLife = (map, life) => {
        const highLife = document.createElement('div');
        highLife.innerText = `${life}%`
        highLife.style.paddingLeft = `10px`

        const { style } = highLife;

        style.width = `70px`;
        style.height = `20px`;
        style.backgroundColor = '#14fb5a'
        style.position = "absolute";
        style.top = `20px`
        style.borderRadius = `10px`
        style.left = `20px`
        
        map.appendChild(highLife)

        return  highLife
    }

    decreaseLife(renderFeedBack){
        let oldWidth = parseInt(this.body.highLife.style.width)
        this.life = this.life - 10
        this.body.highLife.style.width = `${oldWidth - 10}px`
        this.body.highLife.innerText = `${this.life}px`
        this.body.highLife.innerText = `${this.life}%`

        
        if (this.life === 0){
            this.body.highLife.style.width = `0px`
            this.body.highLife.style.height = `0px`
            this.body.highLife.innerText = `${this.life}%`
            setTimeout(function(){
                alert('game over')
            }, 300)
        }

    }

}

export { Player }