var nextText = require('next-text')
var stopped = false

var nextTimeoutHandle = 0

module.exports = function simpleTypewriter (text, element, options) {
  options = options || {interval: 1000, nextText: {}}
  return nextPlaceholderFor(element, text, options)
}

function nextPlaceholderFor (element, text, options) {
  var nextTextOptions = options.nextText || {}
  var currentPlaceholder = element.innerHTML
  var nextPlaceholder = nextText(text, nextTextOptions, currentPlaceholder).next()
  element.innerHTML = nextPlaceholder.toString()

  nextTimeoutHandle = setTimeout(() => {
    nextPlaceholderFor(element, text, options)
  }, options.interval)

  return () => {
    clearTimeout(nextTimeoutHandle)
  }
}

function nextPlaceholderForX (element, text, timeoutHandle, options) {
  var currentPlaceholder = element.innerHTML
  var nextTextOptions = options.nextText || {}
  var nextPlaceholder = nextText(text, nextTextOptions, currentPlaceholder).next()
  if (stopped || nextPlaceholder.toString() == text) {
    console.log('stopping', nextPlaceholder.toString())
    stop(timeoutHandle)
    if (stopped || !nextTextOptions.restart) {
      return {
        stop: () => { stop(timeoutHandle) }
      }
    }
    timeoutHandle = setTimeout(() => {
      nextPlaceholderFor(element, text, timeoutHandle, options)
    }, options.interval)
    return {
      stop: () => { stop(timeoutHandle) }
    }
  }
  timeoutHandle = setTimeout(() => {
    nextPlaceholderFor(element, text, timeoutHandle, options)
  }, options.interval)

  element.innerHTML = nextPlaceholder.toString()

  return {
    stop: () => { stop(timeoutHandle) }
  }
}

function stop (timeoutHandle) {
  stopped = true
  return clearInterval(timeoutHandle)
}
