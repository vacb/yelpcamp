// Function that accepts a function
// Executes that function but catches any error and passes to next()
// Used to wrap async functions
module.exports = func => {
    return (req, res, next) => {   
        func(req, res, next).catch(next);
    }
}