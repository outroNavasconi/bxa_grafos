export default function Edge(id, aNode, bNode, style, oriented = false) {
  this.id = id
  this.value = 0
  this.aNode = aNode
  this.bNode = bNode
  this.style = style
  this.oriented = oriented
}

Edge.prototype.getNodeConnectedTo = function(node) {
  return this.aNode.isEqualTo(node) ? this.bNode : this.aNode
}

Edge.prototype.containsNode = function(node) {
  return this.aNode.isEqualTo(node) || this.bNode.isEqualTo(node)
}

Edge.prototype.canGoFromTo = function(from, to) {
  if (this.oriented)
    if (this.aNode.isEqualTo(from) && this.bNode.isEqualTo(to))
      return true
    else
      return false
  return true
}

Edge.prototype.setValue = function(value) {
  this.value = value
}

Edge.prototype.isEqualTo = function(edge) {
  return this.id === edge.id
}

Edge.prototype.getNodes = function() {
  return [this.aNode, this.bNode]
}

Edge.prototype.setStyle = function(style) {
  this.style = style
}

Edge.prototype.draw = function(p5) {
  const start = p5.createVector(this.aNode.x, this.aNode.y)
  const end = p5.createVector(this.bNode.x, this.bNode.y)
  if (this.oriented) {
    const vector = p5.createVector(start.x, start.y)
    vector = vector.sub(end)
    p5.push()
    p5.fill(p5.color(this.style.connectionColor))
    p5.stroke(p5.color(this.style.connectionColor))
    p5.strokeWeight(this.style.strokeSize)
    p5.translate(start.x, start.y)
    p5.line(0, 0, vector.x, vector.y)
    p5.rotate(vector.heading())
    const arrowSize = this.style.arrowSize
    p5.translate(vector.mag() - (arrowSize + this.style.arrowDist), 0)
    p5.triangle(0, arrowSize/2, 0, -arrowSize/2, arrowSize, 0)
    p5.pop()
  } else {
    p5.push()
    p5.stroke(p5.color(this.style.connectionColor))
    p5.strokeWeight(this.style.strokeSize)
    p5.line(start.x, start.y, end.x, end.y)
    p5.pop()
  }
  const txt = this.value !== 0 ? `${this.id}, ${this.value}` : `${this.id}`
  const pos = start.lerp(end, 0.5)
  p5.push()
  p5.textFont(this.style.fontType)
  p5.textAlign(this.style.fontAlign)
  p5.textSize(this.style.fontSize)
  p5.stroke(p5.color(this.style.fontStroke))
  p5.strokeWeight(this.style.fontStrokeSize)
  p5.fill(p5.color(this.style.fontColor))
  p5.text(txt, pos.x, pos.y)
  p5.pop()
}
