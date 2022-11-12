const { Router } = require('express')
const router = Router()
const { 
  getLoginPage,
  getRegisterPage,
  registerNewUser,
  loginUser,
  logout
 } = require('../controllers/authControllers')
const { guest } = require('../middleware/auth')

router.get('/login', guest, getLoginPage)
router.post('/login', guest, loginUser)
router.post('/signup', guest, registerNewUser)
router.get('/signup', guest, getRegisterPage)
router.get('/logout', logout)

module.exports = router