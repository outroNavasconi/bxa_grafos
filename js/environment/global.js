class Global {

	constructor(elements) {
		this.nodes = []
		this.idNode = 0
		this.lastMode = ''
		this.modeName = 'FREE'
		this.weigthValue = ''
		this.connections = []
		this.idConnection = 0
		this.selectedNodes = []
		this.elements = elements
		this.isEditingWeigth = false
		this.selectedConnection = null
	}

	getNextIdForNode() {
		const alphabet = 'ABCDEFGHIJKLMNOPQRSTVUXYZW'
		const times = Math.floor(this.idNode / alphabet.length) + 1
		const id = alphabet[this.idNode % alphabet.length].repeat(times)
		this.idNode++
		return id
	}

	getNextIdForConnection() {
		const alphabet = 'abcdefghijklmnopqrstvuxyzw'
		const times = Math.floor(this.idConnection / alphabet.length) + 1
		const id = alphabet[this.idConnection % alphabet.length].repeat(times)
		this.idConnection++
		return id
	}

	drawAllObjects() {
		this.connections.forEach(connection => connection.draw())
		this.nodes.forEach(node => node.draw())
	}

	getSuccessorsOf(node) {
		const connectionsOfNode = []
		this.connections.forEach(con => {
			if (con.hasNode(node)) {
				if (con.isOriented && con.startFromNode(node))
					connectionsOfNode.push(con.getOtherNodeOfConnextion(node))
				else if (!con.isOriented)
					connectionsOfNode.push(con.getOtherNodeOfConnextion(node))
			}
		})
		return connectionsOfNode
	}

	getPredecessorsOf(node) {
		const connectionsOfNode = []
		this.connections.forEach(con => {
			if (con.hasNode(node)) {
				if (con.isOriented && con.endsWithNode(node))
					connectionsOfNode.push(con.getOtherNodeOfConnextion(node))
				else if (!con.isOriented)
					connectionsOfNode.push(con.getOtherNodeOfConnextion(node))
			}
		})
		return connectionsOfNode
	}

	getConnectionBetweenNodes(nodeA, nodeB) {
		for (let connection of this.connections)
			if (connection.hasNode(nodeA) && connection.hasNode(nodeB))
				return connection
		return null
	}

	getConnectionsOf(node) {
		const cons = []
		for (let connection of this.connections) 
			if (connection.hasNode(node))
				cons.push(connection)
		return cons
	}

	clearSelectedElements() {
		for (let element of this.elements) {
			if (element.classList.contains("selected")) {
				element.classList.remove("selected")
				break
			}
		}
	}

	addClassToSelectedElement() {
		for (let element of this.elements) {
			if (element.id === this.modeName) {
				element.classList.add("selected")
				break
			}
		}
	}
}

