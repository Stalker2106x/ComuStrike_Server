/* eslint-disable no-undef */
const App = require('./App')
const { Sequelize } = require('sequelize')

jest.mock('./config', () => {
  return {
    database: {
      host: 'localhost',
      port: 1337,
      user: 'rs',
      password: 'rs'
    }
  }
})

jest.mock('sequelize', () => {
  return {
    Sequelize: jest.fn().mockReturnValue({
      authenticate: () => { return true }
    })
  }
})

describe('Database', () => {
  test('Database should connect successfully', async () => {
    const app = new App()
    expect(await app.initDB()).toBe(undefined)
  })
})
