import * as style from "../graph/styles/styles.js"

export default function GeneticAlgo() {
  this.logAll = false
  this.rMutation = .1
  this.rCrossover = .8
  this.sPopulation = 100
  this.nGenerations = 50
  this.nPairs = 40
  this.nSelected = 20
  this.population = null
  this.atualGeneration = 1
}

GeneticAlgo.prototype.process = function(program, graph, events) {
  let paired = []
  let mutated = []
  let selected = []
  let evaluated = []
  let newPopulation = []
  let time = 0

  if (this.atualGeneration === 1)
    this.population = createFirstGeneration(graph, this.sPopulation)

  if (this.logAll) {
    console.groupCollapsed('creation')
    logPopulation(graph, this.population)
    console.groupEnd()
  }
  
  for (let i = 0; i < this.nGenerations; i++) {
    evaluated = evaluatedPopulation(graph, this.population)
    selected = elitism(evaluated, this.nSelected)
    paired = pairChromosomes(selected, this.nPairs)
    newPopulation = copyArray(pmx(paired, this.rCrossover))
    mutated = mutation(newPopulation, this.rMutation)

    if (this.logAll) {
      console.groupCollapsed('generation', this.atualGeneration)
      
      console.groupCollapsed('evaluation')
      logPopulation(graph, evaluated)
      console.groupEnd()

      console.groupCollapsed('selection')
      logPopulation(graph, selected)
      console.groupEnd()

      console.groupCollapsed('pairing')
      logPairs(graph, paired)
      console.groupEnd()

      console.groupCollapsed('crossover')
      logPopulation(graph, newPopulation)
      console.groupEnd()

      console.groupCollapsed('mutation')
      logPopulation(graph, mutated)
      console.groupEnd()
      
      console.groupEnd()
    }

    this.population = [...selected, ...mutated]

    let index = 0
    const edges = []
    const nodes = evaluatedPopulation(graph, this.population)[0]
    for (index; index < nodes.length - 1; index++) {
      const edge = graph.getEdgeBetween(nodes[index], nodes[index + 1])
      if (edge !== undefined)
        edges.push(edge)
    }
    const edge = graph.getEdgeBetween(nodes[index], nodes[0])
    if (edge !== undefined)
      edges.push(edge)
    
    events.callObjectsStyleChangeEvent(style.getTransparentNodeStyle(), time, ...graph.nodes)
    events.callObjectsStyleChangeEvent(style.getTransparentEdgeStyle(), time, ...graph.edges)
    events.callObjectsStyleChangeEvent(style.getProcessingNodeStyle(), time, ...nodes)
    events.callObjectsStyleChangeEvent(style.getProcessingEdgeStyle(), time, ...edges)

    paired = []
    mutated = []
    selected = []
    evaluated = []
    newPopulation = []

    time += 50
    this.atualGeneration++
  }

  let index = 0
  const edges = []
  const nodes = evaluatedPopulation(graph, this.population)[0]
  for (index; index < nodes.length - 1; index++) {
    const edge = graph.getEdgeBetween(nodes[index], nodes[index + 1])
    if (edge !== undefined)
      edges.push(edge)
  }
  const edge = graph.getEdgeBetween(nodes[index], nodes[0])
  if (edge !== undefined)
    edges.push(edge)
  
  events.callObjectsStyleChangeEvent(style.getInvalidNodeStyle(), time, ...graph.nodes)
  events.callObjectsStyleChangeEvent(style.getInvalidEdgeStyle(), time, ...graph.edges)
  events.callObjectsStyleChangeEvent(style.getValidNodeStyle(), time, ...nodes)
  events.callObjectsStyleChangeEvent(style.getValidEdgeStyle(), time, ...edges)

  console.groupCollapsed('final', this.atualGeneration)
  logPopulation(graph, evaluatedPopulation(graph, this.population))
  console.groupEnd()

  program.clearSelectedNodes()
  program.clearSelectedEdges()
  program.keyboard.buffer.push(76)
  program.changeMode()
}

GeneticAlgo.prototype.changeMutationRate = function(rate) {
  this.rMutation = rate
}

GeneticAlgo.prototype.changeCrossoverRate = function(rate) {
  this.rCrossover = rate
}

GeneticAlgo.prototype.changeGenerationsNumber = function(number) {
  this.nGenerations = number
}

GeneticAlgo.prototype.setLogAll = function(all) {
  this.logAll = all
}

function copyArray(arr) {
  const newArr = []
  for (let i = 0; i < arr.length; i++)
    newArr.push(arr[i])
  return newArr
}

function shuffle(array) {
  const toShuffle = copyArray(array)
  for (let i = toShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = toShuffle[i]
    toShuffle[i] = toShuffle[j]
    toShuffle[j] = temp
  }
  return toShuffle
}

function createFirstGeneration(graph, number) {
  const population = []
  for (let i = 0; i < number; i++)
    population.push(shuffle(graph.nodes))
  return population
}

function fitness(graph, chromosome) {
  let index
  let value = 0
  for (index = 0; index < chromosome.length - 1; index++) {
    const edge = graph.getEdgeBetween(chromosome[index], chromosome[index + 1])
    value += (edge !== undefined) ? edge.value : 10000
  }
  const edge = graph.getEdgeBetween(chromosome[index], chromosome[0])
  value += (edge !== undefined) ? edge.value : 10000
  return value
}

function evaluatedPopulation(graph, population) {
  let toEval = copyArray(population)
  return toEval.sort((a, b) => fitness(graph, a) - fitness(graph, b))
}

function elitism(evaluated, preserve = 0) {
  const toPreserve = copyArray(evaluated)
  return toPreserve.slice(0, preserve)
}

function pairChromosomes(selected, nPairs) {
  let pair = []
  const pairs = []
  for (let i = 0; i < nPairs; i++) {
    while (pair.length < 2) {
      const index = Math.floor(Math.random() * selected.length)
      if (!pair.includes(selected[index]))
        pair.push(selected[index])
    }
    pairs.push(pair)
    pair = []
  }
  return pairs
}

function pmx(pairs, chance) {
  const newPopulation = []
  for (let pair of pairs) {
    if (Math.random() <= chance) {
      const A = Array.from(pair[0])
      const B = Array.from(pair[1])
      const index = Math.floor(A.length / 3)
      const middleA = A.splice(index, index)
      const middleB = B.splice(index, index)
      const bkpA = Array.from(A) // todos os elementos
      const bkpB = Array.from(B) // todos os elementos
      
      const s1 = [] // middleB
      for (let i = 0; i < A.length; i++)
        if (middleB.indexOf(A[i]) !== -1)
          A[i] = null
      
      const s2 = [] // middleA
      for (let i = 0; i < B.length; i++)
        if (middleA.indexOf(B[i]) !== -1)
          B[i] = null
      
      for (let i = 0, j = 0; i < A.length; i++) {
        if (A[i] === null) {
          while (j < bkpB.length) {
            if (A.indexOf(bkpB[j]) === -1) {
              A[i] = bkpB[j]
              j++
              break
            }
            j++
          }
        }
      }

      for (let i = 0, j = 0; i < B.length; i++) {
        if (B[i] === null) {
          while (j < bkpA.length) {
            if (B.indexOf(bkpA[j]) === -1) {
              B[i] = bkpA[j]
              j++
              break
            }
            j++
          }
        }
      }
      
      A.splice(index, 0, ...middleB)
      B.splice(index, 0, ...middleA)
      newPopulation.push(A, B)
    } else {
      newPopulation.push(pair[0], pair[1])
    }
  }
  return newPopulation
}

function mutation(population, rate) {
  const mutated = copyArray(population)
  for (let chromosome of mutated) {
    if (Math.random() <= rate) {
      let indexA = Math.floor(Math.random() * chromosome.length)
      let indexB = Math.floor(Math.random() * chromosome.length)
      while (indexA === indexB) 
        indexB = Math.floor(Math.random() * chromosome.length)
      const swap = chromosome.slice(indexA, indexA + 1)[0]
      chromosome.splice(indexA, 1, chromosome.slice(indexB, indexB + 1)[0])
      chromosome.splice(indexB, 1, swap)
    }
  }
  return mutated
}

function logPopulation(graph, population) {
  console.groupCollapsed(`pop log (${population.length})`)
  population.forEach(c => console.log(c, fitness(graph, c)))
  console.groupEnd()
}

function logPairs(graph, pairs) {
  console.groupCollapsed(`pairs log (${pairs.length})`)
  pairs.forEach(p => console.log(p[0], fitness(graph, p[0]), p[1], fitness(graph, p[1])))
  console.groupEnd()
}
