const Poster = require('../models/posterModel')

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
  const poster = await Poster.findByIdAndUpdate(req.params.id, {$inc: {visits: 1}}, {new: true}).lean()
  res.render('poster/posterById', {
    title: 'Id: poster',
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
    url: process.env.URL

  })
}

//@route      POST /posters/add
//@descr      Poster add 
//access      Private
const addNewPoster = async (req, res) => {
  try {
    const { title, amount, region, image, description } = req.body
    const poster = { 
      title, 
      amount, 
      region, 
      image: 'uploads/' + req.file.filename, 
      description }
    await Poster.create(poster)
    return res.redirect('/posters')
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




