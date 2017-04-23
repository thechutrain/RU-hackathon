/* global $, Twilio */

// ============= Helper Func =============
function updateMsg (msg) {
  var msgSelector = $('p#msg-status')
  msgSelector.text(msg)
}

/** ============= Step 1 =============
 * as soon as page loads, make post request to setup Twilio Device with Token
 */
$(document).ready(function () {
  $.post('/twilio/generate-token', {}, function (data) {
    // Set up the Twilio Client Device with the token
    // console.log(data.token)
    console.log('got token')
    Twilio.Device.setup(data.token)
  })
})

/**  ============= Step 2 + 4 =============
* #2) Callback for when twilio client is ready
*/
Twilio.Device.ready(function (device) {
  updateMsg('Ready to make a call ...')
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
function makeCall (phoneNumber) {
  console.log('calling')
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
  // $('button#call-btn').on('click', makeCall)
  $('button#call-action-btn').on('click', function () {
    // check what state the button is in
    var isCallBtn = $(this).hasClass('btn-info')
    // console.log(isCallBtn)
    if (isCallBtn) {
      var phoneNumberStr = $('h3#phone-number-display').text()
      var numLength = phoneNumberStr.length
      var phoneNumber = parseInt(phoneNumberStr, 10)
      console.log(numLength)
      // console.log(typeof phoneNumber)
      if (numLength < 7 && !isNaN(phoneNumber)) {
        updateMsg('No speed dial, please enter full number')
      } else {
        updateMsg('calling ...')
        makeCall(phoneNumber)
        // change button to hang up
        $(this).text('Hang up').removeClass('btn-info').addClass('btn-danger')
      }
    } else {
      hangUp()
      updateMsg('Call ended.')
      // change button to call
      $(this).text('Call').removeClass('btn-danger').addClass('btn-info')
    }
  })
  // $('button#call-btn').on('click', makeCall)
  // $('button#hangup-btn').on('click', hangUp)
})
