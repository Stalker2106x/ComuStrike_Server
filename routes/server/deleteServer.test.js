/* eslint-disable no-undef */
const handler = require('./deleteServer')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}
jest.spyOn(resMock, 'status')
afterEach(() => {
  jest.clearAllMocks()
})

describe('Delete server', () => {
  test('Delete server should remove from serverList', async () => {
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
      headers: [],
      connection: { remoteAddress: '127.0.0.1' },
      body: {
        LENUM: '0',
        LEPASS: 'pw',
        CLE_SERVEUR: '0'
      }
    }
    await handler.handler(appMock, reqMock, resMock, jest.fn())
    expect(resMock.status).toBeCalledWith(200)
    expect(appMock.serverList).toStrictEqual([])
  })
})
