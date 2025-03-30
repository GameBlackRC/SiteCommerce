module.exports = (error, req, res, next) => {
    if (error) {
        const code = error.code ? error.code : 500
        res.status(code).json({
            err: error.message
        })
    }
}