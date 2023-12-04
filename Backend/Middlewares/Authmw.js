const jwt = require('jsonwebtoken')
let secret = "w2dwertyuiopoiuytrewqwertyuiopoiuytrewqwertyui2d"

const auth = function (req, res, next) {
    try {
        let token = req.headers.authorization;
        if (token) {
            let entity = jwt.verify(token, secret)
            req.id = entity.id
            req.name = entity.name
            next()
        }
        else if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided' })
        }
    }
    catch (err) {
        console.log('token err')

    }


}


module.exports = auth
