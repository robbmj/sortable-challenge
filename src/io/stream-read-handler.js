
'use strict';

/**
 * @interface
 */
export default class StreamReadHandler {
    /**
     * @param {readline.Interface} lineReader
     */
    constructor(lineReader) {
        /**
         * @type {readline.Interface}
         */
        this.lineReader = lineReader;
    }

    /**
     * @abstract
     * @param {String} line A line of text
     */
    line(line) {

    }

    /**
     * Is called when the stream is closed.
     * This method has no default behaviour
     */
    done() {

    }

    /**
     * Is called when the stream is paused.
     * This method has no default behaviour
     */
    pause() {

    }

    /**
     * Is called when the stream resumes.
     * This method has no default behaviour
     */
    resume() {

    }
}
