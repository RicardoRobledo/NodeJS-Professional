const dotenv =  require('dotenv');
dotenv.config();

const config = {
    dev: process.env.NODE_ENV != 'production',
    port: process.env.PORT || 3000,
    databaseURL: process.env.URL,
    corsOrigin: process.env.CORS_ORIGIN || "https://lient.twitrr.com"
};

module.exports = config;