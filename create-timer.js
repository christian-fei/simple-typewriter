module.exports = function createTimer (timeoutHandle) {
  return {
    start: start,
    stop: stop
  }

  function start (callbackFn, timeout) {
    timeoutHandle = setTimeout(callbackFn, timeout)
    return createTimer(timeoutHandle)
  }
  function stop () {
    clearTimeout(timeoutHandle)
  }
}
