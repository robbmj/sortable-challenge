'use strict';

import editDistance from './utils/edit-distance';
import normalize from './normalize';

class HashCollection {
    map = new Map();

    *[Symbol.iterator]() {
        yield * this.map
    }

    add(key, value) {
        this.map.set(key, value);
    }

    get(key) {
        return this.map.get(key);
    }

    contains(key) {
        return this.map.has(key);
    }

    bestMatch(key) {

        if (this.map.size === 0) {
            // throw an error
        }

        if (this.contains(key)) {
            return key;
        }

        let closest = Infinity;
        let bestKey;

        for (const [candidate] of this) {
            const distance = editDistance(key, candidate);

            if (distance < closest) {
                closest = distance;
                bestKey = candidate;
            }
        }

        return bestKey;
    }

    getBestMatch(key) {
        return this.map.get(this.bestMatch(key));
    }
}

class Model extends HashCollection {
    add(product) {
        super.add(product.model, product);
    }

    get(key) {
        return this.getBestMatch(key);
    }
}

class Family extends HashCollection {
    add(product) {
        const key = normalize(product.family || product.model, {'-': ''});
        if (!this.contains(key)) {
            super.add(key, new Model());
        }
        super.get(key).add(product);
    }

    get(key) {
        return this.getBestMatch(key);
    }
}

class Manufacturers extends HashCollection {
    add(product) {
        const manufacturer = normalize(product.manufacturer, {'-': ''});
        if (!this.contains(manufacturer)) {
            super.add(manufacturer, new Family());
        }
        super.get(manufacturer).add(product);
    }

    get(key) {
        return this.getBestMatch(key);
    }
}

class HashTree extends HashCollection {
    manufacturer = new Manufacturers();

    add(product) {
       this.manufacturer.add(product);
    }

    get(key) {
        return this.manufacturer.get(key);
    }

    contains(key) {
        return this.manufacturer.contains(key);
    }
}

export default class Matcher {

    hashTree = new HashTree();

    /**
     * @param {Array<Product} products
     */
    constructor(products) {
        products.forEach(product => this.hashTree.add(product));
    }

    /**
     * @param {Listing} listing
     * @returns {Product}
     */
    match(listing) {
        return this.hashTree.get('samsun').get('es30').get('').toJSON()
    }
}