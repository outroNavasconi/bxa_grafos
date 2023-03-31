const mouse = new Mouse()
const mode = new Mode(getAvaliableModes())
const global = new Global(document.querySelectorAll(".func"))

function setup() {
	mode.changeModeOfGlobal(global, 'F')
	const canvas = createCanvas(400, 400)
	canvas.parent(document.getElementById('canvasConteiner'))
}

function draw() {
	background(200)
	mode.onUpdate(global)
	global.drawAllObjects()
}

function mousePressed() {
	mouse.registerMouseClick()
	mouse.registerInGlobalIfWasOverNode(global)
  mouse.registerInGlobalIfWasOverConnection(global)
	mode.onClick(global, mouse.click)
	mode.afterClick(global)
}

function keyPressed() {
	mode.changeModeOfGlobal(global, key)
	mode.onKeyPressed(global, keyCode)
	mode.onChange(global)
}

function mouseDragged() {
	mode.onMouseDragged(global)
}

function mouseReleased() {
	mode.onMouseReleased(global)
}