export default function Keyboard() {
  this.buffer = []
}

Keyboard.prototype.saveKeyCode = function(keyCode) {
  this.buffer.push(keyCode)
}

Keyboard.prototype.flush = function() {
  this.buffer = []
}

Keyboard.prototype.nextNum = function() {
  const index = this.buffer.findIndex(code => code >= 48 && code <= 57)
  if (index !== -1) {
    this.buffer.splice(0, index)
    return +String.fromCodePoint(this.buffer.shift())
  }
  return null
}

Keyboard.prototype.nextChar = function() {
  const index = this.buffer.findIndex(code => code >= 65 && code <= 87)
  if (index !== -1) {
    this.buffer.splice(0, index)
    return String.fromCodePoint(this.buffer.shift())
  }
  return null
}

Keyboard.prototype.nextIsEnter = function() {
  return this.buffer[0] === ENTER
}