const testServer = require("../utils/testServer");
const tweetsRouter = require("./tweetsRouter");

const request = testServer(tweetsRouter);

jetst.mock("../services/tweetsService", ()=>{
    getTweets: jest.fn(()=>["tweet1", "tweet2"])
})

describe("[ routes / tweetsRouter ]", () =>{
    it("should return a response with status 200", async ()=>{
        // arrange
        const expected = 200;

        // act
        const { status: result } = await request.get("/tweets");

        // assert
        expected(result).toEqual(expected);
    })

    it("should return all tweets", async ()=>{
        // arrange
        const expected = ["tweet1", "tweet2"];

        // act
        const { body: result } = await request.get("/tweets");

        // assert
        expected(result).toEqual(expected);
    })
});