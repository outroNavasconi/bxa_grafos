import FreeMode from "./types/free.js"
import GeneticMode from "./types/ag.js"
import RemoveMode from "./types/remove.js"
import CreationMode from "./types/creation.js"
import ConnectionMode from "./types/connect.js"
import SoftResetMode from "./types/softReset.js"

export const avaliableModes = {
  C: { id: 'C', obj: CreationMode },
  L: { id: 'L', obj: FreeMode },
  N: { id: 'N', obj: ConnectionMode },
  R: { id: 'R', obj: RemoveMode },
  G: { id: 'G', obj: GeneticMode },
  S: { id: 'S', obj: SoftResetMode }
}

export function getMenuItems() {
  return document.getElementsByTagName('li')
}

export function clearSelectedClassOfMenuItems(items) {
  items.forEach(item => {
    if (item.classList.contains('selected'))
      item.classList.remove('selected')
  })
}

export function addSelectedClassInMenuItem(id, items) {
  items.forEach(item => {
    if (item.id === id)
      item.classList.add('selected')
  })
}