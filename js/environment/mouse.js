class Mouse {

  constructor() {
    this.click = null
  }

  registerMouseClick() {
    this.click = createVector(mouseX, mouseY)
  }

  registerInGlobalIfWasOverNode(global) {
    for (let node of global.nodes) {
      if (node.pos.dist(this.click) <= node.nodePrototype.size) {
        if (global.selectedNodes.indexOf(node) === -1)
          global.selectedNodes.push(node)
        break
      }
    }
  }

  registerInGlobalIfWasOverConnection(global) {
    for (let connection of global.connections) {
      if (connection.checkIfVectorIsOnLine(this.click)) {
        global.selectedConnection = connection
        break
      }
    }
  }
}