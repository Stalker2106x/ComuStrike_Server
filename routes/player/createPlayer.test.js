/* eslint-disable no-undef */
const handler = require('./createPlayer')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}
jest.spyOn(resMock, 'status')
afterEach(() => {
  jest.clearAllMocks()
})

describe('Create player', () => {
  test('Create player should fail if username length is less than 3', async () => {
    await handler.handler({}, { body: { LENOM: 'a' } }, resMock, jest.fn())
    expect(resMock.status).toBeCalledWith(500)
  })
  test('Create player should fail if username has invalid chars', async () => {
    await handler.handler({}, { body: { LENOM: 'çàé&ç' } }, resMock, jest.fn())
    expect(resMock.status).toBeCalledWith(500)
  })
  test('Create player should fail if LESOFT is not 2', async () => {
    await handler.handler({}, { body: { LENOM: 'test', LESOFT: '4' } }, resMock, jest.fn())
    expect(resMock.status).toBeCalledWith(500)
  })
  test('Create player should fail if user already exists', async () => {
    const appMock = {
      db: {
        models: {
          Players: {
            findOne: () => Promise.resolve({})
          }
        }
      }
    }
    await handler.handler(appMock, { body: { LENOM: 'test', LESOFT: '4' } }, resMock, jest.fn())
    expect(resMock.status).toBeCalledWith(500)
  })
  test('Create player should work', async () => {
    const appMock = {
      db: {
        models: {
          Players: {
            findOne: () => Promise.resolve(null),
            create: () => Promise.resolve({})
          }
        }
      }
    }
    await handler.handler(appMock, { body: { LENOM: 'test', LESOFT: '2', LEMAIL: 'hello@gmail.com', LEPASS: 'hellofriends' } }, resMock, jest.fn())
    expect(resMock.status).toBeCalledWith(200)
  })
})
