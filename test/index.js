const { equal } = require('assert')

class HTMLInputElement {
  constructor () {
    this.placeholder = ''
  }

  setAttribute (_name, value) {
    this.placeholder = value
  }

  getAttribute (name) {
    return this.placeholder
  }
}

global.HTMLInputElement = HTMLInputElement
const simpleTypewriter = require('..')

const interval = 100

test('simple-typewriter', () => {
  test('sets `innerHTML` attribute', done => {
    const element = { innerHTML: '' }
    const stop = simpleTypewriter('test', element, {interval})

    equal('', element.innerHTML)
    setTimeout(() => equal('t', element.innerHTML), step())
    setTimeout(() => equal('te', element.innerHTML), step())
    setTimeout(() => equal('tes', element.innerHTML), step())
    setTimeout(() => equal('test', element.innerHTML), step())
    setTimeout(() => stop(), step())
    setTimeout(() => done(), step())
  })

  test('next-text options', done => {
    const element = { innerHTML: '' }
    const stop = simpleTypewriter('test', element, {interval, nextText: {restart: true}})

    equal('', element.innerHTML)
    setTimeout(() => equal('t', element.innerHTML), step())
    setTimeout(() => equal('te', element.innerHTML), step())
    setTimeout(() => equal('tes', element.innerHTML), step())
    setTimeout(() => equal('test', element.innerHTML), step())
    setTimeout(() => equal('', element.innerHTML), step())
    setTimeout(() => equal('t', element.innerHTML), step())
    setTimeout(() => equal('te', element.innerHTML), step())
    setTimeout(() => equal('tes', element.innerHTML), step())
    setTimeout(() => equal('test', element.innerHTML), step())
    setTimeout(() => stop(), step())
    setTimeout(() => done(), step())
  })

  test('sets placeholder attribute of input element', done => {
    const element = new HTMLInputElement()
    const stop = simpleTypewriter('test', element, {interval, nextText: {restart: true}})

    equal('', placeholder(element))
    setTimeout(() => { equal('t', placeholder(element)) }, step())
    setTimeout(() => stop(), step())
    setTimeout(() => done(), step())

    function placeholder (element) {
      return element.getAttribute('placeholder')
    }
  })

  beforeEach(reset)
})

var currentInterval = 0
function step () {
  currentInterval += interval + interval * 0.1
  return currentInterval
}

function reset () {
  currentInterval = 0
}
