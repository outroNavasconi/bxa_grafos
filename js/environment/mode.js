class Mode {

  constructor(avaliableModes) {
    this.atual = null
    this.hasChanged = false
    this.avaliableModes = avaliableModes
  }

  changeModeOfGlobal(global, keyValue) {
    if (this.avaliableModes.hasOwnProperty(keyValue.toUpperCase())) {
      global.lastMode = global.modeName
      this.atual = this.avaliableModes[keyValue.toUpperCase()].obj()
      global.modeName = this.avaliableModes[keyValue.toUpperCase()].name
      global.clearSelectedElements()
      global.addClassToSelectedElement()
      // nome do modo
      console.log(global.modeName)
    }
  }

  onChange(global) {
    this.atual.onChange(global)
  }

  beforeClick() {
    this.atual.beforeClick(global)
  }

  onClick(global, click) {
    this.atual.onClick(global, click)
  }

  afterClick(global) {
    this.atual.afterClick(global)
  }

  onUpdate(global) {
    this.atual.onUpdate(global)
  }

  onKeyPressed(global, keycode) {
    this.atual.onKeyPressed(global, keycode)
  }

  onMouseDragged(global) {
    this.atual.onMouseDragged(global)
  }

  onMouseReleased(global) {
    this.atual.onMouseReleased(global)
  }
}