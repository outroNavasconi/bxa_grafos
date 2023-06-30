export default function Node(id, x, y, style) {
  this.x = x
  this.y = y
  this.id = id
  this.edges = []
  this.style = style
}

Node.prototype.addEdge = function(edge) {
  this.edges.push(edge)
}

Node.prototype.removeEdge = function(edge) {
  const index = this.edges.findIndex(e => e.isEqualTo(edge))
  if (index !== -1)
    this.edges.splice(index, 1)
}

Node.prototype.isEqualTo = function(node) {
  return this.id === node.id
}

Node.prototype.changePosition = function(x, y) {
  this.x = x
  this.y = y
}

Node.prototype.setStyle = function(style) {
  this.style = style
}

Node.prototype.draw = function(p5) {
  p5.push()
  p5.textAlign(p5.CENTER)
  p5.fill(p5.color(this.style.nodeColor))
  p5.stroke(p5.color(this.style.strokeColor))
  p5.strokeWeight(this.style.strokeSize)
  p5.circle(this.x, this.y, this.style.size)
  p5.fill(p5.color(this.style.fontColor))
  p5.stroke(p5.color(this.style.fontStroke))
  p5.textSize(this.style.fontSize)
  p5.textFont(this.style.fontType)
  p5.strokeWeight(this.style.fontStrokeSize)
  p5.text(this.id, this.x, this.y + 3)
  p5.pop()
}
