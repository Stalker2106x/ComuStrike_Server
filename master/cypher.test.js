/* eslint-disable no-undef */
const handler = require('./cypher')

describe('Cypher', () => {
  test('Cyphered Payload should not exceed 1500 chars', () => {
    expect(() => {
      handler.cypher('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
    }).toThrow(Error)
  })
  test('Cypher should work', () => {
    expect(handler.cypher('method=')).toBe('15C6075685E613C')
  })
})

describe('Decypher', () => {
  test('Cyphered Payload should be at least 3 characters', () => {
    expect(() => {
      handler.decypher('a')
    }).toThrow(Error)
  })
  test('Cyphered Payload should start with a 1', () => {
    expect(() => {
      handler.decypher('5C6075685E613C')
    }).toThrow(Error)
  })
  test('Cyphered Payload should be hex', () => {
    expect(() => {
      handler.decypher('hello')
    }).toThrow(Error)
  })
  test('Cyphered Payload should be odd character count', () => {
    expect(() => {
      handler.decypher('15C6')
    }).toThrow(Error)
  })
  test('Decypher should work', () => {
    expect(handler.decypher('15C6075685E613C6754715E6955234D457D4A46497F38656656616767556366267D40514162563C64576265665661676757234D45624A47540C37274C70534452624C4E4E0C343437')).toBe('method=get_id&LELOGIN=dfgdfgdfg&LEPASS=dfgdfgdfgf&LESOFT=2&LAVERSION=157')
  })
})
