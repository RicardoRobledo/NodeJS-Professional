const tweetService = require("./tweetsService");
const tweetRepository = require("../repositories/tweetsRepository");


jest.mock(
    "../repositories/tweetsRepository", ()=>({
        getTweets: jest.fn(()=>["tweet1", "tweet2"]),
    }
));


describe("[ services / tweetsService ]", ()=>{
    descripe("#getTweets", ()=>{
        it("should return all tweets", ()=>{
            // arrange
            const expected = ["tweet1", "tweet2"];

            // act
            const result = await tweetService.getTweets();

            // assert
            //expect(result).toEqual(expected);

            // another assert
            expect(tweetsRepository.getTweets).toHaveBeenCalledTimes(1);
        });
    });
});