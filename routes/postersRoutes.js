const {Router} = require('express')
const router = Router()
const { getPosersPage } =require('../controllers/postersControllers')
 
router.get('/', getPosersPage)


module.exports = router