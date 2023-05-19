class APATHFINDING {

  constructor(start, end) {
    this.path = []
    this.end = end
    this.table = {}
    this.start = start
    this.heuristic = null
  }

  with(heuristic) {
    this.heuristic = heuristic
    return this
  }

  execute(global) {
    this.initTableOfHeuristics(global)
    let found = false
    let lastNode = null
    const queue = [this.start]
    while (queue.length > 0) {
      const node = this.getBestNode(global, queue)
      this.path.push({[node.id]: lastNode})
      if (node === this.end) {
        found = true
        break;
      }
      for (const n of global.getSuccessorsOf(node))
        if (queue.indexOf(n) === -1)
          queue.push(n)
      lastNode = node
    }
    if (found) {
      console.log(this.path)
      console.log(this.table)
      this.changePrototypeOfComponents(global)
    }
  }

  getBestNode(global, queue) {
    let bestNode = null
    let minValue = Infinity
    for (const node of queue) {
      for (const s of global.getSuccessorsOf(node)) {
        const h = this.table[node.id]
        const con = global.getConnectionBetweenNodes(node, s)
        const g = con === null ? Infinity : con.weigth
        if (g + h < minValue) {
          minValue = g + h
          bestNode = node
        }
      }
    }
    const index = queue.indexOf(bestNode)
    return queue.splice(index, 1)[0]
  }

  initTableOfHeuristics(global) {
    for (const node of global.nodes)
      this.table[node.id] = this.heuristic.calc(this.end, node)
  }

  changePrototypeOfComponents(global) {
    for (const node of global.nodes)
      node.changePrototype(this.getCorrectNodePrototype(node))
    for (const con of global.connections)
      con.changePrototype(getInvalidConnectionPrototype())
    for (let i = this.path.length - 1; i > 0; i--) {
      const id = Object.keys(this.path[i])[0]
      const a = global.getNodeById(id)
      const b = this.path[i][id]
      global.getConnectionBetweenNodes(a, b).changePrototype(getValidConnectionPrototype())
    }
  }

  getCorrectNodePrototype(node) {
    for (const obj of this.path)
      if (Object.keys(obj).indexOf(node.id) !== -1)
        return getValidNodePrototype()
    return getInvalidNodePrototype()
  }
}