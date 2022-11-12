const {Router} = require('express')
const router = Router()
const { 
  getPostersPage, 
  addNewPosterPage,
  addNewPoster,
  getPostersById,
  getEditPosterPage,
  updatePoster,
  deletePoster
} =require('../controllers/postersControllers')
const upload = require('../utils/fileUpload')
const {protected} = require('../middleware/auth')
 
router.get('/', getPostersPage)
router.get('/add', protected,addNewPosterPage)
router.post('/add', protected, upload.single('image'), addNewPoster)
router.get('/:id', getPostersById)
router.get('/:id/edit', protected, getEditPosterPage)
router.post('/:id/edit', protected, updatePoster)
router.post('/:id/delete', protected, deletePoster)



module.exports = router