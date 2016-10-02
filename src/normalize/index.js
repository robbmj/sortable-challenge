'use strict';

import entries from '../utils/entries';

export default function normalize(str, replaceOptions={}) {
    str = str.trim().toLowerCase();
    for (const [search, replace] of entries(replaceOptions)) {
        str = str.replace(new RegExp(search, 'g'), replace);
    }
    return str;
}