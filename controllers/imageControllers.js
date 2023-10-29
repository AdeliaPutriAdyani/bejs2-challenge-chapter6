const { PrismaClient } = require('@prisma/client')
const { imageKit } = require('../utils')
const { image } = require('node-qr-image');

const prisma = new PrismaClient();

module.exports = {
    createImage : async (req, res) => {
        const fileToString = req.file.buffer.toString('base64')
        const uploadFile = await imageKit.upload({
            fileName: req.file.originalname,
            file: fileToString
        })

        const newImage = await prisma.image.create({
            data: {
                judul: req.body.judul,
                deskripsi: req.body.deskripsi,
                imageURL: uploadFile.url
            }
        });

        return res.json({
            data: newImage
        });
    },
    getImage : async (req, res) => {
        const foto = await prisma.image.findMany();

        return res.json({
            data: foto
        });
    },

    getImageId : async (req, res) => {
        const imageId = parseInt(req.params.imageId)

        const fotoId = await prisma.image.findUnique({
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
        await prisma.image.delete({ 
            where: {
                 id: imageId
            }
        });

        res.json({ 
            message: 'Data Gambar berhasil dihapus' 
        });
    },   

    updateImage : async (req, res) => {
        const imageId = parseInt(req.params.imageId);

        const imageUpdate = await prisma.image.findUnique({
            where: {
                id: imageId,
            },
        });

        if (!imageUpdate) {
            return res.status(404).json({ error: 'Gambar tidak ditemukan' });
        }

        try {
            const updatedImage = await prisma.image.update({
                where: {
                    id: imageId,
                },
                data: {
                    judul: req.body.judul || imageUpdate.judul,
                    deskripsi: req.body.deskripsi || imageUpdate.deskripsi
                }
            });

            return res.json({ data: updatedImage });
        } catch (error) {
            return res.status(500).json({ error: 'Gagal memperbarui gambar' });
        }
    }
}