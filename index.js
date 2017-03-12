var nextText = require('next-text')
var simplestTimer = require('simplest-timer')

module.exports = function simpleTypewriter (text, element, options) {
  options = options || {interval: 1000, nextText: {}}
  return nextPlaceholderFor(element, text, options, simplestTimer())
}

function nextPlaceholderFor (element, text, options, timer) {
  var nextTextOptions = options.nextText || {}
  var isInputElement = element.constructor.name === 'HTMLInputElement'
  var currentPlaceholder = isInputElement ? element.getAttribute('placeholder') : element.innerHTML
  var nextPlaceholder = nextText(text, nextTextOptions, currentPlaceholder).next()

  timer.timeout(function () {
    if (isInputElement) {
      element.setAttribute('placeholder', nextPlaceholder.toString())
    } else {
      element.innerHTML = nextPlaceholder.toString()
    }
    nextPlaceholderFor(element, text, options, timer)
  }, options.interval)

  return function () { return timer.stop() }
}
