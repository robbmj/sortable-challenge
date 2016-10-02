'use strict';

import Promise from 'bluebird';

import getListings from './listing';
import condence from './join-listings';

import getProducts from './product';

import Matcher from './matcher';

/**
 * Console.log Each Listing's title
 *
 * @param {ListingCollection} listings
 */
function printListings(listings) {

    console.log('unique listings ', listings.unique);

    let titles = Object.keys(listings.map);
    titles.sort();

    titles.forEach(title => {
        console.log('----------------------------- NEW LISTING START ---------------------------');
        listings.map[title].forEach(
            listing => console.log('***: ' + listing.title + '\n')
        );
        console.log('\n--------------------------- LISTING ENDS -----------------------------------\n');
    });
}

/**
 * The main method for this demo application
 */
async function main() {
    try {
        const [products, listings] = await Promise.all([
                getProducts('./input/products.txt'),
                getListings('./input/listings.txt')
            ]);

        const matcher = new Matcher(products);

        console.log(matcher.match('asdf'));
    }
    catch (e) {
        console.log(e);
    }
}

main();
