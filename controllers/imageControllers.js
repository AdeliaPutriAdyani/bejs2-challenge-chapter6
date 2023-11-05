const { PrismaClient } = require('@prisma/client')
const { imageKit } = require('../utils')

const prisma = new PrismaClient();

module.exports = {
    createImage : async (req, res, next) => {
        try {
            const fileToString = req.file.buffer.toString('base64')
            const uploadFile = await imageKit.upload({
                fileName: req.file.originalname,
                file: fileToString
            })
    
            const newImage = await prisma.Image.create({
                data: {
                    judul: req.body.judul,
                    deskripsi: req.body.deskripsi,
                    imageURL: uploadFile.url
                }
            });
    
            return res.json({
                data: newImage
            });

        } catch (error) {
            return next(error)
        }
    },

    getImage : async (req, res) => {
        const foto = await prisma.Image.findMany();

        return res.json({
            data: foto
        });
    },

    getImageId : async (req, res) => {
        const imageId = parseInt(req.params.imageId)

        const fotoId = await prisma.Imagemage.findUnique({
            where: {
                id: imageId
            }
        });

        return res.json({
            data: fotoId
        });
    },

    deleteImage : async (req, res) => {
        const imageId = parseInt(req.params.imageId);
        await prisma.Image.delete({ 
            where: {
                 id: imageId
            }
        });

        res.json({ 
            message: 'Data Gambar berhasil dihapus' 
        });
    },   

    updateImage : async (req, res, next) => {
        const imageId = parseInt(req.params.imageId);

        const imageUpdate = await prisma.Image.findUnique({
            where: {
                id: imageId,
            },
        });

        if (!imageUpdate) {
            return res.status(404).json({ 
                error: 'Data Gambar tidak ditemukan' 
            });
        }

        try {
            const updatedImage = await prisma.Image.update({
                where: {
                    id: imageId,
                },
                data: {
                    judul: req.body.judul || imageUpdate.judul,
                    deskripsi: req.body.deskripsi || imageUpdate.deskripsi
                }
            });

            return res.json({ 
                data: updatedImage 
            });

        } catch (error) {
            next(error)
        }
    }
}