import Mode from "../mode.js"
import { getDefaultNodeStyle, getDefaultEdgeStyle } from "../../graph/styles/styles.js"

export default function SoftResetMode() {
  Mode.call(this)
}

SoftResetMode.prototype = Object.create(Mode.prototype)
SoftResetMode.prototype.constructor = SoftResetMode

SoftResetMode.prototype.onModeChange = function(program, graph, events) {
  program.clearSelectedNodes()
  program.clearSelectedEdges()
  delete window.ag
  events.callObjectsStyleChangeEvent(getDefaultNodeStyle(), 0, ...graph.nodes)
  events.callObjectsStyleChangeEvent(getDefaultEdgeStyle(), 0, ...graph.edges)
}