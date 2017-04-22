const jwt = require('jsonwebtoken')

module.exports.adminOnly = () => {
  return function (req, res, next) {
    if (req.user === null) {
      return res.status(401).send('Admin only')
    } else if (!req.user.isAdmin) {
      return res.status(401).send('Admin only')
    }
    next()
  }
}

module.exports.anyUserOnly = () => {
  return (req, res, next) => {
    if (req.user === null) {
      return res.status(401).send('Logged in Users only')
    } else if (!req.user) {
      return res.status(401).send('Logged in Users only')
    }
    next()
  }
}

module.exports.parseTokenCookie = () => {
  return (req, res, next) => {
    // 1. get the token from request cookie
    const token = req.cookies.token || req.headers['token']
    // 2. check to see if there is a token ...
    if (!token) {
      req.user = null
      return next()
    } else {
      // 3. verify the token has not been tampered with ...
      jwt.verify(token, process.env.JWT_PASSPHRASE, (err, decoded) => {
        if (err) {
          req.user = null
          return next()
        }
        // 4. valid token
        req.user = decoded
        return next()
      }) // ends jwt.verity
    }
  }
}
