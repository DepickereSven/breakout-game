const constants = require('../constants')
const { JoinGameRequestAction } = require('../actions/join_game_request')

const path = 'join_private.html'
exports.path = path

exports.view = class JoinPrivate {
  constructor (viewManager) {
    this.path = path
    this.viewManager = viewManager

    this.submitButton = '#submit_and_join_private_game'
    this.scanQrCodeButton = '#start_QR_scan'
    this.codeInput = '#code_for_join_private_game'
  }

  handleKeyRetrieval (key) {
    if (key.length !== 5) {
      return
    }
    window.wsClient.send(new JoinGameRequestAction(key))
  }

  handleSubmitButtonClick () {
    const key = $(this.codeInput).val().toUpperCase()
    this.handleKeyRetrieval(key)
  }

  onLoad () {
    $(this.submitButton).on('click', this.handleSubmitButtonClick.bind(this))
    if (constants.IS_ANDROID_APP) {
      $(this.scanQrCodeButton).on('click', SmashIt.startQRCode)
    }
  }

  onUnload () {
    $(this.submitButton).off('click')
    $(this.scanQrCodeButton).off('click')
  }
}
