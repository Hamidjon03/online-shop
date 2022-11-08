
//@route      GET /posters
//@descr      Get posters page
//access      Public
const getPosersPage = (req, res) => {
  res.render('home', {
    title: 'Home page',

  })
}


module.exports = {
  getPosersPage
}