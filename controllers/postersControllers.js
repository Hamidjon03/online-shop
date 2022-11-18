const Poster = require('../models/posterModel')
const User = require('../models/userModel')
const filtering = require('../utils/filtering')

//@route      GET /posters
//@descr      Get posters page
//access      Public
const getPostersPage = async (req, res) => {
  try {

    const pagelimit = 10
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const total = await Poster.countDocuments()

    // Redirect if queries [page, limit, ] doesn't exist
    if(req.url === '/'){
      return res.redirect(`?page=1&limit=${pagelimit}`)
    }

    if(req.query.search){
      const {search} = req.query
      const posters = await Poster.searchPartial(search, (err, data) => {
        if(err) throw new Error

      }).lean()

      return res.status(200).render('poster/searchResults', {
        title: 'Search result',
        user: req.session.user,
        url: process.env.URL,
        search,
        posters: posters.reverse()
      })
    }


    if (!req.query.limit || !req.query.page){
      const {region, from, to, category} = req.query

      const filterings = filtering(region, from, to, category)
      const posters = await Poster.find(filterings).lean()

      return res.render("poster/searchResults", {
        title: 'Filter result',
        user: req.session.user,
        url: process.env.URL,
        posters: posters.reverse()
      })
    }

    const posters = await Poster
      .find()
      // .sort({createdAt: -1})
      .skip((page * limit) - limit)
      .limit(limit)
      .lean()
      // console.log(posters);
    return res.render('poster/posters', {
      title: 'Poster page',
      url: process.env.URL,
      pagination: {
        page,
        limit,
        pageCount: Math.ceil(total/limit)
      },
      user: req.session.user,
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




