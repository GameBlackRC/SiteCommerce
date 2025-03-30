class MyError extends Error {
    code
    constructor(code, mess) {
        super(mess)
        this.code = code
    }
}

module.exports = MyError