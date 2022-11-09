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
 
router.get('/', getPostersPage)
router.get('/add', addNewPosterPage)
router.post('/add', upload.single('image'), addNewPoster)
router.get('/:id', getPostersById)
router.get('/:id/edit', getEditPosterPage)
router.post('/:id/edit', updatePoster)
router.post('/:id/delete', deletePoster)



module.exports = router