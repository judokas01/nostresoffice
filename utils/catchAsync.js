/**
 * function to wrap async function and add the catch block, and pass it to next route
 * @param {*} func 
 * @returns 
 */

module.exports = func => {
    return (req,res,next) => {
        func(req,res,next).catch(next)

    }
}