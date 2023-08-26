/* eslint-disable no-undef */
const handler = require('./joinServer')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}
jest.spyOn(resMock, 'status')
afterEach(() => {
  jest.clearAllMocks()
})

describe('Join server', () => {
  test('Join server should add player to connected peers', async () => {
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
        connectedPeers: []
      }]
    }
    const reqMock = {
      body: {
        LENUM: '0',
        LEPASS: 'test',
        LESOFT: '2',
        SERVERID: '0'
      }
    }
    await handler.handler(appMock, reqMock, resMock, jest.fn())
    expect(resMock.status).toBeCalledWith(200)
    expect(appMock.serverList[0].connectedPeers).toStrictEqual([0])
  })
})
