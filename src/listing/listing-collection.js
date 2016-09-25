
'use strict';

/**
 * A Utility class for handeling listings
 */
export default class ListingCollection {

    /**
     * @type {Map<String, Array>} listing title to listings
     */
    map = {};

    /**
     * @type {Number} The number of unique listings in the collection
     */
    unique = 0;

    /**
     * @param {Object} listing
     *
     * If the listing title is identical to another title
     * the two listing will be combined
     */
    add(listing) {
        let title = listing.title;

        title = title.trim();
        title = title.toLowerCase();

        if (this.map[title] === undefined) {
            this.map[title] = [];
            this.unique++;
        }

        this.map[title].push(listing);
    }

    /**
     * @param {String} title The Listings to remove from the collection
     */
    delete(title) {
        delete this.map[title];
        this.unique--;
    }

    /**
     * @param {String} t1 Title 1
     * @param {String} t2 Title 2
     *
     * Adds all listings under `t2` to `t1` then deletes `t2`
     */
    combine(t1, t2) {
        this.map[t1] = this.map[t1].concat(this.map[t2]);
        this.delete(t2);
    }

    /**
     * @param {String} title
     * @return {Boolean} True if the collection contains listings with `title`, false otherwise
     */
    hasTitle(title) {
        return this.map[title] !== undefined;
    }
}
