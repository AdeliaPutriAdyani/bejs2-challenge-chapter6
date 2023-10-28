const multer = require('multer');
const path = require('path');

const filename = (req, file, callback) => {
    console.log(file)
    const fileName = Date.now() + '-' + file.originalname;
    callback(null, fileName)
};

const generateStore = (destination) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, destination)
        },
        filename
    })
}

module.exports = {
    imageURL: multer({
        storage: generateStore('./public/images'),
        fileFilter: (req, file, callback) => {
            const allowed = ['imageURL/png', 'imageURL/jpg', 'imageURL/jpeg'];

            if(allowed.includes(file.mimetype)) {
                callback(null, true)
            } else {
                const err = new Error(`Only ${allowed.join(', ')} are allowed to upload`)
            }
        },
        onError: (err, next) => {
            next(err)
        }
    })
}