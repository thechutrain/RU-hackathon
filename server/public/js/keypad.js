/* global $ */
$(document).ready(function () {
  var phoneNumber = []

  function updateNumberDisplay () {
    var displaySelector = $('h3#phone-number-display')
    displaySelector.text(phoneNumber.join(''))
  }

  // ========== EVENT LISTENERS ============
  // event #1: user presses a number button
  $('div.num-button').on('click', function () {
    var num = $(this).attr('num')
    phoneNumber.push(num)
    updateNumberDisplay()
  })

  // event #2: user presses a del button
  $('div#delete-num-button').on('click', function () {
    phoneNumber.pop()
    updateNumberDisplay()
  })

  // event #3: user presses the clear button
  $('div#clear-num-button').on('click', function () {
    phoneNumber = []
    updateNumberDisplay()
  })
})
