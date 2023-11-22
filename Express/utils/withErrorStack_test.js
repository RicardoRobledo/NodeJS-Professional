const withErrorStack = require("./withErrorStack");


describe("[ utils / withErrorStack ]", ()=>{
    it("should return the error with stack", ()=>{
        // arrange
        const error = { message: "Error"};
        const stack = { TypeError: "Line 32"};
        const expected = { message: "Error", stack:{TypeError: "Line 32"} };

        // act
        const result = withErrorStack(error, stack, true);

        // assert
        expect(result).toEqual(expected);
    });

    it("should return the error without stack", ()=>{
        // arrange
        const error = { message: "Error"};
        const stack = { TypeError: "Line 32"};
        const expected = { message: "Error", stack:{TypeError: "Line 32"} };

        // act
        const result = withErrorStack(error, stack, false);

        // assert
        expect(result).toEqual(expected);
    });
});