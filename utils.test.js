/* eslint-disable no-undef */
const handler = require('./cypher')

jest.mock('./config', () => {
  return 
})

describe('Cypher', () => {
  test('Cyphered Payload should not exceed maxSize', () => {
    expect(() => {
      handler.cypher({ config: { maxPayloadSize: 1, cypherKey: 1337 } }, 'oooo')
    }).toThrow(Error)
  })
  test('Cypher should work', () => {
    expect(handler.cypher({ config: { maxPayloadSize: 150, cypherKey: 1337 } }, 'method=')).toBe('15460746856613D')
  })
})

describe('Decypher', () => {
  test('Cyphered Payload should be at least 3 characters', () => {
    expect(() => {
      handler.decypher({ }, 'a')
    }).toThrow(Error)
  })
  test('Cyphered Payload should start with a 1', () => {
    expect(() => {
      handler.decypher({ }, '5C6075685E613C')
    }).toThrow(Error)
  })
  test('Cyphered Payload should be hex', () => {
    expect(() => {
      handler.decypher({}, 'hello')
    }).toThrow(Error)
  })
  test('Cyphered Payload should be odd character count', () => {
    expect(() => {
      handler.decypher({ }, '15C6')
    }).toThrow(Error)
  })
  test('Decypher should work', () => {
    expect(handler.decypher({ config: { maxPayloadSize: 150, cypherKey: 1337 } }, '15460746856613D675C715F695D234C45754A4749773864665E6166675D636726754050416A563D645F6264665E6166675F234C456A4A46540437264C785345526A4C4F4E04343537')).toBe('method=get_id&LELOGIN=dfgdfgdfg&LEPASS=dfgdfgdfgf&LESOFT=2&LAVERSION=157')
  })
})
