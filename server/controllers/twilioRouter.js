const express = require('express')
const router = express.Router()
const twilio = require('twilio')

// ========== GENERATE CAPABILITY TOKEN ==========
router.post('/generate-token', (req, res) => {
  // create a new twilio capability
  const capability = new twilio.Capability(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
  )
  capability.allowClientOutgoing(process.env.TWILIO_APP_SID)
  // capability.allowClientIncoming(page == "/dashboard"? "support_agent" : "customer");
  const token = capability.generate()
  console.log('Token: ', token)
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ token: token }))
})

// ========== create a TWILIO TWIMLRESPONSE==========
router.post('/call/connect', twilio.webhook({validate: false}), (req, res, next) => {
  // call.js
  const phoneNumber = req.body.phoneNumber
  const callerId = process.env.TWILIO_PHONE_NUMBER
  const twiml = new twilio.TwimlResponse()
  // dial right?
  twiml.dial({ callerId }, function (dial) {
    dial.number(phoneNumber)
  })
  console.log('twiml: ', twiml.toString())
  res.send(twiml.toString())
})

module.exports = router
