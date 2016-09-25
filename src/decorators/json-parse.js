
'use strict';

/**
 * The jsonParse decorator will attempt to
 * parse the arguments of the target method
 * as JSON. If the argument at a target ordinal
 * is not a string or is not a valid JSON object
 * as excpetion is thrown.
 *
 * @example
 * class LineParser {
 *     @jsonParse(1,3)
 *     line(_, line, $, response) {
 *         // line and response will be a valid JSON objects
 *     }
 *     @jsonParse()
 *     defaultLine(line) {
 *         // line will be a valid JSON object
 *     }
 * }
 *
 * @param {Array<Number>} [ordinals=[0]] - The arguments to parse as JSON
 * @returns {Decorator}
 *
 * @throws {TypeError} When the target argument is not a string.
 * @throws {SyntaxError} When the target argument is not a valid JSON string.
 */
export default function jsonParse(ordinals=[0]) {
    return function (target, key, descriptor) {
        return {
            value: function paramWrapper() {

                const args = Array.from(arguments);

                ordinals.forEach(ordinal => {

                    const type = typeof args[ordinal];

                    if (type !== 'string') {
                        throw new TypeError(`jsonParse decorating ${key} - Argument ${ordinal} is not a String`);
                    }

                    try {
                        const json = JSON.parse(args[ordinal]);
                        args[ordinal] = json;
                    }
                    catch (e) {
                        throw new SyntaxError(`jsonParse decorating ${key} - Argument ${ordinal} could not be parsed`);
                    }
                });

                return descriptor.value.apply(this, args);
            }
        };
    };
}
