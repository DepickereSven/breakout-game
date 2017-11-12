const {
  CreateSingleplayerRequestAction
} = require('../actions/create_singleplayer_request')

const path = 'singleplayer_game_lost.html'
exports.path = path

exports.view = class PickModeView {
  constructor (viewManager) {
    this.path = path
    this.hideHeader = true
    this.viewManager = viewManager
    this.menu = '#menu_singleplayer'
    this.retry = '#retry_singleplayer'
  }

  handleLevelClick () {
    window.wsClient.send(new CreateSingleplayerRequestAction())
  }
  sendBackToMenu (e) {
    const data = $(e.currentTarget).data()
    this.viewManager.go('singleplayer_menu.html', data)
  }
  onLoad () {
    $(this.retry).on('click', this.handleLevelClick)
    $(this.menu).on('click', this.sendBackToMenu.bind(this))
  }

  onUnload () {
  }
}
