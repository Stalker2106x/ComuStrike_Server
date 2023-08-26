/* eslint-disable no-undef */
const handler = require('./quitServer')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}
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
      }]
    }
    const reqMock = {
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
