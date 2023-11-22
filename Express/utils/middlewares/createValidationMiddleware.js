const boom = require('@hapi/boom');
const validate = require('../validate');

// @param {Object} validationSchema - { [K in "body" | "query" | "params"]: j }
function createValidationMiddleware(validationSchema){
    const [[payloadkey, joiSchema]] = Object.entries(validationSchema);

    if(payloadkey!=="body" && payloadkey!=="query" && payloadkey!=="params"){
        throw new Error("Invalid payload key must be one of 'body', 'query', or 'params'");
    }

    // boom is error from client and is easier to handle errors
    return function validationMiddleware(req, res, next){
        const error = validate(req[payloadkey], joiSchema);
        error ? next(boom.badRequest(error)) : next();
    };
}

module.exports = createValidationMiddleware;