
'use strict';

/**
 * @param {Number} start
 * @param {Number?} end
 *
 * @returns {Generator}
 *
 * @throws {TypeError} When start or end are not integers
 * @throws {Error} When start >= end
 *
 * @example
 * const digits = [...range(10)]; // 0..9
 *
 * for (let n of range(100, 200)) {
 *      console.log(n); // 100..199
 * }
 */
export default function range(start, end) {
    if (end === undefined) {
        end = start;
        start = 0;
    }

    inforceInt(start);
    inforceInt(end);

    if (start >= end) {
        throw new Error('`start` must be less than `end`');
    }

    return (function * () {
        do {
            yield start;
        } while (++start < end);
    }());
}

/**
 * @param {*} test The value to test
 * @throw {TypeError} If `test` is not an integer
 */
function inforceInt(test) {
    const type = typeof test;
    if (type !== 'number' || test !== (test | 0)) {
        throw new TypeError(`Expected type: int got ${type}. Value is ${test}`);
    }
}