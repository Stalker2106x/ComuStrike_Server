/* eslint-disable no-undef */
const handler = require('./getMapList')

jest.mock('../../../utils', () => {
  return {
    fileMD5: () => 'checksum'
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

describe('Get map list', () => {
  test('Get map list should return list of maps', async () => {
    const appMock = {
      config: {
        publicIP: '127.0.0.1'
      },
      db: {
        models: {
          Maps: {
            findAll: () => Promise.resolve([{
              name: 'tunisia',
              author: 'someone'
            }])
          }
        }
      }
    }
    const reqMock = {
      body: {
        LENUM: '0',
        LEPASS: 'test',
        LESOFT: '2'
      }
    }
    await handler.handler(appMock, reqMock, resMock, jest.fn())
    expect(resMock.send).toBeCalledWith([{
      NAME: 'tunisia',
      MAPPEUR: 'someone',
      WADMD5: 'checksum',
      BSPMD5: 'checksum',
      HOST: '127.0.0.1'
    }])
    expect(resMock.status).toBeCalledWith(200)
  })
})
