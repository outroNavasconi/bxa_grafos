class Node {
	
	constructor(id, pos, nodePrototype) {
		this.id = id
		this.pos = pos
		this.nodePrototype = nodePrototype
	}

	changePosition(x, y) {
		this.pos.set(x, y)
	}

  changePrototype(newPrototype) {
    this.nodePrototype = newPrototype
  }

	draw() {
		this.drawNode()
		this.drawLegends()
	}

	drawNode() {
		fill(this.nodePrototype.nodeColor)
		stroke(this.nodePrototype.strokeColor)
		strokeWeight(this.nodePrototype.strokeSize)
		circle(this.pos.x, this.pos.y, this.nodePrototype.size)
	}

	drawLegends() {
		strokeWeight(this.nodePrototype.fontStrokeSize)
		stroke(this.nodePrototype.fontStroke)
		fill(this.nodePrototype.fontColor)
		textSize(this.nodePrototype.fontSize)
		textAlign(this.nodePrototype.fontAlign)
		text(this.id, this.pos.x, this.pos.y + 3)
	}
}
		
