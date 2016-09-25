'use strict';

const copy = require('../../build/node/utils/array-copy').default;

/**
 * @test {copy}
 */
describe('Copy Tests', () => {

    it('copy should throw an exception if arrays are not of same length', () => {
        const bindCopy = () => copy([1,2], [1]);
        expect(bindCopy).toThrow();
    });
});
