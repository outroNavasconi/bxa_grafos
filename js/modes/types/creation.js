import Mode from "../mode.js"

export default function CreationMode() {
  Mode.call(this)
}

CreationMode.prototype = Object.create(Mode.prototype)
CreationMode.prototype.constructor = CreationMode

CreationMode.prototype.onModeChange = function(program) {
  program.clearSelectedNodes()
}

CreationMode.prototype.onMousePressed = function(program, graph, events) {
  if (program.selectedNodes.length === 0)
    events.callCreationNodeEvent(graph, program.mouse, 0)
}
