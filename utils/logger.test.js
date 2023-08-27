/* eslint-disable no-undef */
const handler = require('./logger')

describe('Log Payload', () => {
  test('Payload should be logged without sensitive data', () => {
    jest.spyOn(console, 'log')
    handler.logPayload({ ANY: 'text', LEPASS: 'password' })
    expect(console.log).toBeCalledWith({ ANY: 'text' })
  })
})

describe('Logger', () => {
  test('Logger should fail for unknown service', () => {
    expect(() => {
      handler.logger('unknown', 'Something happened on non-existing service')
    }).toThrow(Error)
  })

  test('Logger should log for game', () => {
    jest.spyOn(console, 'log')
    handler.logger('game', 'Something happened on server')
    expect(console.log).toBeCalled()
  })

  test('Logger should log for chat', () => {
    jest.spyOn(console, 'log')
    handler.logger('chat', 'Something happened on chat')
    expect(console.log).toBeCalled()
  })
})
