module.exports = {
  js2xmlPreformat (object) {
    const xmlData = {}
    for (const key of Object.keys(object)) {
      if (key.includes('__')) {
        // If a response has a key with __ we consider it being an attribute
        if (key.startsWith('__')) {
          // if __ has no prefix, attributes belong to current element
          xmlData._attributes = { ...xmlData._attributes, [key.replace('__', '')]: object[key] }
        } else {
          // if __ has prefix, attributes belong to child element
          const [child, attribute] = key.split('__')
          xmlData[child] = { ...xmlData[child], _attributes: { ...xmlData[child]._attributes, [attribute]: object[key] } }
        }
      } else if (typeof object[key] === 'object') {
        // If it is a nested object we recursively parse it
        xmlData[key] = module.exports.js2xmlPreformat(object[key])
      } else {
        // basic element
        xmlData[key] = { _text: object[key] }
      }
    }
    return (xmlData)
  },

  arrayFix (res, val) {
    // Arrays get converted to elements called 0,1,2...
    // We convert numeric names to given arrayKey to prevent that.
    if (/^\d+$/.test(val)) {
      val = res.arrayKey
    }
    return (val)
  }
}