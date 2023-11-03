const express = require('express')
const router = express.Router()
const multer = require('./middlewares/multer')
const multerLib = require('multer')();
const imageController = require('./controllers/imageControllers')

router.get('/', (req, res) => {
    return res.json({
        message: "Hello World"
    })
})

router.post('/createImage', multerLib.single('imageURL'), imageController.createImage)
router.post('/createImage', multerLib.single('imageURL'), imageController.createImage)
router.get('/image', imageController.getImage)
router.get('/image/:imageId', imageController.getImageId)
router.delete('/imageDelete/:imageId', imageController.deleteImage)
router.put('/imageUpdate/:imageId', imageController.updateImage)



module.exports = router