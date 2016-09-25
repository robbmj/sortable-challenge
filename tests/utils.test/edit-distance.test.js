'use strict';

const editDistance = require('../../build/node/utils/edit-distance').default;

/**
 * @test {editDistance}
 */
describe('Edit Distance Tests', () => {

    it('should return 4', () => {
        expect(editDistance('mike', 'robb')).toBe(4);
    });

    it('should return 4', () => {
        expect(editDistance('robb', 'mike')).toBe(4);
    });
});
