import * as menu from "../modes/menu.js"

export default function Program(mouse, keyboard) {
  this.modeId = ''
  this.modeObj = null
  this.mouse = mouse
  this.keyboard = keyboard
  this.selectedNodes = []
  this.selectedEdges = []
  this.lockedForChanges = false
  this.menuItems = menu.getMenuItems()
}

Program.prototype.saveSelectedObjects = function(graph) {
  for (let node of graph.nodes) {
    if (Math.hypot(node.x - this.mouse.x, node.y - this.mouse.y) <= 10) {
      if (!this.selectedNodes.includes(node))
        this.selectedNodes.push(node)
      break
    }
  }
  for (let edge of graph.edges) {
    const dividendA = (edge.bNode.x - edge.aNode.x) * (edge.aNode.y - this.mouse.y)
    const dividendB = (edge.aNode.x - this.mouse.x) * (edge.bNode.y - edge.aNode.y)
    const dividendAB = Math.abs(dividendA - dividendB)
    const divisor = Math.hypot(edge.aNode.x - edge.bNode.x, edge.aNode.y - edge.bNode.y)
    if (dividendAB / divisor <= 3) {
      this.selectedEdges.push(edge)
      break
    }
  }
}

Program.prototype.changeMode = function() {
  const char = this.keyboard.nextChar()
  if (char !== null && menu.avaliableModes.hasOwnProperty(char.toUpperCase())) {
    const mode = menu.avaliableModes[char.toUpperCase()]
    this.modeObj = new mode.obj()
    this.modeId = mode.id
    menu.clearSelectedClassOfMenuItems(this.menuItems)
    menu.addSelectedClassInMenuItem(this.modeId, this.menuItems)
  }
}

Program.prototype.clearSelectedNodes = function() {
  this.selectedNodes = []
}

Program.prototype.clearSelectedEdges = function() {
  this.selectedEdges = []
}

Program.prototype.lockForModeChanges = function() {
  this.lockedForChanges = true
}

Program.prototype.unlockForModeChanges = function() {
  this.lockedForChanges = false
}