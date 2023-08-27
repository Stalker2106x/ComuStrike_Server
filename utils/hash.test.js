/* eslint-disable no-undef */
const handler = require('./hash')

jest.mock('fs', () => {
  return {
    readFileSync: () => 'ABCDEF'
  }
})

describe('File MD5', () => {
  test('File md5 should return valid md5 hash', () => {
    expect(handler.fileMD5('file.txt')).toBe('8827a41122a5028b9808c7bf84b9fcf6')
  })
})

describe('Password Hash', () => {
  test('Password hash should return valid sha256 hash', () => {
    expect(handler.passwordHash('passwd', 1234)).toBe('f40801e575e14bb373dbcc83dde8f12768958b05b1b677152badba106ed95753')
  })
})
