const config = require("../../config");
const boom = require('@hapi/boom');

const withErrorStack = require("../withErrorStack");

function logErrors(err, req, res, next){
    console.log(err);
    next(err);
}

function wrapErrors(err, req, res, next){
    /*const badImplementationError = {
        stack: err.stack,
        output: {
            statusCode: 500,
            payload: {
                error: 'Internal Server Error',
                message: err.message,
            }
        }
    }*/

    if(!err.isBoom){
        next(boom.badImplementation(err));
    }

    next(err);
}

function errorHandler(err, req, res, next){
    const { stack, output } = err;
    res.status(output.statusCode);
    res.json(withErrorStack(output.payload, stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    errorHandler
};