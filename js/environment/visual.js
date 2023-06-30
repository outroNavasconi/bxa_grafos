export function drawBoard(p5) {
  p5.stroke(205)
  const limit = Math.max(p5.width, p5.height)
  for (let i = 0; i <= limit; i += limit / 100) {
    p5.beginShape(p5.LINES)
    p5.vertex(i, 0)
    p5.vertex(i, p5.height)
    p5.vertex(0, i)
    p5.vertex(p5.width, i)  
    p5.endShape()
  }
}

export function drawMousePosition(p5) {
  p5.fill(110)
  p5.noStroke()
  p5.text(`[${Math.floor(p5.mouseX)}, ${Math.floor(p5.mouseY)}]`, 10, p5.windowHeight - 10)
}