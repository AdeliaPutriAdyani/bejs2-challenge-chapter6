const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routers')
const errorHandling = require('./middlewares/errorHandling')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static('public/images'))
app.use('bejs2-challenge-chapter6-production.up.railway.app/api/v1', router)

app.use(errorHandling)
app.get('*', (req, res) => {
    return res.status(404).json({
        error: 'End point is not registered'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})