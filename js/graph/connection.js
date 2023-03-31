class Connection {

  constructor(id, start, end, connectionPrototype, isOriented) {
    this.id = id
    this.end = end
    this.start = start
    this.weigth = null
    this.isOriented = isOriented
    this.connectionPrototype = connectionPrototype
  }

  hasNode(node) {
    if (this.start === node || this.end === node)
      return true
    return false
  }

  startFromNode(node) {
    return this.start === node
  }

  endsWithNode(node) {
    return this.end === node
  }

  getOtherNodeOfConnextion(node) {
    if (this.start === node)
      return this.end
    else if (this.end === node)
      return this.start
  }

  checkIfVectorIsOnLine(vector) {
    const dividendA = (this.end.pos.x - this.start.pos.x) * (this.start.pos.y - vector.y)
    const dividendB = (this.start.pos.x - vector.x) * (this.end.pos.y - this.start.pos.y)
    const dividendAB = Math.abs(dividendA - dividendB)
    const divisor = this.start.pos.dist(this.end.pos)
    return dividendAB / divisor <= 3 ? true : false
  }

  changePrototype(newPrototype) {
    this.connectionPrototype = newPrototype
  }

  editWeigth(value) {
    this.weigth = value
  }

  draw() {
    if (this.isOriented)
      this.drawArc()
    else 
      this.drawEdge()
    this.drawLegends()
  }

  drawArc() {
    const vector = p5.Vector.sub(this.end.pos, this.start.pos)
    push()
    fill(this.connectionPrototype.connectionColor)
    stroke(this.connectionPrototype.connectionColor)
    strokeWeight(this.connectionPrototype.strokeSize)
    translate(this.start.pos.x, this.start.pos.y)
    line(0, 0, vector.x, vector.y)
    rotate(vector.heading())
    const arrowSize = this.connectionPrototype.arrowSize
    translate(vector.mag() - (arrowSize + this.connectionPrototype.arrowDist), 0)
    triangle(0, arrowSize/2, 0, -arrowSize/2, arrowSize, 0)
    pop()
  }

  drawEdge() {
    stroke(this.connectionPrototype.connectionColor)
    strokeWeight(this.connectionPrototype.strokeSize)
    line(this.start.pos.x, this.start.pos.y, this.end.pos.x, this.end.pos.y)
  }

  drawLegends() {
    const txt = this.weigth !== null ? `${this.id}, ${this.weigth}` : `${this.id}`
    const pos = p5.Vector.lerp(this.start.pos, this.end.pos, 0.5)
    textFont(this.connectionPrototype.fontType)
		textAlign(this.connectionPrototype.fontAlign)
		textSize(this.connectionPrototype.fontSize)
    stroke(this.connectionPrototype.fontStroke)
    strokeWeight(this.connectionPrototype.fontStrokeSize)
    fill(this.connectionPrototype.fontColor)
    text(txt, pos.x, pos.y)
  }
}