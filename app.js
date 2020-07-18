import { Game } from "./classes/Game.js"

document.onkeydown = KD;
       function KD(e) {
         event.returnValue = false;
}

let gameMap = document.getElementById('container')
let gameInfo = document.getElementById('info-container')


let game = new Game(gameMap, gameInfo)
game.start()