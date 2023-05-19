function getNodePrototype() {
	return {
		size: 20,
		fontSize: 12,
		strokeSize: 2,
		fontAlign: CENTER,
		fontStrokeSize: 0,
		fontType: 'Nunito',
		fontColor: color(0, 0, 0),
		fontStroke: color('rgba(0, 0, 0, 1)'),
		nodeColor: color(80, 140, 93),	
		strokeColor: color(80, 140, 93)
	}
}

function getRandomNodePrototype() {
	const r = Math.floor(random(0, 255))
	const g = Math.floor(random(0, 255))
	const b = Math.floor(random(0, 255))
	const proto = getNodePrototype()
	proto.nodeColor = color(r, g, b)
	proto.strokeColor = color(r, g, b)
	return proto
}

function getValidNodePrototype() {
	const proto = getNodePrototype()
	proto.fontColor = color(255, 255, 255)
	proto.nodeColor = color(54, 72, 158)
	proto.strokeColor = color(54, 72, 158)
	return proto
}

function getInvalidNodePrototype() {
	const proto = getNodePrototype()
	proto.fontColor = color(255, 255, 255)
	proto.nodeColor = color(169, 58, 58)
	proto.strokeColor = color(169, 58, 58)
	return proto
}

function getConnectionPrototype() {
	return {
		fontSize: 14,
		arrowSize: 4,
		arrowDist: 12,
		strokeSize: 2,
		fontAlign: CENTER,
		fontType: 'Nunito',
		fontStrokeSize: 0,
		fontColor: color(0, 0, 0),
		fontStroke: color('rgba(0, 0, 0, 1)'),
		connectionColor: color(80, 140, 93),
	}
}

function getValidConnectionPrototype() {
	const proto = getConnectionPrototype()
	proto.fontStrokeSize = 1
	proto.fontColor = color(255, 255, 255)
	proto.fontStroke = color(54, 72, 158)
	proto.connectionColor = color(54, 72, 158)
	return proto
}

function getInvalidConnectionPrototype() {
	const proto = getConnectionPrototype()
	proto.fontStrokeSize = 1
	proto.fontColor = color(255, 255, 255)
	proto.fontStroke = color(169, 58, 58)
	proto.connectionColor = color(169, 58, 58)
	return proto
}

function getAvaliableModes() {
	return {
		C: { name: 'CREATION', obj: getCreationModePrototype },
		A: { name: 'CONNECTION', obj: getConnectionModePrototype },
		R: { name: 'REMOVE', obj: getRemoveModePrototype },
		O: { name: 'ORIENTED', obj: getConnectionOrientedModePrototype },
		F: { name: 'FREE', obj: getFreeModePrototype },
		E: { name: 'WEIGTH', obj: getEditWeigthModePrototype },
		X: { name: 'RESET', obj: getResetModePrototype },
		L: { name: 'BFS', obj: getBfsModePrototype },
		P: { name: 'DFS', obj: getDfsModePrototype },
		Y: { name: 'ROY', obj: getRoyModePrototype },
		M: { name: 'PRM', obj: getPrimModePrototype },
		N: { name: 'PLANAR', obj: getPlanModePrototype },
		W: { name: 'WELSH-POWELL', obj: getWelshPowellModePrototype },
		D: { name: 'INFO', obj: getEditNodeInfoModePrototype },
		S: { name: 'APATH', obj: getAPathfindingModePrototype }
	}
}

function getModePrototype() {
	return {
		internObj: null,
		onChange: (global) => {},
		beforeClick: (global) => {},
		onClick: (global, click) => {},
		afterClick: (global) => {},
		onUpdate: (global) => {},
		onKeyPressed: (global) => {},
		onMouseDragged: (global) => {},
		onMouseReleased: (global) => {}
	}
}

function getCreationModePrototype() {
	const proto = getModePrototype()
	proto.onClick = (global, click) => {
		if (global.selectedNodes.length === 0)
		global.nodes.push(new Node(global.getNextIdForNode(), click, getNodePrototype()))
	}
	proto.afterClick = (global) => global.selectedNodes = []
	return proto
}

function getConnectionModePrototype() {
	const proto = getModePrototype()
	proto.onClick = (global, click) => {
		if (global.selectedNodes.length === 2) {
			const start = global.selectedNodes[0]
			const end = global.selectedNodes[1]
			const con = new Connection(global.getNextIdForConnection(), start, end, getConnectionPrototype(), false)
			global.connections.push(con)
		}
	}
	proto.afterClick = (global) => {
		if (global.selectedNodes.length === 2)
		global.selectedNodes = []
	}
	return proto
}

function getRemoveModePrototype() {
	const proto = getModePrototype()
	proto.onChange = (global) => {
		global.selectedNodes = []
		global.selectedConnection = null
	}
	proto.onClick = (global, click) => {
		if (global.selectedNodes.length === 1)
			removeNodeAndConnections(global, global.selectedNodes[0])
		else if (global.selectedConnection !== null)
			removeConnection(global, global.selectedConnection)
	}
	proto.afterClick = (global) => {
		if (global.selectedNodes.length === 1)
			global.selectedNodes = []
		else if (global.selectedConnection !== null)
			global.selectedConnection = null
	}
	return proto
}

function getConnectionOrientedModePrototype() {
	const proto = getModePrototype()
	proto.onClick = (global, click) => {
		if (global.selectedNodes.length === 2) {
			const start = global.selectedNodes[0]
			const end = global.selectedNodes[1]
			const con = new Connection(global.getNextIdForConnection(), start, end, getConnectionPrototype(), true)
			global.connections.push(con)
		}
	}
	proto.afterClick = (global) => {
		if (global.selectedNodes.length === 2)
		global.selectedNodes = []
	}
	return proto
}

function getFreeModePrototype() {
	const proto = getModePrototype()
	proto.onChange = (global) => {
		global.selectedNodes = []
		global.selectedConnection = null
	}
	proto.onMouseDragged = (global) => {
		if (global.selectedNodes.length === 1)
			global.selectedNodes[0].changePosition(mouseX, mouseY)
	}
	proto.onMouseReleased = (global) => {
		global.selectedNodes = []
	}
	return proto
}

function getEditWeigthModePrototype() {
	const proto = getModePrototype()
	proto.onChange = (global) => { 
		if (global.lastMode !== global.modeName) {
			global.bufferText = ''
			global.selectedConnection = null
			global.lastMode = global.modeName
		}
	}
	proto.onUpdate = (global) => {
		if (global.selectedConnection !== null) {
			fill(0)
			noStroke()
			textSize(12)
			textAlign(LEFT)
			text("Peso: " + global.bufferText, 20, 380)
		}
	}
	proto.onKeyPressed = (global, keycode) => {
		if (global.selectedConnection !== null) {
			if (keycode === ENTER) {
				if (global.bufferText !== '') {
					global.selectedConnection.editWeigth(global.bufferText)
					global.selectedConnection = null
					global.bufferText = ''
				}
			} else {
				global.bufferText += String.fromCharCode(keycode)
			}
		}
	}
	return proto
}

function getEditNodeInfoModePrototype() {
	const proto = getModePrototype()
	proto.onChange = (global) => {
		if (global.lastMode !== global.modeName) {
			global.bufferText = ''
			global.selectedNodes = []
			global.lastMode = global.modeName

		}
	}
	proto.onUpdate = (global) => {
		if (global.selectedNodes.length === 1) {
			fill(0)
			noStroke()
			textSize(12)
			textAlign(LEFT)
			text("Info: " + global.bufferText, 20, 380)
		}
	}
	proto.onKeyPressed = (global, keycode) => {
		if (global.selectedNodes.length === 1) {
			if (keycode === ENTER) {
				if (global.bufferText !== '') {
					global.selectedNodes[0].info = global.bufferText
					global.selectedNodes = []
					global.bufferText = ''
				}
			} else {
				global.bufferText += key
			}
		}
	}
	return proto
}

function getResetModePrototype() {
	const proto = getModePrototype()
	proto.onChange = (global) => {
		global.selectedNodes = []
		global.selectedConnection = null
		global.nodes.forEach(node => {
			node.changePrototype(getNodePrototype())
		})
		global.connections.forEach(connection => {
			connection.changePrototype(getConnectionPrototype())
		})
	}
	return proto
}

function getBfsModePrototype() {
	const proto = getModePrototype()
	proto.onClick = (global, click) => {
		if (global.selectedNodes.length === 1)
			new BFS().execute(global)
	}
	return proto
}

function getDfsModePrototype() {
	const proto = getModePrototype()
	proto.onClick = (global, click) => {
		if (global.selectedNodes.length === 1)
			new DFS().execute(global, global.selectedNodes[0])
	}
	return proto
}

function getRoyModePrototype() {
	const proto = getModePrototype()
	proto.onClick = (global, click) => {
		if (global.selectedNodes.length === 1)
			new ROY().execute(global)
	}
	return proto
}

function getPrimModePrototype() {
	const proto = getModePrototype()
	proto.onClick = (global, click) => {
		if (global.selectedNodes.length === 1)
			new PRIM().execute(global)
	}
	return proto
}

function getPlanModePrototype() {
	const proto = getModePrototype()
	proto.onChange = (global) => {
		proto.internObj = new PLAN()
		proto.internObj.execute(global)
	},
	proto.onUpdate = (global) => {
		fill(0)
		noStroke()
		textSize(12)
		textAlign(LEFT)
		text(proto.internObj.message, 20, 380)
	}
	return proto
}

function getWelshPowellModePrototype() {
	const proto = getModePrototype()
	proto.onChange = (global) => {
		new WELSHPOWELL().execute(global)
	}
	return proto
}

function getAPathfindingModePrototype() {
	const proto = getModePrototype() 
	proto.onClick = (global, click) => {
		if (global.selectedNodes.length === 2)
			new APATHFINDING(global.selectedNodes[0], global.selectedNodes[1]).with(new LatLon()).execute(global)
	}
	proto.afterClick = (global) => {
		if (global.selectedNodes === 2)
			global.selectedNodes = []
	}
	return proto
}


// colocar dentro do objeto global

function removeNodeAndConnections(global, node) {
	const connectionsToRemove = [] 
	const index = global.nodes.indexOf(node)
	const removedNode = global.nodes.splice(index, 1)[0]
	global.connections.forEach(con => {
		if (con.hasNode(removedNode))
			connectionsToRemove.push(con)
	})
	connectionsToRemove.forEach(con => removeConnection(global, con))
}

function removeConnection(global, connection) {
	const index = global.connections.indexOf(connection)
	global.connections.splice(index, 1)
}