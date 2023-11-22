const config = require("../../config");

function createCacheMiddleware(seconds, _isCacheActived=!config.dev){
    return function(req, res, next){
        if(_isCacheActived){
            res.set("Cache-Control", `public, max-age=${seconds}`);
        }
        next();
    }
}


module.exports = createCacheMiddleware;