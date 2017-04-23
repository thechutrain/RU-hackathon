const mongoose = require('mongoose')

module.exports.connect = (uri) => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    const options = {
      config: {autoIndex: false}
    }
    mongoose.connect(uri, options, function (err) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(`Successfully connected to db @ "${uri}"`)
        resolve()
      }
    })
    // load models
    require('./user')
    require('./contact')
  }) // ends Promise
}

// module.exports.User = user
