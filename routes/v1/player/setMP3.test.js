/* eslint-disable no-undef */
const handler = require('./setMP3')

const resMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis()
}
jest.spyOn(resMock, 'status')
afterEach(() => {
  jest.clearAllMocks()
})

describe('Set player MP3', () => {
  test('Set player MP3 should alter player MP3 in DB', async () => {
    const appMock = {
      config: {
        serverVersion: '1.0.0',
        publicIP: '127.0.0.1'
      },
      db: {
        models: {
          Players: {
            update: (updated) => Promise.resolve(updated)
          }
        }
      }
    }
    await handler.handler(appMock, {
      body: {
        LENUM: '0',
        IDMP3: '1',
        LAVERSION: '157'
      }
    }, resMock, jest.fn())
    expect(resMock.send).toBeCalledWith()
    expect(resMock.status).toBeCalledWith(200)
  })
})
