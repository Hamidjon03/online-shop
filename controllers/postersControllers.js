const Poster = require('../models/posterModel')
const User = require('../models/userModel')

//@route      GET /posters
//@descr      Get posters page
//access      Public
const getPostersPage = async (req, res) => {
  try {
    const posters = await Poster.find().lean()
    res.render('poster/posters', {
      title: 'Home page',
      url: process.env.URL,
      posters: posters.reverse()
    })
  } catch (err) {
    console.log(err)
  }
}

//@route      GET /posters/:id
//@descr      Get posters by id
//access      Public
const getPostersById = async (req, res) => {
  const poster = await Poster
    .findByIdAndUpdate(req.params.id, { $inc: { visits: 1 } }, { new: true })
    .populate('author')
    .lean()

    
  res.render('poster/posterById', {
    title: 'Id: poster',
    user: req.session.user,
    author: poster.author,
    poster,
    url: process.env.URL
  })
}

//@route      GET /posters/add
//@descr      Get add page
//access      Public
const addNewPosterPage = (req, res) => {
  res.render('poster/add-poster', {
    title: 'Yangi e`lon qo`shish',
    user: req.session.user,
    url: process.env.URL

  })
}

//@route      POST /posters/add
//@descr      Poster add 
//access      Private
const addNewPoster = async (req, res) => {  
  try {
    const newPoster = new Poster({
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      description: req.body.description,
      image: 'uploads/' + req.file.filename,
      author: req.session.user._id
    })

    await User.findByIdAndUpdate(req.session.user._id,
      { $push: { posters: newPoster._id } },
      { new: true, upsert: true})

    await newPoster.save((err, posterSaved) => {
      if (err) throw err
      const posterId = posterSaved._id
      return res.redirect("/posters/" + posterId)
    })
  } catch (err) {
    console.log(err);
  }

}

//@route      GET /posters/:id/edit
//@descr      Get edit poster page
//access      Private (own)
const getEditPosterPage = async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id).lean()
    res.render('poster/edit-poster', {
      poster,
      user: req.session.user,
      url: process.env.URL
    })
  } catch (err) {
    console.log(err);
  }
}

//@route      POST /posters/:id/edit
//@descr      Edit poster by id
//access      Private (own)
const updatePoster = async (req, res) => {
  try {
    const { title, amount, region, image, description } = req.body
    const poster = { title, amount, region, image, description }
    await Poster.findByIdAndUpdate(req.params.id, poster)
    return res.redirect('/posters')
  } catch (err) {
    console.log(err);
  }
}

//@route      POST /posters/:id/delete
//@descr      Delete poster by id
//access      Private (own)
const deletePoster = async (req, res) => {
  try {
    await Poster.findByIdAndRemove(req.params.id)
    return res.redirect('/posters')
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getPostersPage,
  addNewPosterPage,
  addNewPoster,
  getPostersById,
  getEditPosterPage,
  updatePoster,
  deletePoster
}




