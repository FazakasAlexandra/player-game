class FeedBack {
    constructor(map, color) {
        this.map = map
        this.color = color;
    }

    renderFeedBack (face, text) {
        let reward = document.createElement('p')
        //let { body: { face } } = this.player

        reward.innerText = text
        reward.style.position = 'absolute'
        reward.style.color = this.color
        reward.style.top = face.style.top
        reward.style.left = face.style.left
        reward.style.fontSize = 'xx-large'
        this.map.appendChild(reward)

        FeedBack.removeFeedBack(reward)
    }

    static removeFeedBack(reward){
        setTimeout(()=>{
            reward.remove()
        },500)
    }

}

export { FeedBack }