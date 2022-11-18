const User = require('../models/userModel')

//@route      GET /profile/:username
//@descr      Users profile page
//access      Private
const getProfilePage = async (req, res) => {
  try {
    const userProfile = await User
      .findOne({username: req.params.username})
      .populate('posters')
      .lean()
    if(!userProfile) throw new Error('Bunday foydalanuvchi topilmadi')

    let isMe = false;
    if(req.session.user){
      isMe = req.session.user._id.toString() == userProfile._id
    }

   
    return res.render('user/profile', {
      title: `${userProfile.username}`,
      userProfile,
      user: req.session.user,
      isMe,
      posters: userProfile.posters,
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