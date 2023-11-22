const config = require("../config");


function withErrorStack(error, stack, _isStackShown=config.dev){
    if(_isStackShown){
        return { ...error, stack };
    }else{
        return error;
    }
}

module.exports = withErrorStack;