const Joi = require('joi')

module.exports = (schema, req, res, next) => {
    let queryRes = null
    let bodyRes = null
    if (schema.query) queryRes = schema.query.validate(req.query);
    if (schema.body) bodyRes = schema.body.validate(req.body);
    
    if ((queryRes == null || !Object.prototype.hasOwnProperty.call(queryRes, 'error'))
        && (bodyRes == null || !Object.prototype.hasOwnProperty.call(bodyRes, 'error'))) { 
        next();
        return true;
    } else {
        console.log("error", queryRes, bodyRes); 
        res.status(422).send({ error: queryRes, error2: bodyRes })
        return false;
    }
}