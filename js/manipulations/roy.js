class ROY {

  constructor() {
    this.nodes = []
    this.plus = []
    this.minus = []
    this.components = []
  }

  execute(global) {
    this.nodes = [...global.nodes]
    let node = global.selectedNodes[0]
    while (this.nodes.length > 0) {
      this.markAllSuccessors(global, node)
      this.markAllPredecessors(global, node)
      this.assemblyNodesWithPlusMinus()
      this.removeComponentsFromNodesList()
      if (this.nodes.length > 0)
        node = this.nodes[0]
    }
    this.changePrototypeOfComponents(global)
  }

  markAllSuccessors(global, node) {
    const path = [node]
    const successors = global.getSuccessorsOf(node)
    while (successors.length > 0) {
      const node = successors.pop()
      if (path.indexOf(node) === -1) {
        path.unshift(node)
        const successorsOfLastNode = global.getSuccessorsOf(path[0])
        for (let s of successorsOfLastNode)
          if (successors.indexOf(s) === -1)
            successors.push(s)
      }
    }
    this.plus = [...path]
  }

  markAllPredecessors(global, node) {
    const path = [node]
    const predecessors = global.getPredecessorsOf(node)
    while (predecessors.length > 0) {
      const node = predecessors.pop()
      if (path.indexOf(node) === -1) {
        path.unshift(node)
        const predecessorsOfLastNode = global.getPredecessorsOf(path[0])
        for (let p of predecessorsOfLastNode)
          if (predecessors.indexOf(p) === -1)
          predecessors.push(p)
      }
    }
    this.minus = [...path]
  }

  assemblyNodesWithPlusMinus() {
    const component = []
    const arr = this.plus.length < this.minus.length ? this.plus : this.minus
    arr.forEach(node => {
      if (this.plus.indexOf(node) !== -1 && this.minus.indexOf(node) !== -1)
        component.push(node)
    })
    this.plus = []
    this.minus = []
    this.components.push(component)
  }

  removeComponentsFromNodesList() {
    this.components.forEach(component => {
      component.forEach(node => {
        const index = this.nodes.indexOf(node)
        this.nodes.splice(index, 1)
      })
    })
  }

  changePrototypeOfComponents(global) {
    this.components.forEach(component => {
      const nodeProto = getRandomNodePrototype()
      const connectionProto = getConnectionPrototype()
      connectionProto.connectionColor = nodeProto.strokeColor
      component.forEach(node => node.changePrototype(nodeProto))
      for (let i = 0; i < component.length; i++) {
        for (let j = i + 1; j < component.length; j++) {
          const connection = global.getConnectionBetweenNodes(component[i], component[j])
          if (connection !== null)
            connection.changePrototype(connectionProto)
        }
      }
    })
  }
}