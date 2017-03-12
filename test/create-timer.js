const { ok } = require('assert')

const createTimer = require('../create-timer')

test('utils', () => {
  test('.createTimer', () => {
    test('starts timer', done => {
      const timer = createTimer()
      timer.start(done, 0)
    })

    test('stops timer', done => {
      const timer = createTimer()
      timer.start(() => {
        ok(false)
      }, 1000)

      setTimeout(() => {
        timer.stop()
        done()
      }, 50)
    })
  })
})
