class WELSHPOWELL {
  
  constructor() {
    this.groups = []
  }

  execute(global) {
    const sorted = this.sortNodes(global)
    while (sorted.length > 0) {
      const group = [sorted.shift()]
      for (const node of sorted) {
        let isAdjTo = false
        for (const nodeOfGroup of group) {
          const isSuccessor = global.getSuccessorsOf(node).includes(nodeOfGroup)
          const isPredecessor = global.	getPredecessorsOf(node).includes(nodeOfGroup)
          isAdjTo = isSuccessor || isPredecessor
        }
        if (!isAdjTo) {
          const index = sorted.indexOf(node)
          group.push(sorted.splice(index, 1)[0])
        }
      }
      this.groups.push(group)
    }
    this.changePrototypesOfNodes()
  }

  sortNodes(global) {
    return Array.from(global.nodes).sort((a, b) => {
      global.getConnectionsOf(b).length - global.getConnectionsOf(a).length
    })
  }

  changePrototypesOfNodes() {
    for (const group of this.groups) {
      const nodePrototype = getRandomNodePrototype()
      for (const node of group)
        node.changePrototype(nodePrototype)
    }
  }
}