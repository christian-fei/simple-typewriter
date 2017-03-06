var nextText = require('next-text')

module.exports = function simpleTypewriter (text, element, options) {
  options = options || {interval: 1000, nextText: {}}
  var state = {}
  return nextPlaceholderFor(element, text, options, state)
}

function nextPlaceholderFor (element, text, options, state) {
  var nextTextOptions = options.nextText || {}
  var isInputElement = element.constructor.name === 'HTMLInputElement'
  var currentPlaceholder = isInputElement ? element.getAttribute('placeholder') : element.innerHTML
  var nextPlaceholder = nextText(text, nextTextOptions, currentPlaceholder).next()

  state.timer = setTimeout(function () {
    if (isInputElement) {
      element.setAttribute('placeholder', nextPlaceholder.toString())
    } else {
      element.innerHTML = nextPlaceholder.toString()
    }
    nextPlaceholderFor(element, text, options, state)
  }, options.interval)

  return function () { return clearTimeout(state.timer) }
}
