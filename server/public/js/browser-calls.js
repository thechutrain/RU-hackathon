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

/**  ============= Step 2 =============
* #2) Callback for when twilio client is ready
*/
Twilio.Device.read(function (device) {
  console.log('Twilio Device is ready yo!')
  console.dir(device)
  console.log('=======================')
})


/**  ============= Step 3 =============
* make a call
*/
function makeCall(phoneNumber) {
  console.log('Calling: ' + phoneNumber + ' ...')
  Twilio.Device.connect({ phoneNumber: phoneNumber })
}
