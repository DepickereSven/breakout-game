const path = 'social_media.html'
exports.path = path

exports.view = class LoadingView {
  constructor (viewManager) {
    this.path = path
    this.hideHeader = false
    this.viewManager = viewManager
  }
  onLoad () {
  }

  onUnload () {

  }
}
