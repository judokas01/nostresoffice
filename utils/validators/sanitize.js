const escape = require('escape-html');
const format = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

/**
 * returns mailadress if regex is true, else returns false
 */
module.exports.sanitizeMail = (input) => {
    if(!validateEmail(input)){
        //not valid email
        return false
    }

    return input

}

module.exports.sanitizeString = (input) => {
    if(!validateString(input)){
        //not valid string
        return false
    }

    return input

}




function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function validateString(string) {
    const re = /^[a-zA-Z0-9_.-]*$/;
    return re.test(String(string).toLowerCase());
}