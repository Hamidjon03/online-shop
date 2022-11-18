const Poster = require('../models/posterModel')

//@route      GET /
//@descr      Get home page
//access      Public
const getHomePage = async (req, res) => {
  try {

    const posters = await Poster.find().lean()

    res.render('home', {
      title: 'Home page',
      posters: posters.reverse().slice(0, 8),
      url: process.env.URL,
      user: req.session.user,
      isLogged: req.session.isLogged

    })
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  getHomePage
}