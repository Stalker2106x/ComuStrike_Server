module.exports = {
  getMP3Schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'IDMP3'],
      properties: {
        LENUM: { type: 'string' },
        LEPASS: { type: 'string' },
        IDMP3: { type: 'number' }
      }
    }
  },
  getMP3: (app, req, res) => {

  },
  setMP3: (app, req, res) => {

  }
}
