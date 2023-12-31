const express = require("express");
const tweetsService = require("../services/tweetsService");
const boom = require("@hapi/boom");

const validation = require('../utils/middlewares/createValidationMiddleware');
//const validate = require("../utils/validate");
const { createTweetSchema, updateTweetSchema, tweetIdSchema } = require("../utils/schemas/tweetsSchema");

const cache = require("../utils/schemas/tweetSchema");
const { ONE_MINUTE_IN_SECONDS, FIVE_MINUTES_IN_SECONDS } = require("../utils/time");

const router = express.Router();

router.get("/", cache(ONE_MINUTE_IN_SECONDS), getTweets);
router.get("/:tweetId", validation({params:tweetIdSchema}), cache(FIVE_MINUTES_IN_SECONDS), getTweet);
router.post("/", validation({body:createTweetSchema}), createTweet);
router.delete("/:tweetId", validation({params:tweetIdSchema}), deleteTweet);
router.patch("/:tweetId", validation({params:tweetIdSchema}), validation({body:updateTweetSchema}), updateTweet);

module.exports = (app) => app.use("/tweets", router);

//next is considered the error
async function getTweets(req, res, next){
    try {
        //throw new Error("Error");
        const tweets = await tweetsService.getTweets();
        res.status(200).json(tweets);
    } catch (error) {
        next(error);
    }
}

async function getTweet(req, res, next){
    try {
        const {tweetId} = req.params;
        const tweet = await tweetsService.getTweet(tweetId);
        res.status(200).json(tweet);
    } catch (error) {
        //res.status(500).json({error: error.message});
        next(error);
    }
}

async function createTweet(req, res, next){
    try {
        const tweet = req.body;
        /*const validationError = validate(tweet, createTweetSchema);
       
        if(validationError){
            return res.status(400).json({error: validationError.details[0].message});
        }*/
       
        const result = await tweetsService.createTweet(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

async function deleteTweet(req, res, next){
    try {
        const {tweetId} = req.params;
        const deletedRows = await tweetsService.deleteTweet(tweetId);
        if(deletedRows>0){
            res.status(200).json({message: "Tweet deleted"});
        }else{
            res.status(404).json({message: "Tweet not found"});
        }
    } catch (error) {
        next(error);
        //res.status(500).json({error: error.message});
    }
}

async function updateTweet(req, res, next){
    try {
        const { tweetId } = req.params;
        const { content } = req.body;
        const updatedRows = await tweetsService.updateTweet(tweetId, content);
        
        if(updatedRows>0){
            res.status(200).json({message: "Tweet updated"});
        }else{
            const { output: { statusCode, payload } } = boom.notFound();
            payload.message = "Tweet not found";
            res.status(statusCode).json(payload);
        }
    } catch (error) {
        next(error);
        //res.status(500).json({error: error.message});
    }
}