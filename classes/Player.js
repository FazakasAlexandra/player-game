class Player {
    constructor(color, map) {
        this.color = color || '#0ea7ed'
        this.map = map
        this.life = 90 
        this.body = Player.createBody(this.map, this.color, this.life);
        console.log(this.body)
    }

    move = () => {
        document.addEventListener('keyup', (event) =>{
            let oldTop = parseInt(this.body.chest.style.top);
            let oldLeft = parseInt(this.body.chest.style.left);

                switch(event.keyCode){
                case 40 : //down
                this.body.chest.style.top = `${oldTop + 20}px` // 50 + 20 = 70
                this.body.lowLife.style.top = `${oldTop - 30 + 20}px` // 20 + 20 = 40 sau 50 + 20 = 70
                this.body.highLife.style.top = `${oldTop - 30 + 20}px`
                break;

                case 38: //up
                this.body.chest.style.top = `${oldTop - 20}px` // chest
                this.body.lowLife.style.top = `${oldTop - 30 - 20}px` // hightLife
                this.body.highLife.style.top = `${oldTop -  30 - 20}px` // lowLife
                
                break;

                case 39 : 
                this.body.chest.style.left = `${oldLeft + 20}px`
                this.body.lowLife.style.left = `${oldLeft + 20}px`
                this.body.highLife.style.left = `${oldLeft + 20}px`
                break;

                case 37 : 
                this.body.chest.style.left = `${oldLeft - 20}px`
                this.body.lowLife.style.left = `${oldLeft - 20}px`
                this.body.highLife.style.left = `${oldLeft - 20}px`
                break;

                //maybe jump function
                /* case 32 :
                    this.body.chest.style.top = `${oldTop - 20}px`
                    this.body.chest.style.left = `${oldLeft - 10}px`
                break; */
                
            }
            
        })
    }


    static createBody = (map, color, life) => {
        //console.log(this) // this este pe contextul player
        //console.log(this.life) // totusi this.life este undefined
        let chest = Player.createChest(map, color)
        let lowLife = Player.createLowLife(map)
        let highLife = Player.createHightLife(map, life)


        return {chest, lowLife, highLife};
    }


    static createChest = (map) => {
        const chest = document.createElement('img');
        chest.setAttribute('src', 'https://image.flaticon.com/icons/svg/658/658360.svg')

        const { style } = chest;

        style.width = `60px`;
        style.height = `60px`;
        style.marginLeft = `10px`
        //style.backgroundColor = color
        style.position = "absolute";
        style.top =  `50px`
        style.left = `20px`

        map.appendChild(chest);

        return chest
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

