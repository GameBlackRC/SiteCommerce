const jwt = require('jsonwebtoken');
const MyError = require('../error/myError')

module.exports = (req, res, next) => {
    // const auth = req.headers.authorization
    // if (auth) {
    //     const token = auth.split(" ")[1]
    //     const decoded = jwt.verify(token, 'ma super clé');
    //     //console.log(decoded);
    //     req.user = decoded

    //     next()
    // } else {
    //     throw new MyError(401, "merci de renseigner un token")

    // }
    next();
}