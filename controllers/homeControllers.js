
//@route      GET /
//@descr      Get home page
//access      Public
const getHomePage = (req, res) => {
  res.render('home', {
    title: 'Home page',

  })
}


module.exports = {
  getHomePage
}