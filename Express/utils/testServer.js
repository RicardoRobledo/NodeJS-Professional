const supertest = require("supertest");

function testServer(route){
    const express = require("express");
    const app = express();
    route(app);
    return supertest(app);
}

module.exports = testServer;