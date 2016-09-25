'use strict';

import getListings from './listing';
import condence from './join-listings';

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
        const listings = await getListings('./input/listings.txt');
        condence(listings);
        printListings(listings);
    }
    catch (e) {
        console.log(e);
    }
}

main();
