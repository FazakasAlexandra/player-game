import { Game } from "./classes/Game.js"


let gameMap = document.getElementById('container')
let gameInfo = document.getElementById('info-container')


let game = new Game(gameMap, gameInfo)
game.play()


// 1) the gold and obstacles should not overlay the player - ok 
// 2) the gold and obstacles should not get outside the map - ok
// 3) the golds and obstacles shold not overlay themselves of eachother 
// 4) the player should not be able to pass the obstacles - ok
// 5) players life should be decreased if the player position is close enough to one of the obstacles - ok
// 6) score increses when players position is close enough to one of the golds - ok
// 7) gold disapers and gets repositioned after 6) - ok