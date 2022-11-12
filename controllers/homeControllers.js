
//@route      GET /
//@descr      Get home page
//access      Public
const getHomePage = (req, res) => {
  res.render('home', {
    title: 'Home page',
    url: process.env.URL,
    user: req.session.user,
    isLogged: req.session.isLogged

  })
}


module.exports = {
  getHomePage
}