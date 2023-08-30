/* eslint-disable no-undef */
const handler = require('./getPlayer')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}

jest.mock('../../../utils', () => {
  return {
    authorizePlayer: (app, params) => {
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

describe('Get player', () => {
  test('Get player should return player info', async () => {
    const appMock = {
      config: {
        serverVersion: '1.0.0',
        publicIP: '127.0.0.1'
      },
      db: {
        models: {
          MP3: {
            findOne: () => Promise.resolve({
              mp3_id: 0,
              name: 'music'
            })
          }
        }
      }
    }
    await handler.handler(appMock, {
      query: {},
      body: {
        LENUM: '0',
        LEPASS: 'test',
        LAMAC: '0:0:0:0'
      }
    }, resMock, jest.fn())
    expect(resMock.send).toBeCalledWith({
      NAME: 'user',
      KEY: expect.any(String),
      MP3: expect.any(String),
      MP3__ID: expect.any(Number),
      MODEL: 'agtx',
      IS_OP: 0,
      VALIDE: 1,
      MSG1: expect.any(String),
      MSG2: expect.any(String),
      MSG3: expect.any(String),
      MSG4: expect.any(String),
      SCORE: 10,
      SCROLL: expect.any(String),
      STATS: expect.any(String),
      PANEL: expect.any(String),
      ROMUCHAT: '127.0.0.1',
      ID_PLAYER: 0,
      CONTROLE: expect.any(String)
    })
    expect(resMock.status).toBeCalledWith(200)
  })
})
