/* eslint-disable no-undef */
const handler = require('./xml')

describe('Array fix', () => {
  test('Array element name should be replaced by text if its a digit', () => {
    expect(handler.arrayFix({ arrayKey: 'test' }, '0')).toBe('test')
  })
  test('Array element name should not be replaced by text if its a valid name', () => {
    expect(handler.arrayFix({ arrayKey: 'wrong' }, 'test')).toBe('test')
  })
})

describe('JS to XML preformat', () => {
  test('Basic element should be pre-converted to XML', () => {
    expect(handler.js2xmlPreformat({
      element: 'text'
    })).toEqual({
      element: {
        _text: 'text'
      }
    })
  })
  test('Element with key including __ should be pre-converted to attribute', () => {
    expect(handler.js2xmlPreformat({
      element: 'text',
      element__id: 'test'
    })).toEqual({
      element: {
        _text: 'text',
        _attributes: {
          id: 'test'
        }
      }
    })
  })
  test('Object with key including __ whithout prefix should be pre-converted to parent attribute', () => {
    expect(handler.js2xmlPreformat({
      element: {
        __id: 'test'
      }
    })).toEqual({
      element: {
        _attributes: {
          id: 'test'
        }
      }
    })
  })
  test('Nested object should be pre-converted to XML', () => {
    expect(handler.js2xmlPreformat({
      element: {
        child: {
          element: 'test'
        }
      }
    })).toEqual({
      element: {
        child: {
          element: {
            _text: 'test'
          }
        }
      }
    })
  })
})
