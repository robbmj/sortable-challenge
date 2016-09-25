'use strict';

import editDistance from './utils/edit-distance';
import range from './utils/range';

/**
 * Finds Listings that are likely to be referencing the same product
 * For example: Red 4x4 Truck and 4x4 Truck (Red) are probably two listings
 * talking about the same product
 *
 * @param {ListingCollection} listings
 */
export default function condence(listings) {
    const titles = Object.keys(listings.map);
    const lenTitle = titles.length;

    for (const i of range(lenTitle)) {

        if (i % 500 === 0) {
            console.log('i is ' + i);
        }

        const title1 = titles[i];

        if (!listings.hasTitle(title1)) {
            continue;
        }

        for (const j of range(i + 1, lenTitle)) {
            const title2 = titles[j];

            if (!listings.hasTitle(title2)) {
                continue;
            }

            if (listings.map[title1][0].manufacturer !== listings.map[title2][0].manufacturer) {
                continue;
            }

            if (Math.abs(title1.length - title2.length) > 20) {
                continue;
            }

            const [isMatch, dist] = isProbableMatch(title1, title2);

            if (isMatch) {
                listings.combine(title1, title2);
            }
        }
    }
}

/**
 * @param {String} s The source string
 * @param {String} t The string to compare to `s`
 * @param {Number} [delta=0.15] The maximum distance ratio for s and t to be considered a match
 *
 * @returns {Array}
 */
function isProbableMatch(s, t, delta=0.15) {
    const distance = editDistance(s, t);
    let match = false;

    if (distance === 0) {
        return [true, 0];
    }

    const sum = s.length + t.length;

    if ((distance / sum) <= delta) {
        match = true;
    }

    return [match, distance];
}
