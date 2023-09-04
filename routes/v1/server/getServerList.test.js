/* eslint-disable no-undef */
const handler = require('./getServerList')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}

jest.mock('../../../utils', () => {
  return {
    authorizePlayer: () => {
      return Promise.resolve({})
    }
  }
})

jest.spyOn(resMock, 'status')
afterEach(() => {
  jest.clearAllMocks()
})

describe('Get server list', () => {
  test('Get server list should return list of servers', async () => {
    const appMock = {
      config: { serverVersion: '1' },
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
        LESOFT: '2',
        SERVERID: '0'
      }
    }
    await handler.handler(appMock, reqMock, resMock, jest.fn())
    expect(resMock.send).toBeCalledWith([{
      NOM: appMock.serverList[0].name,
      VERSION: appMock.serverList[0].version,
      COMMENT: expect.any(String),
      MD5: appMock.serverList[0].md5,
      DESC: appMock.serverList[0].description,
      MAP: appMock.serverList[0].level,
      __IP: appMock.serverList[0].host,
      __SERVERID: appMock.serverList[0].serverId,
      __PLAYERID: appMock.serverList[0].owner
    }])
    expect(resMock.status).toBeCalledWith(200)
  })
})
