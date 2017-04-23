const express = require('express')
const router = express.Router()
const adminOnly = require('../middleware/checkAuth').adminOnly
const anyUserOnly = require('../middleware/checkAuth').anyUserOnly

router.get('/', (req, res) => {
  // 1. if no user sign in page
  if (req.user === null) {
    console.log('no user')
    return res.render('register', {user: req.user})
  } else {
  // 2. if theres a user --> show them the phone page
    console.log('user!!!')
    return res.render('phone', {user: req.user})
  }
})

router.get('/admin', (req, res) => {
  console.log('User:', req.user)
  res.render('admin', {msg: 'this is a test', user: req.user})
})

router.get('/login', (req, res) => {
  console.log('User:', req.user)
  res.render('login', {msg: 'login page', user: req.user})
})

// router.get('/register', (req, res) => {
//   console.log('User:', req.user)
//   res.render('register', {msg: 'register page', user: req.user})
// })

router.get('/phone', (req, res) => {
  console.log('User:', req.user)
  res.render('phone', {msg: 'this is a test', user: req.user})
})

// TEST ROUTE
// router.get('/test-call', (req, res) => {
//   console.log('User:', req.user)
//   res.render('test-call', {msg: 'this is a test', user: req.user})
// })

// AUTHENTICATED ROUTES
router.get('/user-only', anyUserOnly(), (req, res) => {
  res.render('authPages/user-only', {user: req.user})
})

router.get('/admin-only', adminOnly(), (req, res) => {
  res.render('authPages/admin-only', {user: req.user})
})

module.exports = router
