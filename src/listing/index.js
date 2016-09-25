'use strict';

import Promise from 'bluebird';

import ListingCollection from './listing-collection';

import jsonParse from '../decorators/json-parse';
import fileStreamReader from '../io/file-stream-reader';
import StreamReadHandler from '../io/stream-read-handler';

/**
 *
 * The file format of `from` must be JSON-Lines
 *
 * @param {String} from - A file path and name
 * @return {ListingObjects} A Collection of Listings
 *
 * @example
 * const listings = await getListings('filename');
 */
export default async function getListings(from) {

    const listings = new ListingCollection();

    return new Promise((resolve, reject) => {

        class JSONStreamHandler extends StreamReadHandler {
            @jsonParse()
            line(listing) {
                listings.add(listing);
            }

            done() {
                resolve(listings);
            }
        }

        try {
            fileStreamReader(from, JSONStreamHandler);
        }
        catch (e) {
            reject(e);
        }
    });
}
