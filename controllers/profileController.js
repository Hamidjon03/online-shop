const User = require('../models/userModel')

//@route      GET /profile/:username
//@descr      Users profile page
//access      Private
const getProfilePage = async (req, res) => {
  try {
    const user = await User
      .findOne({username: req.params.username})
      .populate('posters')
      .lean()
    if(!user) throw new Error('Bunday foydalanuvchi topilmadi')
    // console.log(user.posters)
    return res.render('user/profile', {
      title: `${user.username}`,
      user,
      posters: user.posters,
      isAuth: req.session.isLogged,
      url: process.env.URL
    })
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getProfilePage
}