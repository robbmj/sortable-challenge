'use strict';

import Promise from 'bluebird';

import Product from './product';

import jsonParse from '../decorators/json-parse';
import fileStreamReader from '../io/file-stream-reader';
import StreamReadHandler from '../io/stream-read-handler';

/**
 *
 * The file format of `from` must be JSON-Lines
 *
 * @param {String} from - A file path and name
 * @return {Array<Product>} A Collection of Products
 *
 * @example
 * const products = await getProducts('filename');
 */
export default async function getProducts(from) {

    const products = [];

    return new Promise((resolve, reject) => {

        class JSONStreamHandler extends StreamReadHandler {
            @jsonParse()
            line(product) {
                products.push(Product.fromJSON(product));
            }

            done() {
                resolve(products);
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
