
'use strict';

/**
 * @param {Array<*>} from The array to copy from.
 * @param {Array<*>} to The array to copy valuse to
 *
 * @throws {Error} When the arrays are of different lengths
 * @throws {TypeError} When either `from` or `to` are not arrays.
 */
export default function copy(from, to) {

    if (!Array.isArray(from) || !Array.isArray(to)) {
        throw new TypeError('Both `from` and `to` must be arrays');
    }

    if (from.length !== to.length) {
        throw new Error('Both Arrays must be of the same length');
    }

    from.forEach((value, i) => to[i] = value);
}
