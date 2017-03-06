const { equal } = require('assert')

const simpleTypewriter = require('..')

test('simple-typewriter', () => {
  test('sets `innerHTML` attribute', done => {
    const element = { innerHTML: '' }
    const stop = simpleTypewriter('test', element, {interval: 100})

    currentInterval = 0
    equal('t', element.innerHTML)
    setTimeout(() => equal('te', element.innerHTML), interval())
    setTimeout(() => equal('tes', element.innerHTML), interval())
    setTimeout(() => equal('test', element.innerHTML), interval())
    setTimeout(() => equal('test', element.innerHTML), interval())
    setTimeout(() => stop(), interval())
    setTimeout(() => done(), interval())
  })

  test('next-text options', done => {
    const element = { innerHTML: '' }
    const stop = simpleTypewriter('test', element, {interval: 100, nextText: {restart: true}})

    currentInterval = 0
    equal('t', element.innerHTML)
    setTimeout(() => equal('te', element.innerHTML), interval())
    setTimeout(() => equal('tes', element.innerHTML), interval())
    setTimeout(() => equal('test', element.innerHTML), interval())
    setTimeout(() => equal('', element.innerHTML), interval())
    setTimeout(() => equal('t', element.innerHTML), interval())
    setTimeout(() => equal('te', element.innerHTML), interval())
    setTimeout(() => equal('tes', element.innerHTML), interval())
    setTimeout(() => equal('test', element.innerHTML), interval())
    setTimeout(() => stop(), interval())
    setTimeout(() => done(), interval())
  })
})

var currentInterval = 0
function interval () {
  currentInterval += 100 + 10
  return currentInterval
}
