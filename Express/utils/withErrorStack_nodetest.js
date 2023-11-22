const withErrorStack = require("./withErrorStack");
const { describe, it } = require("node:test");
const assert = require("node:assert");


describe("[ utils / withErrorStack ]", ()=>{
    it("should return the error with stack", ()=>{
        // arrange
        const error = { message: "Error"};
        const stack = { TypeError: "Line 32"};
        const expected = { message: "Error", stack:{TypeError: "Line 32"} };

        // act
        const result = withErrorStack(error, stack, true);

        // assert
        assert.deepStrictEqual(result, expected);
    });

    it("should return the error without stack", ()=>{
        // arrange
        const error = { message: "Error"};
        const stack = { TypeError: "Line 32"};
        const expected = { message: "Error", stack:{TypeError: "Line 32"} };

        // act
        const result = withErrorStack(error, stack, false);

        // assert
        assert.deepStrictEqual(result, expected);
    });
});