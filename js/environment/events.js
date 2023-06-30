import { getDefaultNodeStyle } from "../graph/styles/styles.js"

export default function Events() {
  this.toProcess = []
}

Events.prototype.process = function() {
  for (let i = 0; i < this.toProcess.length; i++) {
    const event = this.toProcess.shift()
    setTimeout(event.f, event.t)
  }
}

Events.prototype.callCreationNodeEvent = function(graph, mouse, delay) {
  const click = mouse.get()
  if (delay === 0)
    graph.addNode(click.x, click.y, getDefaultNodeStyle())
  else 
    this.toProcess.push({f: () => graph.addNode(click.x, click.y), t: delay})
}

Events.prototype.callConnectionNodesEvents = function(nodeA, nodeB, graph, delay) {

}

Events.prototype.callObjectsStyleChangeEvent = function(style, delay, ...objs) {
  if (delay === 0) {
    for (let o of objs)
      o.setStyle(style)
  } else {
    this.toProcess.push({f: () => {
      for (let o of objs)
        o.setStyle(style)
    }, t: delay})
  }
}