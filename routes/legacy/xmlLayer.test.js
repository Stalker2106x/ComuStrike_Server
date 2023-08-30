/* eslint-disable no-undef */
const handler = require('./xmlLayer')

jest.mock('../index', () => {
  return {
    createPlayer: { handler: jest.fn() },
    getPlayer: { handler: jest.fn()},
    getPlayerId: { handler: jest.fn()},
    addScore: { handler: jest.fn()},
    createTournament: { handler: jest.fn()},
    getMP3: { handler: jest.fn()},
    setMP3: { handler: jest.fn()},
    getMapList: { handler: jest.fn()},
    createServer: { handler: jest.fn()},
    getServerList: { handler: jest.fn()},
    deleteServer: { handler: jest.fn()},
    joinServer: { handler: jest.fn()},
    quitServer: { handler: jest.fn()},
    getTournaments: { handler: jest.fn()},
    getTournament: { handler: jest.fn()},
    placeObject: { handler: jest.fn()},
    getObject: { handler: jest.fn() }
  }
})

jest.mock('../../middlewares/validation', () => {
  return {
    validate: (schema, req) => { }
  }
})

jest.mock('../../../utils', () => {
  return {
    decypher: () => 'METHOD=get_map&LENUM=0'
  }
})

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}
jest.spyOn(resMock, 'status')
afterEach(() => {
  jest.clearAllMocks()
})

describe('XML Layer', () => {
  test('XML Layer should work', async () => {
    const appMock = {
    }
    await handler.handler(appMock, { query: { crypt: '15CDF' }, body: {} }, resMock, jest.fn())
    expect(resMock.status).not.toHaveBeenCalled()
  })
})
