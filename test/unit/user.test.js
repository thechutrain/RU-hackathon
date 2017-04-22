'use strict'
/* global it, describe, before */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
chai.use(dirtyChai)

// server, database, and testing config files
// const server = require('../../server/server')
const MONGOOSE_DB = require('../config').database
const User = require('../config').User

const title =
`
==============================
UNIT TEST - user collection
==============================
`

// testing variables
const user1 = {
  username: 'alan',
  password: 'password'
}

describe(title, () => {
  before(() => {
    MONGOOSE_DB.connection.once('connected', () => {
      MONGOOSE_DB.connection.db.dropDatabase()
      console.log('dropping db')
    })
  })

  it('should be an empty user table', (done) => {
    User.find({}).exec((err, queryResult) => {
      // console.log(queryResult)
      if (err) { console.log(err) }
      expect(queryResult).to.have.lengthOf(0)
      done()
    })
  })

  it('should let me add a new user', (done) => {
    const alan = new User(user1)
    alan.save((err) => {
      if (!err) {
        done()
      }
    })
  })

  it('should be able to find the new user', (done) => {
    User.find({}).exec((err, queryResult) => {
      // console.log(queryResult)
      if (err) { console.log(err) }
      expect(queryResult).to.have.lengthOf(1)
      done()
    })
  })

  it('should be able to authenticate the newly made user', (done) => {
    User.findOne({ username: user1.username }).exec((err, queryResult) => {
      if (err) { console.log(err) }
      const validPass = queryResult.checkPassword(user1.password)
      const invalidPass = queryResult.checkPassword('wrong password')
      expect(validPass).to.be.true()
      expect(invalidPass).to.be.false()
      done()
    })
  })
})
