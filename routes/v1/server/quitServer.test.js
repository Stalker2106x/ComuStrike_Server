/* eslint-disable no-undef */
const handler = require('./quitServer')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}

jest.mock('../../../utils', () => {
  return {
    authorizePlayer: () => {
      return Promise.resolve({
        username: 'user',
        model: 'agtx',
        mp3: 0,
        role: 0,
        active: 1,
        score: 10,
        player_id: 0
      })
    },
    logger: () => {}
  }
})

jest.spyOn(resMock, 'status')
afterEach(() => {
  jest.clearAllMocks()
})

describe('Quit server', () => {
  test('Quit server should remove player from connected peers', async () => {
    const appMock = {
      serverList: [{
        serverId: 0,
        name: 'test',
        version: '170',
        host: '127.0.0.1',
        owner: 0,
        level: 'tunisia',
        description: 'desc',
        slots: 5,
        tournamentId: 0,
        private: false,
        weapons: '****************************',
        md5: 'checksum',
        connectedPeers: [0]
      }],
      db: {
        models: {
          Players: {
            findOne: () => Promise.resolve({})
          }
        }
      }
    }
    const reqMock = {
      query: {},
      body: {
        LENUM: '0',
        LEPASS: 'test',
        LESCORE: '0',
        LAPARTIE: '0',
        KILLER: '10',
        KILLED: '10'
      }
    }
    await handler.handler(appMock, reqMock, resMock, jest.fn())
    expect(resMock.status).toBeCalledWith(200)
    expect(appMock.serverList[0].connectedPeers).toStrictEqual([])
  })
})
