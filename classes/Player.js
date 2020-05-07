class Player {
    constructor (map) {
        this.map = map
        this.life = 90 
        this.body = Player.createBody(this.map, this.life);
    }

    move = () => {
        document.addEventListener('keyup', (event) =>{
            let oldTop = parseInt(this.body.face.style.top);
            let oldLeft = parseInt(this.body.face.style.left);

                switch(event.keyCode){
                case 40 : //down
                this.body.face.style.top = `${oldTop + 20}px` // 50 + 20 = 70
                this.body.lowLife.style.top = `${oldTop - 30 + 20}px` // 20 + 20 = 40 sau 50 + 20 = 70
                this.body.highLife.style.top = `${oldTop - 30 + 20}px`
                break;

                case 38: //up
                this.body.face.style.top = `${oldTop - 20}px`
                this.body.lowLife.style.top = `${oldTop - 30 - 20}px` // hightLife
                this.body.highLife.style.top = `${oldTop -  30 - 20}px` // lowLife
                
                break;

                case 39 : 
                this.body.face.style.left = `${oldLeft + 20}px`
                this.body.lowLife.style.left = `${oldLeft + 20}px`
                this.body.highLife.style.left = `${oldLeft + 20}px`
                break;

                case 37 : 
                this.body.face.style.left = `${oldLeft - 20}px`
                this.body.lowLife.style.left = `${oldLeft - 20}px`
                this.body.highLife.style.left = `${oldLeft - 20}px`
                break;
            }
            
        })
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

        style.width = `60px`;
        style.height = `20px`;
        style.backgroundColor = '#14fb5a'
        style.position = "absolute";
        style.top = `20px`
        style.borderRadius = `10px`
        style.left = `20px`
        
        map.appendChild(highLife)

        return  highLife
    }

}


export { Player }