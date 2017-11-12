/**
 * @module actions/game_victory.js
 */

// const gameVictoryView = require('../views/game_victory')

const { viewManager } = require('../views/index')

exports.GameVictoryAction = class GameVictoryAction {
  handler () {
    // gameVictoryView.show()
    const mod = JSON.parse(localStorage.getItem('whatMode'))
    if (mod === 'multi') {
      viewManager.go('multiplayer_game_won.html')
    } else {
      viewManager.go('singleplayer_game_won.html')
    }
  }
}
