let gameMap = document.getElementById('container')
let gameInfo = document.getElementById('info-container')


let game = new Game(gameMap, gameInfo)


// 1) the gold and obstacles should not overlay the player
// 2) the gold and obstacles should not get outside the map
// 3) 