'use strict';

const range = require('../../build/node/utils/range').default;

/**
 * @test {range}
 */
describe('Range Tests', () => {

    it('[...range(2)] should === [0, 1]', () => {
        expect([...range(2)]).toEqual([0, 1]);
    });

    it('[...range(2, 5)] should === [2, 3, 4]', () => {
        expect([...range(2, 5)]).toEqual([2, 3, 4]);
    });

    it('should throw an exception if start or end are not int', () => {
        const rangeBind = () => range(0.5, 1);
        expect(rangeBind).toThrow();
    });
});
