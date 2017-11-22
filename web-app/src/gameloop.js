/**
 * @module gameLoop
 */

const { Player, getClientId } = require('./player')
const { Ball } = require('./bodies/ball')
const { Brick, getBrickId } = require('./bodies/brick')
const constants = require('./constants')

/**
 * GameLoop provides the state and drawing for the sketch
 * @class
 * @prop {Paddle[]} paddles
 * @prop {Ball} ball
 */
exports.GameLoop = class GameLoop {
  constructor () {
    // Initialise bodies
    this.ball = new Ball()
    this.players = {}
    this.bricks = {}

    this.run = this.run.bind(this)
  }

  /**
   * Update players to current state or create new players if they don't exist already
   * @method
   * @param {object[]} players
   */
  updatePlayers (players) {
    const isMultiplayer = players.length === 2
    for (const p of players) {
      const id = getClientId(p)
      if (!this.players[id]) {
        const isCurrentPlayer = id === window.wsClient.clientId
        this.players[id] = new Player(isCurrentPlayer, isMultiplayer)
      }
      this.players[id].update(p)
    }
  }

  /**
   * Update bricks to current state or create new bricks if they don't exist already
   * @method
   * @param {object[]} bricks
   */
  updateBricks (bricks) {
    for (const b of bricks) {
      const id = getBrickId(b)
      if (!this.bricks[id]) {
        this.bricks[id] = new Brick(id)
      }
      this.bricks[id].update(b)
    }
  }

  /**
   * Update the ball to match the server state
   * @method
   * @param {number[]} ball 
   */
  updateBall (ballObj) {
    this.ball.update(ballObj)
  }

  /**
   * Draws the current state onto the provided sketch
   * @method
   */
  run (sketch) {
    // Clear canvas
    sketch.background(0)

    for (const clientId in this.players) {
      if (!this.players.hasOwnProperty(clientId)) {
        return
      }
      const player = this.players[clientId]
      player.paddle.draw(sketch)
      if (player.score) {
        player.score.draw(sketch)
      }
    }

    for (const brickId in this.bricks) {
      if (!this.bricks.hasOwnProperty(brickId)) {
        return
      }
      const brick = this.bricks[brickId]
      if (!brick.isBroken()) {
        this.bricks[brickId].draw(sketch)
      }
    }

    this.ball.draw(sketch)
  }
}
