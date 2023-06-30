import Mode from '../mode.js'
import GeneticAlgo from '../../algorithms/genetic.js'

export default function GeneticMode() {
  Mode.call(this)
}

GeneticMode.prototype = Object.create(Mode.prototype)
GeneticMode.prototype.constructor = GeneticMode

GeneticMode.prototype.onModeChange = function(program, graph, events) {
  program.clearSelectedNodes()
  program.clearSelectedEdges()
  if (!window.hasOwnProperty('ag'))
    window.ag = new GeneticAlgo()
}

GeneticMode.prototype.onMousePressed = function(program, graph, events) {
  window.ag.process(program, graph, events)
}

GeneticMode.prototype.onMouseReleased = function(program, graph, events) {
  if (program.selectedNodes.length === 2)
    program.clearSelectedNodes()
}