import Mode from '../mode.js'

export default function FreeMode() {
  Mode.call(this)
}

FreeMode.prototype = Object.create(Mode.prototype)
FreeMode.prototype.constructor = FreeMode

FreeMode.prototype.onModeChange = function(program, graph, events) {
  program.clearSelectedNodes()
  program.clearSelectedEdges()
}

FreeMode.prototype.onMouseDragged = function(program, graph, events) {
  if (program.selectedNodes.length === 1) {
    const position = program.mouse.get()
    program.selectedNodes[0].changePosition(position.x, position.y)
  }
}

FreeMode.prototype.onMouseReleased = function(program, graph, events) {
  program.clearSelectedNodes()
}