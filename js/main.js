import Graph from './graph/graph.js'
import Mouse from './inputs/mouse.js'
import Keyboard from './inputs/keyboard.js'
import Events from './environment/events.js'
import Program from './environment/program.js'
import * as visual from './environment/visual.js'

import { getSimpleGraph } from '../data/mocks.js'

new p5(p5 => {
  let canvas = null
  let graph = null
  const events = new Events()
  const program = new Program(new Mouse(p5), new Keyboard())

  p5.setup = () => {
    canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    canvas.style('z-index: -1')
    canvas.position(0, 0)
    program.keyboard.saveKeyCode(76)
    program.changeMode()
    graph = getSimpleGraph()
  }

  p5.draw = () => {
    p5.background(p5.color('#D9D9D9'))
    visual.drawBoard(p5)
    visual.drawMousePosition(p5)
    events.process()
    graph.draw(p5)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

  p5.mousePressed = () => {
    program.mouse.save()
    program.saveSelectedObjects(graph)
    program.modeObj.onMousePressed(program, graph, events)
  }

  p5.mouseDragged = () => {
    program.mouse.save()
    program.modeObj.onMouseDragged(program, graph, events)
  }

  p5.mouseReleased = () => {
    program.modeObj.onMouseReleased(program, graph, events)
  }

  p5.keyPressed = () => {
    program.keyboard.saveKeyCode(p5.keyCode)
    if (!program.lockedForChanges) {
      program.changeMode()
      program.modeObj.onModeChange(program, graph, events)
    }
  }
}, document.getElementById('canvasBox'))
