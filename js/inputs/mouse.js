export default function Mouse(p5) {
  this.x = null
  this.y = null
  this.p5 = p5
}

Mouse.prototype.save = function() {
  this.x = this.p5.mouseX
  this.y = this.p5.mouseY
}

Mouse.prototype.get = function() {
  const x = this.x
  const y = this.y
  this.x = this.y = null
  return {x: x, y: y}
}

Mouse.prototype.getAtual = function() {
  return { x: this.p5.mouseX, y: this.p5.mouseY }
}