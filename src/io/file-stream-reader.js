'use strict';

import fs from 'fs';
import readline from 'readline';

/**
 * Reads lines of a file
 *
 * @param {String} file - The file to read
 * @param {StreamHandler} StreamHandler - A class that extends StreamHandler
 */
export default function fileStreamReader(file, StreamHandler) {

    const lineReader = readline.createInterface({
        input: fs.createReadStream(file)
    });

    const streamHandler = new StreamHandler(lineReader);

    lineReader.on('line',   line    => streamHandler.line(line));
    lineReader.on('close',  ()      => streamHandler.done());
    lineReader.on('pause',  ()      => streamHandler.pause());
    lineReader.on('resume', ()      => streamHandler.reasume());
}
