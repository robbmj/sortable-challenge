'use strict';

export default function* entries(obj, ownProperty=true) {
    for (const key in obj) {
        if (ownProperty) {
            if (obj.hasOwnProperty(key)) {
                yield [key, obj[key]];
            }
        }
        else {
            yield [key, obj[key]];
        }
    }
}