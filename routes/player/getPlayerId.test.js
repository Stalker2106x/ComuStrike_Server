/* eslint-disable no-undef */
const handler = require('./getPlayerId')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}
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
      },
      db: {
        models: {
          Players: {
            findOne: () => Promise.resolve({
              username: 'user',
              player_id: 0
            })
          }
        }
      }
    }
    await handler.handler(appMock, {
      body: {
        LENUM: '0',
        LEPASS: 'test',
        LAMAC: '0:0:0:0'
      }
    }, resMock, jest.fn())
    expect(resMock.status).toBeCalledWith(200)
    expect(resMock.send).toBeCalledWith({
      ID_PLAYER: 0
    })
  })
})
