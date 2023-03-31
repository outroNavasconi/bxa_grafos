class DFS {

  constructor() {
    this.marked = []
    this.exploredConnections = []
  }

  execute(global, node) {
    this.markNode(node)
    for (let n of global.getSuccessorsOf(node)) {
      if (this.marked.indexOf(n) === -1)
        this.exploreValidConnection(global, node, n)
      else if (this.exploredConnections.indexOf(global.getConnectionBetweenNodes(node, n)) === -1)
        this.exploreInvalidConnection(global, node, n)
    }
  }

  exploreValidConnection(global, a, b) {
    this.markNode(b)
    const con = global.getConnectionBetweenNodes(a, b)
    this.exploredConnections.push(con)
    con.changePrototype(getValidConnectionPrototype())
    this.execute(global, b)
  }

  exploreInvalidConnection(global, a, b) {
    global.getConnectionBetweenNodes(a, b).changePrototype(getInvalidConnectionPrototype())
  }

  markNode(node) {
    this.marked.push(node)
    node.changePrototype(getValidNodePrototype())
  }
}