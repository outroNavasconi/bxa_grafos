import Mode from "../mode.js"

export default function RemoveMode() {
  Mode.call(this)
}

RemoveMode.prototype = Object.create(Mode.prototype)
RemoveMode.prototype.constructor = RemoveMode

RemoveMode.prototype.onModeChange = function(program) {
  program.clearSelectedNodes()
  program.clearSelectedEdges()
}

RemoveMode.prototype.onMousePressed = function(program, graph, events) {
  if (program.selectedNodes.length === 1)
    graph.removeNode(program.selectedNodes[0])
  else if (program.selectedEdges.length === 1)
    graph.removeEdge(program.selectedEdges[0])
}

RemoveMode.prototype.onMouseReleased = function(program, graph, events) {
  program.clearSelectedNodes()
  program.clearSelectedEdges()
}
