import Node from './node.js'
import Edge from './edge.js'

export default function Graph() {
  this.nodes = []
  this.edges = []
  this.nodeIdCounter = 0
  this.edgeidCounter = 0
  this.alphabet = 'abcdefghijklmnoprstvuwxyz'
}

Graph.prototype.searchNode = function(id) {
  return this.nodes.find(node => node.id === id)
}

Graph.prototype.searchEdge = function(id) {
  return this.edges.find(edge => edge.id === id)
}

Graph.prototype.addNode = function(x, y, style) {
  const times = Math.floor(this.nodeIdCounter / this.alphabet.length) + 1
  const id = this.alphabet[this.nodeIdCounter % this.alphabet.length]
  const node = new Node(id.repeat(times).toUpperCase(), x, y, style)
  this.nodes.push(node)
  this.nodeIdCounter++
  return node
}

Graph.prototype.connect = function(aNode, bNode, style, oriented = false) {
  const times = Math.floor(this.edgeidCounter / this.alphabet.length) + 1
  const id = this.alphabet[this.edgeidCounter % this.alphabet.length]
  const edge = new Edge(id.repeat(times), aNode, bNode, style, oriented)
  this.edges.push(edge)
  aNode.addEdge(edge)
  bNode.addEdge(edge)
  this.edgeidCounter++
  return edge
}

Graph.prototype.removeNode = function(node) {
  const index = this.nodes.findIndex(n => n.isEqualTo(node))
  this.nodes.splice(index, 1)
  for (const e of [...node.edges])
    this.removeEdge(e)   
}

Graph.prototype.removeEdge = function(edge) {
  const index = this.edges.findIndex(e => e.isEqualTo(edge))
  this.edges.splice(index, 1)
  edge.getNodes().forEach(n => n.removeEdge(edge))
}

Graph.prototype.getSuccessorsOfNode = function(node, depth = 1) {
  let iterations = 0
  let toCheck = [node]
  let newsToCheck = []
  const successors = []
  while (toCheck.length > 0 && iterations < depth) {
    toCheck.forEach(from => {
      from.edges.forEach(e => {
        const to = e.getNodeConnectedTo(from)
        const canGo = e.canGoFromTo(from, to)
        const existInSuccessorsList = successors.includes(to)
        if (canGo && !existInSuccessorsList && to.id !== node.id) {
          successors.push(to)
          newsToCheck.push(to)
        }
      })
    })
    iterations++
    toCheck = newsToCheck
    newsToCheck = []
  }
  return successors
}

Graph.prototype.getPredecessorsOfNode = function(node, depth = 1) {
  let iterations = 0
  let toCheck = [node]
  let newsToCheck = []
  const predecessors = []
  while (toCheck.length > 0 && iterations < depth) {
    toCheck.forEach(from => {
      from.edges.forEach(e => {
        const to = e.getNodeConnectedTo(from)
        const canGo = e.canGoFromTo(to, from)
        const existInSuccessorsList = predecessors.includes(to)
        if (canGo && !existInSuccessorsList && to.id !== node.id) {
          predecessors.push(to)
          newsToCheck.push(to)
        }
      })
    })
    iterations++
    toCheck = newsToCheck
    newsToCheck = []
  }
  return predecessors
}

Graph.prototype.getAdjacentToNode = function(node) {
  const adjacent = []
  node.edges.forEach(e => adjacent.push(e.getNodeConnectedTo(node)))
  return adjacent
}

Graph.prototype.getEdgeBetween = function(aNode, bNode) {
  return aNode.edges.find(e => e.containsNode(bNode))
}

Graph.prototype.draw = function(p5) {
  this.edges.forEach(e => e.draw(p5))
  this.nodes.forEach(n => n.draw(p5))
}