
'use strict';

import copy from './array-copy';
import range from './range';

/**
 * finds the Levenshtein Distance between s and t
 *
 * @param {String} s - The souce sting
 * @param {Stirng} t - The target string
 *
 * @return {Number} The number of insert, delete and edit operation required to transform s -> t
 */
export default function editDistance(s, t) {

    if (s === t) {
        return 0;
    }

    const sLen = s.length;
    const tLen = t.length;

    if (sLen === 0) {
        return t.length;
    }

    if (tLen === 0) {
        return s.length;
    }

    const vLen = tLen + 1;

    const v0 = [...range(vLen)];
    const v1 = Array(vLen).fill(0);

    for (let i of range(sLen)) {

        v1[0] = i + 1;

        for (let j of range(tLen)) {
            let cost = (s[i] == t[j]) ? 0 : 1;
            v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
        }

        copy(v1, v0);
    }

    return v1.pop();
}
