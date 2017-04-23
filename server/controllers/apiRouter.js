const express = require('express')
const router = express.Router()
const adminOnly = require('../middleware/checkAuth').adminOnly
const anyUserOnly = require('../middleware/checkAuth').anyUserOnly
const User = require('../models/user')
const Contact = require('../models/contact')

router.get('/users', (req, res) => {
  // string for find, for fields you want
  User.find({}, 'username isAdmin', (err, result) => {
    if (err) { return res.json({ err }) }
    res.json(result)
  })
})

/** ============= Updating the Database ===========
 * 
 */
// ADD anyUSERONLY
router.post('/new-contact', (req, res) => {
  const username = req.body.username
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const phoneNumber = req.body.phoneNumber
  const newContact = new Contact({ firstName, lastName, phoneNumber })

  newContact.save(function (err, contact) {
    if (err) { 
      console.log(err)
      return res.json({ msg: 'error saving' })
    } else {
      // save that new Contact in the User
      User.findOneAndUpdate({username}, {
        $push: { contacts: contact._id }
      },
      { new: true },
      function (err) {
        if (err) {
          return res.json({ err })
        } else {
          return res.json({ success: true })
        }
      }
      )
    }

  })
})

/** ========== ROUTES for TESTING ==========
 * GET @ api/logged-in-only/data --> for logged in users only
 *  GET @ api/admin-only/data' --> logged in & admin only
 */
router.get('/logged-in-only/data', anyUserOnly(), (req, res) => {
  const user = JSON.stringify(req.user, null, 4)
  let msg = `
  ====== Logged in only Data =======
  This is a message for logged in only users ...
  Here is your token info:
  ${user}
  `
  res.json({ msg })
})

router.get('/admin-only/data', adminOnly(), (req, res) => {
  const msg = 'Super secret message for this ADMIN ONLY!! ;)'
  res.json({ msg })
})


module.exports = router
