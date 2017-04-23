'use strict'
/* global it, describe, before */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
chai.use(dirtyChai)

const MONGOOSE_DB = require('../config').database
const User = require('../config').User
const Contact = require('../config').Contact

const title =
`
==============================
UNIT TEST - contact collection
==============================
`

// testing variables
const user1 = {
  username: 'alan',
  password: 'password_alan'
}

const user1contact1 = {
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: 908456789
}

// const user2 = {
//   username: 'bob',
//   password: 'password_bob'
// }

describe(title, () => {
  before(() => {
    MONGOOSE_DB.connection.once('connected', () => {
      MONGOOSE_DB.connection.db.dropDatabase().then(() => {
        console.log('dropping db')
        const userAlan = new User(user1)
        userAlan.save((err, result) => {
          // console.log(result)
          console.log('err', err)
        })
      })
    })
  })

  it('should be an empty contact & user collection', (done) => {
    const contactEmpty = Contact.find({})
    const userEmpty = User.find({})
    Promise.all([
      contactEmpty,
      userEmpty
    ])
    .then(function (results) {
      console.log(results)
      // expect(results[0]).to.deep.equal([])
      // expect(results[1]).to.deep.equal([])
      done()
    })
  })

  // it('should let me add a new user', (done) => {
  //   const userAlan = new User(user1)
  //   userAlan.save((err, result) => {

  //   })
  //   done()
  // })
})
