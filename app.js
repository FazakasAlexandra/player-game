import { Game } from "./classes/Game.js"


let gameMap = document.getElementById('container')
let gameInfo = document.getElementById('info-container')


let game = new Game(gameMap, gameInfo)
game.start()