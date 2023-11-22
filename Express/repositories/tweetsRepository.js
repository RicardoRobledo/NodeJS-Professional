const connection = require("../lib/connect");

module.exports = {
    getTweets,
    createTweet,
    getTweet,
    deleteTweet,
    updateTweet
}

async function getTweets(){
    return new Promise((resolve, reject)=>{
        const sql = "SELECT * FROM tweets";
        connection.query(sql, (error, results, fields)=>{
            if(error){
                reject(error);
            }else{
                resolve(results);
            }
        })
    })
}

async function createTweet(tweet) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO tweets SET ?";
      connection.query(query, tweet, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve({ tweetId: res.insertId, ...tweet });
        }
      });
    });
}

async function getTweet(tweetId){
    return new Promise((resolve, reject)=>{
        const sql = "SELECT * FROM tweets WHERE tweetId = ?";
        connection.query(sql, tweetId, (err, res)=>{
            if(err){
                reject(err);
            }else{
                resolve(res[0]);
            }
        })
    })
}

async function deleteTweet(tweetId){
    return new Promise((resolve, reject)=>{
        const sql = "DELETE FROM tweets WHERE tweetId = ?";
        connection.query(sql, tweetId, (err, res)=>{
            if(err){
                reject(err);
            }else{
                resolve(res.affectedRows);
            }
        })
    })
}

async function updateTweet(tweetId, content){
    return new Promise((resolve, reject)=>{
        const sql = "UPDATE tweets SET content = ? WHERE tweetId = ?";
        connection.query(sql, [content, tweetId], (err, res)=>{
            if(err){
                reject(err);
            }else{
                resolve(res.affectedRows);
            }
        })
    })
}