/* eslint-disable no-undef */
const handler = require('./getPlayerId')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}

jest.mock('../../../utils', () => {
  return {
    authorizePlayer: () => {
      return Promise.resolve({
        username: 'user',
        id: 0
      })
    }
  }
})

jest.spyOn(resMock, 'status')
afterEach(() => {
  jest.clearAllMocks()
})

describe('Get player ID', () => {
  test('Get player ID should return player ID', async () => {
    const appMock = {
      config: {
        serverVersion: '1.0.0',
        publicIP: '127.0.0.1'
      }
    }
    await handler.handler(appMock, {
      query: {},
      body: {
        LELOGIN: 'user',
        LEPASS: 'test',
        LAMAC: '0:0:0:0'
      }
    }, resMock, jest.fn())
    expect(resMock.send).toBeCalledWith({
      ID_PLAYER: 0
    })
    expect(resMock.status).toBeCalledWith(200)
  })
})
