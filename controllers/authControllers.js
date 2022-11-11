const User = require('../models/userModel')

//@route      GET /auth/login
//@descr      Get login page
//access      Public
const getLoginPage = (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    url: process.env.URL
  })
}

//@route      GET /auth/signup
//@descr      Get register page
//access      Public
const getRegisterPage = (req, res) => {
  res.render('auth/signup', {
    title: 'Registratsiya',
    url: process.env.URL
  })
}

//@route      POST /auth/signup
//@descr      Register new user to database
//access      Public
const registerNewUser = async(req, res) => {
  try {
    const {email, username, phone, password, password2} = req.body
    const userExist = await User.findOne({email})

    if(userExist){
      return res.redirect('/auth/signup')
    }

    if(password !== password2){
      return res.redirect('/auth/signup')
    }

    await User.create({
      email, username, phone, password
    })

    return res.redirect('/auth/login')

  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getLoginPage,
  getRegisterPage,
  registerNewUser
}