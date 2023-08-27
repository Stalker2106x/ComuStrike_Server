/* eslint-disable no-undef */
const handler = require('./addScore')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}

jest.mock('../../utils', () => {
  return {
    authorizePlayer: () => {
      return {
        update: (updated) => Promise.resolve(updated)
      }
    }
  }
})

jest.spyOn(resMock, 'status')
afterEach(() => {
  jest.clearAllMocks()
})

describe('Add score', () => {
  test('Add score should work', async () => {
    await handler.handler({}, {
      body: {
        LENUM: '0',
        LEPASS: 'test',
        LESCORE: '10',
        LAPARTIE: '0',
        KILLER: '10',
        KILLED: '10'
      }
    }, resMock, jest.fn())
    expect(resMock.status).toBeCalledWith(200)
    expect(resMock.send).toBeCalledWith()
  })
})