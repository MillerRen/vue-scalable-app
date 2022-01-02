import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import Dialog from 'vuejs-dialog'
import mixins from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'

const registerComponent = Dialog.prototype.registerComponent

Dialog.prototype.registerComponent = function (name, definition) {
  if (definition.mixins) {
    definition.mixins.push(mixins)
  } else {
    definition.mixins = [mixins]
  }
  registerComponent.call(this, name, definition)
}

export default Dialog
