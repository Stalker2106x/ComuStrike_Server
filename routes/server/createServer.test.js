/* eslint-disable no-undef */
const handler = require('./createServer')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}

jest.mock('../../utils', () => {
  return {
    logger: () => {}
  }
})

jest.spyOn(resMock, 'status')
afterEach(() => {
  jest.clearAllMocks()
})

describe('Create server', () => {
  test('Create server should add to serverList', async () => {
    const appMock = {
      serverList: [],
      db: {
        models: {
          Players: {
            findOne: () => Promise.resolve({})
          }
        }
      }
    }
    const reqMock = {
      headers: [],
      connection: { remoteAddress: '127.0.0.1' },
      body: {
        LENUM: '0',
        LEPASS: 'pw',
        LESOFT: '2',
        LECOMMENT: 'comment',
        MAX_PLAYERS: '5',
        CFT: '0',
        CLE_TOURNOIS: '0',
        ROUND: '0',
        MD5: 'checksum',
        DESC: 'desc',
        PRIVEE: '0',
        ARMES: '****************************',
        THIRD: '0',
        GDMG: '0',
        ANTILAG: '1',
        LAVERSION: '170'
      }
    }
    await handler.handler(appMock, reqMock, resMock, jest.fn())
    expect(resMock.status).toBeCalledWith(200)
    expect(appMock.serverList).toStrictEqual([{
      serverId: 0,
      name: reqMock.body.DESC,
      version: reqMock.body.LAVERSION,
      host: reqMock.connection.remoteAddress,
      owner: parseInt(reqMock.body.LENUM),
      level: reqMock.body.LECOMMENT,
      description: reqMock.body.DESC,
      slots: parseInt(reqMock.body.MAX_PLAYERS),
      tournamentId: parseInt(reqMock.body.CLE_TOURNOIS),
      private: false,
      weapons: reqMock.body.ARMES,
      md5: reqMock.body.MD5,
      connectedPeers: []
    }])
  })
})
