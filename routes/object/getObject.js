// get_objet -> getObject
module.exports = {
    schema: {
      body: {
        type: 'object',
        required: ['LENUM', 'LEPASS', 'LAMAP'],
        properties: {
          LENUM: { type: 'number' },
          LEPASS: { type: 'string' },
          LAMAP: { type: 'string' }
        }
      }
    },
    handler: (app, req, res, next) => {
      res.arrayKey = 'OBJ'
      res.status(200).send([{
        ID: 0,
        X: 0,
        Y: 0,
        Z: 0,
        DX: 0,
        DY: 0,
        DZ: 0,
        HX: 0,
        HY: 0,
        HZ: 0,
        TYPE: 1
      }])
      next()
    }
}