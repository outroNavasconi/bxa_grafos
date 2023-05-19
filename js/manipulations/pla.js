class PLAN {

  constructor() {
    this.message = ''
  }

  execute(global) {
    const e3v6 = global.connections.length <= (3 * global.nodes.length) - 6
    const e2v4 = (global.connections.length <= (2 * global.nodes.length) - 4) || this.hasCycleOfLengthThree(global)
    this.message = e3v6 && e2v4 ? 'É planar | É possível planarizar' : 'Não é planar | Não é possível planarizar'
  }

  hasCycleOfLengthThree(global) {
    for (const node of global.nodes) {
      return this.recursiveCheck(global, node, node, null, 0)
    }
  }

  recursiveCheck(global, first, atual, prev, acc) {
    if (acc > 3)
      return false
    if (acc === 3 && atual === first)
      return true
    for (const n of global.nodes)
      if (n !== prev && n !== atual)
        return this.recursiveCheck(global, first, n, atual, ++acc)
  } 
}