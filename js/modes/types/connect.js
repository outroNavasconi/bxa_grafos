import Mode from '../mode.js'
import { getDefaultEdgeStyle } from '../../graph/styles/styles.js'

export default function ConnectionMode() {
  this.oriented = false
  Mode.call(this)
}

ConnectionMode.prototype = Object.create(Mode.prototype)
ConnectionMode.prototype.constructor = ConnectionMode

ConnectionMode.prototype.optionPanel = {
  check: 'oriented'
}

ConnectionMode.prototype.onModeChange = function(program) {
  program.clearSelectedNodes()
  program.clearSelectedEdges()
}

ConnectionMode.prototype.onMousePressed = function(program, graph, events) {
  if (program.selectedNodes.length === 2)
    graph.connect(program.selectedNodes[0], program.selectedNodes[1], getDefaultEdgeStyle())
}

ConnectionMode.prototype.onMouseReleased = function(program, graph, events) {
  if (program.selectedNodes.length === 2)
    program.clearSelectedNodes()
}
