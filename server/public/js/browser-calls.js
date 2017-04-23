/* global $, Twilio */


/** ============= Step 1 =============
 * as soon as page loads, make post request to setup Twilio Device with Token
 */
$(document).ready(function () {
  $.post('/twilio/generate-token', {}, function (data) {
    // Set up the Twilio Client Device with the token
    console.log(data.token)
    Twilio.Device.setup(data.token)
  })
})

/**  ============= Step 2 + 4 =============
* #2) Callback for when twilio client is ready
*/
Twilio.Device.ready(function (device) {
  console.log('Twilio Device is ready yo!')
  console.dir(device)
  console.log('=======================')
})

// step 4
Twilio.Device.connect(function (connection) {
  console.log('You are connected yo!!!')
  console.dir(connection)
  console.log('=======================')
})

/**  ============= Step 3 =============
* make a call
*/
function makeCall (e, num) {
  // console.log('phoneNumber:')
  // console.dir(phoneNumber)
  var phoneNumber = num || 19083375867
  Twilio.Device.connect({ phoneNumber: phoneNumber })
}
function hangUp (e) {
  console.log('HANGIN UP!!')
  console.log('=======================')
  Twilio.Device.disconnectAll()
}

// ============= Step 3.5 =============
// event listener for makeCall!
$(document).ready(function () {
  $('button#call-btn').on('click', makeCall)
  $('button#hangup-btn').on('click', hangUp)
})
