const fs = require("fs")

/**
 * deletes file when givven the whole object
 */
module.exports.deleteFile = (fileObj) => {
    fs.unlink(fileObj.path, resultHandler)
}

/**
 * handler for deleting files
 */
const resultHandler = function (err) {
    if (err) {
        console.log("unlink failed", err);
    } else {
        console.log("file deleted");
    }
}