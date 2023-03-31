class BFS {

  constructor() {
    this.queue = []
    this.marked = []
    this.exploredConnections = []
  }

  execute(global) {
    let node = global.selectedNodes[0]
    this.queue.push(node)
    this.markNode(node)
    while (this.queue.length > 0) {
      node = this.queue.shift()
      for (let n of global.getSuccessorsOf(node)) {
        if (this.marked.indexOf(n) === -1) 
          this.exploreValidConnection(global, node, n)
        else if (this.exploredConnections.indexOf(global.getConnectionBetweenNodes(node, n)) === -1)
          this.exploreInvalidConnection(global, node, n)
      }
    }
  }

  exploreValidConnection(global, a, b) {
    this.markNode(b)
    this.queue.push(b)
    const con = global.getConnectionBetweenNodes(a, b)
    this.exploredConnections.push(con)
    con.changePrototype(getValidConnectionPrototype())
  }

  exploreInvalidConnection(global, a, b) {
    global.getConnectionBetweenNodes(a, b).changePrototype(getInvalidConnectionPrototype())
  }

  markNode(node) {
    this.marked.push(node)
    node.changePrototype(getValidNodePrototype())
  }
}